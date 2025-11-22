-- Create upvotes tracking table
CREATE TABLE public.report_upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(report_id, user_id)
);

-- Enable RLS
ALTER TABLE public.report_upvotes ENABLE ROW LEVEL SECURITY;

-- Policies for report_upvotes
CREATE POLICY "Users can view all upvotes"
ON public.report_upvotes
FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own upvotes"
ON public.report_upvotes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own upvotes"
ON public.report_upvotes
FOR DELETE
USING (auth.uid() = user_id);

-- Update the upvote function to prevent duplicate upvotes
CREATE OR REPLACE FUNCTION public.upvote_report(report_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
  
  -- Increment upvotes count
  UPDATE public.reports
  SET upvotes = upvotes + 1
  WHERE id = upvote_report.report_id;
END;
$$;