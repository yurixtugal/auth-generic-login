import { CardWrapper } from "@/components/auth/card-wrapper";
import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {

  const isAppPrivate = process.env.APP_PRIVATE === "1"
  return ( 
<LoginForm isAppPrivate={isAppPrivate} />
   );
}
 
export default LoginPage;