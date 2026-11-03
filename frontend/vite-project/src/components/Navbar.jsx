import React from "react";

const Navbar=()=>{
    return(
        <nav className="navbar">
            <div className="logo">
               🌾 KhetConnect
            </div>
            <ul className="nav-links">
                <li>Home</li>
                <li>About</li>
                <li>Marketplace</li>
                <li>How It Works</li>
            </ul>

            <div className="nav-buttons">
                <button className="login-btn">Login</button>
                <button className="signup-btn">Get started</button>
            </div>
        </nav>
    )
}
export default Navbar;