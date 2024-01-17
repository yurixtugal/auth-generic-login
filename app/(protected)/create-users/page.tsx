import RegisterForm from "@/components/auth/register-form";

const CreateUserPage = () => {
  
  const isAppPrivate = process.env.APP_PRIVATE === "1"

  return <RegisterForm isAppPrivate={isAppPrivate} fromRegisterAdmin={true} />;

}
 
export default CreateUserPage;