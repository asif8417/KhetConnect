
import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
//- useNavigate is a React Router hook that lets us navigate through JavaScript functions.

const Navbar = () => {

    const navigate = useNavigate();

    // Get logged-in user
    const user = JSON.parse(localStorage.getItem("user"));

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    // Dashboard according to user role
    const dashboardPath = {
        farmer: "/farmer-dashboard",
        buyer: "/buyer-dashboard",
        fpo: "/fpo-dashboard"
    };

    return (
        <nav className="navbar">
    <div className="logo">
                🌾 KhetConnect
            </div>

            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li>About</li>
                <li onClick={()=>navigate("/marketplace")}>Marketplace</li>
                <li>How It Works</li>
                <li>Sell Your Produce</li>
                <li>Weather Adivsory</li>
                <li>Government Schemes & Subsidies</li>

            </ul>

            <div className="nav-buttons">
                {user ? (
                    <>
                        <Link
                            to={dashboardPath[user.role] || "/"}
                            className="login-btn"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/profile"
                            className="signup-btn"
                        >
                            Profile
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/register"
                            className="signup-btn"
                            style={{border:'none'}}
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/login"
                            className="login-btn"
                        >
                            Login
                        </Link>
                    </>
                )}

            </div>
        </nav>
    );
};

export default Navbar;
