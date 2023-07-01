CREATE OR REPLACE FUNCTION public.fn_email_exists(email VARCHAR)
RETURNS BOOLEAN SECURITY definer AS
$$
BEGIN
  RETURN EXISTS(SELECT 1 FROM auth.users WHERE LOWER(auth.users.email) = LOWER($1));
END;
$$ LANGUAGE plpgsql;
