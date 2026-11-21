import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Check whether the user is logged in
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // Check whether the user has permission
    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;