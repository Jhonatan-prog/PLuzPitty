import AuthLayout  from '../../layouts/AuthLayout';
import { PassResetFormComponent as PRFComponent } from '../../components/auth/PassResetFormComponent';

const PasswordResetPage = () => {
    return (
      <AuthLayout reference='recuperar' title="Cambiar contraseña"> 
          <PRFComponent />
      </AuthLayout>
    );
  }
  
export default PasswordResetPage;
