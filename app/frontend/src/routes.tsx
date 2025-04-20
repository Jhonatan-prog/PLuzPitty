
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductoCard from "../src/pages/pagInicio/dashboard";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/about" element={<div>About Page</div>} />
                <Route path="/contact" element={<div>Contact Page</div>} />
                <Route path="*" element={<div>404 Not Found</div>} />
                <Route path="/inicio" element={<ProductoCard />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
