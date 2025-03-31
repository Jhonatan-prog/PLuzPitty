import AuthLayout  from '../layouts/AuthLayout';
import { FormLoginComponent as FLComponent } from '../components/auth/formLoginPage';

const LoginPage = () => {
  return (
    <AuthLayout reference='login' title="Login"> 
        <FLComponent />
    </AuthLayout>
  );
}

export default LoginPage;
