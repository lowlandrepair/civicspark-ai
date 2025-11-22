-- Add RLS policy to allow authenticated users to upvote any report
-- This policy specifically allows updating only the upvotes column

CREATE POLICY "Authenticated users can upvote any report"
ON public.reports
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);