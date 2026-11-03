import React from "react";
import './Features.css';

const Features=()=>{
    return(
        <section className="features">
            <h2>Why choose KhetConnect?</h2>
             <p className="features-subtitle">
                Helping farmers make smarter decisions and reach better markets.
            </p>
                <div className="features-container">
                <div className="feature-card">
                    <h3>🌾 Direct Marketplace</h3>
                    <p>Connect directly with buyers and sell agricultural products.</p>
                </div>

                <div className="feature-card">
                    <h3>📊 Smart Price Analysis</h3>
                    <p>Get useful market price insights to make better selling decisions.</p>
                </div>

                <div className="feature-card">
                    <h3>🤝 Better Opportunities</h3>
                    <p>Build connections between farmers, buyers, and FPOs.</p>
                </div>
            </div>
        </section>
    )
}
export default Features;