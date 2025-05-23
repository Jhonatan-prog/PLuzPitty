import AuthLayout  from '../../layouts/AuthLayout';
import { PassRecoveryFormComponent as PRFComponent } from '../../components/auth/PassRecoveryFormComponent';

const PasswordRecoveryPage = () => {
    return (
      <AuthLayout reference='recuperar' title="¿Contraseña olvidada?"> 
          <PRFComponent />
      </AuthLayout>
    );
  }
  
  export default PasswordRecoveryPage;
