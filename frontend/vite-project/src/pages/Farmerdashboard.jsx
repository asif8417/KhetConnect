import React, { useEffect, useState } from "react"; //useEffect: Calls the API when the dashboard loads.
import axios from "axios";
import { Link } from "react-router-dom";
import "./FarmerDashboard.css";

const FarmerDashboard = () => {
    const [crops, setCrops] = useState([]);
    const [searchTerm, setSearchTerm]=useState("");

    const handleDeleteCrop = async (cropId) => {     //cropId: Receives the ID of the crop we want to delete.
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this crop?"

        );
        if (!confirmDelete) {
            return;
        }
        try {
            const token = localStorage.getItem("token"); //This line retrieves that token.
            const response = await axios.delete(
                `http://localhost:5000/api/crops/${cropId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            alert(response.data.message);
            setCrops((prevCrops) =>
                prevCrops.filter((crop) => crop._id !== cropId) //filter(): Creates a new array based on a condition.
                //- crop._id !== cropId: Keeps crops whose IDs do not match the deleted crop.
            );

        } catch (error) {
            console.error("Delete Crop Error:", error);

            alert(
                error.response?.data?.message || "Failed to delete crop" //The ?. is called optional chaining. It prevents an error if response or data doesn't exist.
            );

        }
    }
    useEffect(() => {
        const fetchMyCrops = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/crops/my-crops",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setCrops(response.data.crops);
            } catch (error) {
                console.error("Error fetching crops:", error);
            }
        };

        fetchMyCrops();
    }, []);
    const filteredCrops = crops.filter((crop) => {
    return (
        crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
});
    return (
        <div className="farmer-dashboard">

            {/* Sidebar */}
            <aside className="farmer-sidebar">
                <h2>🌾 KhetConnect</h2>
                <ul>
                    <li> <Link to="/farmer-dashboard">Dashboard</Link></li>
                    <li><Link to="/farmer-dashboard/add-crop">Add Crop</Link></li>
                    <li><Link to="/farmer-dashboard/orders">Orders</Link></li>
                   <Link to="/farmer-profile">Profile</Link>  
                </ul>
            </aside>

            {/* Main Content */}
            <main className="farmer-main">
                <header className="farmer-header">
                    <div>
                        <h1>Farmer Dashboard</h1>
                        <p>Welcome back! Manage your agricultural products.</p>
                    </div>
                    <button className="add-crop-btn">
                        <Link to="/farmer-dashboard/add-crop">
                            + Add New Crop
                        </Link>
                    </button>
                </header>
                {/* Statistics */}
                <section className="farmer-stats">
                    <div className="stat-card">
                        <h3>Total Crops</h3>
                        <h2>{crops.length}</h2>
                    </div>
                    <div className="stat-card">
                        <h3>Active Listings</h3>
                        <h2>{crops.filter((crop) => crop.availability === "available").length}</h2>
                    </div>
                    <div className="stat-card">
                        <h3>Sold Crops</h3>
                        <h2>{crops.filter((crop) => crop.availability === "sold").length}</h2>
                    </div>
                    <div className="stat-card">
                        <h3>Total Orders</h3>
                        <h2>0</h2>
                    </div>
                </section>

                {/* Recent Crops */}
                <section className="recent-crops">
                    <h2>Recent Crop Listings</h2>

                    <div className="farmer-search">
        <input type="text"
        placeholder="Search your crops by name, category or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
    />
    {searchTerm && ( <button type="button" onClick={() => setSearchTerm("")}>✕</button>)}
</div>

                    {crops.length === 0 ? (
                        <div className="empty-crops">
                            <h3>No crops listed yet!</h3>
                            <p>Start selling your agricultural products directly to buyers.</p>

                            <Link to="/farmer-dashboard/add-crop">
                                Add Your First Crop
                            </Link>
                        </div>
                    ) : (
                        <div className="crop-list">
                            {filteredCrops.length === 0 && (<p>No matching crops found.</p>)}
                            {filteredCrops.map((crop) => (
                                <div className="crop-card" key={crop._id}>
                                    <h3>{crop.cropName}</h3>
                                    {crop.image && (
                                        <img
                                            src={crop.image}
                                            alt={crop.cropName}
                                            className="crop-image"
                                            
                                        />
                                        
                                    )}
                        

                                    <p>Category: {crop.category}</p>
                                    <p>Quantity: {crop.quantity} {crop.unit}</p>
                                    <p>Expected Price: ₹{crop.expectedPrice}</p>
                                    <p>Location: {crop.location}</p>
                                    <p>Status: {crop.availability}</p>
                                    <div className="crop-actions">
                                    <button
                                        className="delete-crop-btn"
                                        onClick={() => handleDeleteCrop(crop._id)} //crop._id passes the ID of the selected crop.
                                    >
                                        Delete Crop
                                    </button>
                                    <Link
                                        to={`/edit-crop/${crop._id}`}
                                        className="edit-crop-btn"
                                    >
                                        Edit Crop
                                    </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </main>


        </div>
    )
}
export default FarmerDashboard;