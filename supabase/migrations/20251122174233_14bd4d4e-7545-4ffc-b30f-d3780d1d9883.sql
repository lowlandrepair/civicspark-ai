-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can upvote any report" ON public.reports;

-- Create a secure function to handle upvotes
CREATE OR REPLACE FUNCTION public.upvote_report(report_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only update the upvotes column, nothing else
  UPDATE public.reports
  SET upvotes = upvotes + 1
  WHERE id = report_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.upvote_report TO authenticated;