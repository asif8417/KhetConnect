
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <span className="hero-tag">
                        🌱 A Better Future for Indian Agriculture
                    </span>

                    <h1>
                        Empowering Farmers,
                        <span> Connecting Markets.</span>
                    </h1>

                    <p>
                        KhetConnect helps farmers connect directly with buyers,
                        explore better market opportunities, and sell their
                        agricultural products with greater transparency.
                    </p>

                    <div className="hero-buttons">
                        <button onClick={() => navigate("/marketplace")}>
                            Explore Marketplace
                        </button>

                        <button
                            className="learn-btn"
                            onClick={() => document.getElementById("how-it-works")
                                ?.scrollIntoView({ behavior: "smooth" })}
                        >
                            How It Works
                        </button>
                    </div>

                    <div className="hero-highlights">
                        <div>
                            <h3>Direct</h3>
                            <p>Farmer-Buyer Connection</p>
                        </div>
                        <div>
                            <h3>Transparent</h3>
                            <p>Better Price Opportunities</p>
                        </div>
                        <div>
                            <h3>Simple</h3>
                            <p>Easy Digital Marketplace</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works" id="how-it-works">
                <div className="section-heading">
                    <span>HOW IT WORKS</span>
                    <h2>Connecting Farmers and Buyers in 3 Simple Steps</h2>
                    <p>
                        KhetConnect makes agricultural trading easier,
                        more transparent, and accessible for everyone.
                    </p>
                </div>

                <div className="steps-container">
                    <div className="step-card">
                        <div className="step-icon">🌾</div>
                        <h3>List Your Crops</h3>
                        <p>
                            Farmers can list their crops with quantity,
                            expected price, and location.
                        </p>
                    </div>

                    <div className="step-card">
                        <div className="step-icon">🔍</div>
                        <h3>Explore Products</h3>
                        <p>
                            Buyers can discover available agricultural
                            products and find suitable sellers.
                        </p>
                    </div>

                    <div className="step-card">
                        <div className="step-icon">🤝</div>
                        <h3>Connect Directly</h3>
                        <p>
                            Farmers and buyers can connect directly
                            and explore better trading opportunities.
                        </p>
                    </div>
                </div>
            </section>

{/* Why Choose KhetConnect Section */}
<section className="why-choose">
    <div className="section-heading">
        <span>WHY KHETCONNECT?</span>
        <h2>Making Agricultural Trade Better</h2>
        <p>
            We aim to make agricultural marketing simpler,
            fairer, and more accessible for farmers and buyers.
        </p>
    </div>

    <div className="benefits-container">
        <div className="benefit-card">
            <div className="benefit-icon">🤝</div>
            <h3>Direct Market Connection</h3>
            <p>
                Connect farmers and buyers directly,
                helping reduce dependency on middlemen.
            </p>
        </div>

        <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Transparent Pricing</h3>
            <p>
                Farmers can share expected prices, while
                buyers can explore available crop prices.
            </p>
        </div>

        <div className="benefit-card">
            <div className="benefit-icon">📍</div>
            <h3>Location-Based Discovery</h3>
            <p>
                Buyers can discover agricultural products
                from nearby farming locations.
            </p>
        </div>

        <div className="benefit-card">
            <div className="benefit-icon">📱</div>
            <h3>Easy to Use</h3>
            <p>
                A simple digital platform designed to make
                agricultural trading easier.
            </p>
        </div>
    </div>
</section>

        </>

    );
};

export default Home;
