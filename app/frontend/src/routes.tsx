
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductoCard from "../src/pages/pagInicio/dashboard";
import InvenatarioCard from "../src/pages/pagInventario/dashboard";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PasswordRecoveryPage from "./pages/auth/PasswordRecoveryPage";
import PasswordResetPage from "./pages/auth/PasswordResetPage";

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
                <Route path="*" element={<div>404 Not Found</div>} />
                <Route path="/inicio" element={<ProductoCard />} />
                <Route path="/inventario" element={<InvenatarioCard/>} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;

