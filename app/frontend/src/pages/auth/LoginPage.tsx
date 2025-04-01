import AuthLayout  from '../../layouts/AuthLayout';
import { FormLoginComponent as FLComponent } from '../../components/auth/formLoginPage';

const boxStyle = {
  p: "text-[.965rem] text-gray-500 mb-2",
  a: "text-blue-500 hover:text-blue-700"
}

const LoginPage = () => {
  return (
    <AuthLayout reference='login' title="Login"> 
        <FLComponent />

        <div className='flex flex-col mt-6'>
          <p className={boxStyle.p}>¿No tienes una cuenta? <a href="/register" className={boxStyle.a}>Registrarse</a></p>
          <p className={boxStyle.p}>¿Olvidastes tu contraseña? <a href="/forgot-password" className={boxStyle.a}>Recuperar</a></p>
        </div>
    </AuthLayout>
  );
}

export default LoginPage;
