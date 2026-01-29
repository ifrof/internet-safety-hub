-- Update the handle_new_user function to save user_type from auth metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (
    user_id, 
    full_name, 
    email,
    company_name,
    user_type
  )
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NEW.raw_user_meta_data->>'company_name',
    COALESCE((NEW.raw_user_meta_data->>'user_type')::user_type, 'buyer'::user_type)
  );
  RETURN NEW;
END;
$function$;

-- Recreate trigger to ensure it uses updated function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();