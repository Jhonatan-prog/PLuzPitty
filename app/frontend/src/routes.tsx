// Routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PasswordRecoveryPage from "./pages/auth/PasswordRecoveryPage";
import PasswordResetPage from "./pages/auth/PasswordResetPage";
import AgregarProducto from "../src/pages/FormAgregar/Dashboard";
import Proveedor from "../src/pages/pagProveedor/Dashboard";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/about" element={<div>About Page</div>} />
                <Route path="/contact" element={<div>Contact Page</div>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<PasswordRecoveryPage />} />
                <Route path="/reset-password" element={<PasswordResetPage />} />
                <Route path="/Add" element={<AgregarProducto />} />
                <Route path="/Proveedor" element={<Proveedor />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
