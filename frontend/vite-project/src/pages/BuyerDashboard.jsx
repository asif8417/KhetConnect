import "./BuyerDashboard.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const BuyerDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="buyer-dashboard">
            <div className="buyer-dashboard-header">
                <h1>Welcome to Buyer Dashboard</h1>
                <p>Explore available crops from farmers.</p>
            </div>
            <div className="buyer-dashboard-content">
                <div className="buyer-dashboard-card"
                    onClick={() => navigate("/marketplace")}
                    style={{ cursor: "pointer" }}>
                    <h3>Browse Marketplace</h3>
                    <p>Discover fresh agricultural products from farmers.</p>
                </div>

                <div className="buyer-dashboard-card">
                    <h3>My Enquiries</h3>
                    <p>Keep track of your enquiries to farmers.</p>
                </div>
                <div className="buyer-dashboard-card">
                    <h3>Saved Crops</h3>
                    <p>Quickly access your favourite crop listings.</p>
                </div>
                <div
                    className="buyer-dashboard-card"
                    onClick={() => {
                        
                        navigate("/buyer-profile");
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <h3>My Profile</h3>
                    <p>View and manage your account information.</p>
                </div>

                <div className="buyer-dashboard-card">
                    <h3>Live Mandi & Market Price Ticker</h3>
                    <p>Display real-time regional benchmark prices alongside current platform rates</p>
                </div>
                <div className="buyer-dashboard-card">
                    <h3>Quality Assurance & Farmer Trust</h3>
                    <p>Verified Farmer Profiles, Crop Quality & Lab Report</p>
                </div>
                <div className="buyer-dashboard-card">
                    <h3>Order Management & Logistics</h3>
                    <p>Live Shipment Tracking, Pickup vs. Delivery Toggle,Order History & One-Click Reorde</p>
                </div>
                <div className="buyer-dashboard-card">
                    <h3> Accessibility & Support</h3>
                    <p>Multi-Language & Voice Support, Dispute Resolution & Suppor</p>
                </div>



            </div>
        </div>
    )
}
export default BuyerDashboard;