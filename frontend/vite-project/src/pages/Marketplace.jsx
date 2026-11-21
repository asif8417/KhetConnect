
import "./Marketplace.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react"; //Calls the API when the Marketplace page loads.
import API from "../services/api";

const Marketplace = () => {

    const [crops, setCrops] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All Crops")
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [buyerLocation, setBuyerLocation] = useState("");
    const [selectedDistance, setSelectedDistance] = useState("any");
    const navigate = useNavigate(); //It allows us to navigate from one page to another programmatically.

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const response = await API.get("/marketplace/crops");
                setCrops(response.data.crops);
            } catch (error) {
                setError("Failed to fetch crops");
            } finally {
                setLoading(false);
            }
        };

        fetchCrops();
    }, []);

    const handleDistanceSearch = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get("/marketplace/crops", {
                params: {
                    location: buyerLocation,
                    distance: selectedDistance
                }
            });

            setCrops(response.data.crops);
        } catch (error) {
            setError("Failed to fetch nearby crops");
        } finally {
            setLoading(false);
        }
    };
    const categories = [         //categories contains the options we'll show in the sidebar.
        "All Crops",             //If All Crops is selected, we display the complete crops array.
        "Grains",
        "Grain and Cereals",               //- Otherwise, .filter() selects only crops whose category matches the selected category.
        "Vegetables",
        "Fruits",
        "Pulses",
        "Oilseeds",
        "Spices",
        "Seeds",
        "Others"
    ];
    const filteredCrops = crops.filter((crop) => {
        const matchesCategory = selectedCategory === "All Crops" || crop.category === selectedCategory;
        const matchesSearch =
            crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crop.farmer?.address?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
        //matchesCategory checks selected category.
        //matchesSearch checks crop name, category and farmer location.
        // && means both conditions must be true.

    });

    return (
        <div className="marketplace-container">
            <h1>Explore Marketplace</h1>

            <div className="marketplace-search">
                <input
                    type="text"
                    placeholder="Search crops by name, category or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter city or locality..."
                    value={buyerLocation}
                    onChange={(e) => setBuyerLocation(e.target.value)}
                />
                <select
                    value={selectedDistance}
                    onChange={(e) => setSelectedDistance(e.target.value)}
                >
                    <option value="any">Any Distance</option>
                    <option value="10">Within 10 km</option>
                    <option value="20">Within 20 km</option>
                    <option value="30">Within 30 km</option>
                    <option value="50">Within 50 km</option>
                    <option value="100">Within 100 km</option>
                </select>
                <button
                    type="button"
                    onClick={handleDistanceSearch}
                >
                    Search
                </button>

            </div>


            <div className="marketplace-layout">

                <aside className="category-sidebar">
                    <h3>Categories</h3>

                    {categories.map((category) => (
                        <button
                            key={category}
                            className={
                                selectedCategory === category
                                    ? "category-btn active"
                                    : "category-btn"
                            }
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </aside>

                <div className="marketplace-content">

                    {loading && <p>Loading crops...</p>}

                    {error && <p>{error}</p>}

                    {!loading && !error && filteredCrops.length === 0 && (
                        <p>No crops available in this category.</p>
                    )}

                    {!loading && !error && filteredCrops.length > 0 && (
                        <div className="marketplace-crops">
                            {filteredCrops.map((crop) => (
                                <div
                                    className="crop-card"
                                    key={crop._id}
                                    onClick={() => navigate(`/marketplace/crops/${crop._id}`)}
                                >
                                    {crop.image && (
                                        <img
                                            src={crop.image}
                                            alt={crop.cropName}
                                            className="crop-image"
                                        />
                                    )}

                                    <h3>{crop.cropName}</h3>
                                    <p>Category: {crop.category}</p>
                                    <p>Quantity: {crop.quantity} {crop.unit}</p>
                                    <p>Expected Price: ₹{crop.expectedPrice}</p>
                                    <p>Location: {crop.farmer?.address}</p>
                                    <p className="farmer-info">
                                        <span>Farmer:</span> {crop.farmer?.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );

}
export default Marketplace;