// Routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/about" element={<div>About Page</div>} />
                <Route path="/contact" element={<div>Contact Page</div>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
