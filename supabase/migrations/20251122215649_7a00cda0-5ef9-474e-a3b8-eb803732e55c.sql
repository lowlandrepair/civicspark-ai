-- Update upvote_report function to automatically escalate priority based on upvote thresholds
CREATE OR REPLACE FUNCTION public.upvote_report(report_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  new_upvote_count integer;
BEGIN
  -- Check if user has already upvoted
  IF EXISTS (
    SELECT 1 FROM public.report_upvotes 
    WHERE report_upvotes.report_id = upvote_report.report_id 
    AND report_upvotes.user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'You have already upvoted this report';
  END IF;
  
  -- Insert upvote record
  INSERT INTO public.report_upvotes (report_id, user_id)
  VALUES (upvote_report.report_id, auth.uid());
  
  -- Increment upvotes count and get the new count
  UPDATE public.reports
  SET upvotes = upvotes + 1
  WHERE id = upvote_report.report_id
  RETURNING upvotes INTO new_upvote_count;
  
  -- Automatically escalate priority based on upvote thresholds
  IF new_upvote_count >= 20 THEN
    UPDATE public.reports
    SET priority = 'High'
    WHERE id = upvote_report.report_id AND priority != 'High';
  ELSIF new_upvote_count >= 10 THEN
    UPDATE public.reports
    SET priority = 'Medium'
    WHERE id = upvote_report.report_id AND priority = 'Low';
  END IF;
END;
$$;