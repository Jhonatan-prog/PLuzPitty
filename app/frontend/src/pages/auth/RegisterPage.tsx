import AuthLayout from "../../layouts/AuthLayout";
import { RegisterFormComponent as FRComponent } from "../../components/auth/RegisterFormComponent";

const RegisterPage = () => {
    return (
        <AuthLayout title="Crea una cuenta" reference="register">
            <FRComponent />

            <div className="flex flex-col mt-2">
                <p className="text-[.965rem] text-gray-500">¿Ya tienes una cuenta? <a href="/login" className="text-blue-500 hover:text-blue-700">Iniciar sesión</a></p>
            </div>
        </AuthLayout>
    );
}

export default RegisterPage;
