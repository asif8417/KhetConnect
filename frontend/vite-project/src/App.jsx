
import { Routes, Route } from "react-router-dom";
import FarmerDashboard from "./pages/Farmerdashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddCrop from "./pages/AddCrop";
import Features from "./components/Features";
import EditCrop from "./pages/EditCrop";
import ProtectedRoute from "./components/ProtectedRoute";
import FarmerProfile from "./pages/FarmerProfile";
import EditProfile from "./pages/EditProfile";
import Marketplace from "./pages/Marketplace";
import CropDetails from "./pages/CropDetails";
import BuyerDashboard from "./pages/BuyerDashboard";
import BuyerProfile from "./pages/BuyerProfile";
import BuyerEditProfile from "./pages/BuyerEditProfile";

import "./pages/Home.css";
import "./components/Navbar.css";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Features />
            </>
          }
        />


        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/crops/:id" element={<CropDetails />} />

        <Route
          path="/farmer-dashboard"
          element={
            <ProtectedRoute allowedRole="farmer">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buyer-dashboard"
          element={
            <ProtectedRoute allowedRole="buyer">
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
    path="/buyer-profile"
    element={
        <ProtectedRoute allowedRole="buyer">
            <BuyerProfile />
        </ProtectedRoute>
    }
/>
        <Route
          path="/farmer-dashboard/add-crop"
          element={
            <ProtectedRoute allowedRole="farmer">
              <AddCrop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute allowedRole="farmer">
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
    path="/buyer-edit-profile"
    element={
        <ProtectedRoute allowedRole="buyer">
            <BuyerEditProfile />
        </ProtectedRoute>
    }
/>
        <Route
          path="/edit-crop/:id"
          element={
            <ProtectedRoute allowedRole="farmer">
              <EditCrop />
            </ProtectedRoute>
          }
        />

        <Route
          path="/farmer-profile"
          element={
            <ProtectedRoute allowedRole="farmer">
              <FarmerProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
