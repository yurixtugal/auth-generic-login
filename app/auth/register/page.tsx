import RegisterForm from "@/components/auth/register-form";

const RegisterPage = () => {

  const isAppPrivate = process.env.APP_PRIVATE === "1"

  if (isAppPrivate) return  null

  return <RegisterForm isAppPrivate={isAppPrivate} fromRegisterAdmin={false}/>;
};

export default RegisterPage;
