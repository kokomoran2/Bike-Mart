import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbaruser from "../navbaruser";
import { useBike } from "../User/Bikecontext";

const User = () => {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [expandedBike, setExpandedBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { wishlist, toggleWishlist, setSelectedBike } = useBike();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBikes();
  }, []);

  useEffect(() => {
    setFilteredBikes(bikes);
  }, [bikes, wishlist]);

  // Fetch bike list from API
  const fetchBikes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bikes/all");
      setBikes(response.data);
    } catch (error) {
      console.error("Error fetching bikes:", error);
      setError("Failed to load bikes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // View Bike Details
  const handleViewDetails = (bike) => {
    setSelectedBike(bike);
    navigate("/bikedetails");
  };

  // Expand Bike Details
  const toggleExpand = (bikeId) => {
    setExpandedBike(expandedBike === bikeId ? null : bikeId);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, rgb(5, 12, 82), #1e1e1e, rgb(11, 4, 64))",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Navbaruser bikes={bikes} setFilteredBikes={setFilteredBikes} />

      {/* Loading & Error Handling */}
      {loading && <p style={{ color: "white" }}>Loading bikes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredBikes.map((bike) => (
          <div
            key={bike._id}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              padding: "15px",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
              cursor: "pointer",
              width: "280px",
              textAlign: "center",
              color: "white",
              position: "relative",
            }}
          >
            {/* Clickable Image with Hover Effect */}
            <img
              src={bike.bikeImage}
              alt={bike.name}
              onClick={() => handleViewDetails(bike)}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />

            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "yellow",
                marginTop: "10px",
              }}
            >
              {bike.name}
            </h3>

            {/* Wishlist Button */}
            <div
              style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}
              onClick={() => toggleWishlist(bike)}
            >
              {wishlist.some((b) => b._id === bike._id) ? (
                <FaHeart style={{ color: "red", fontSize: "24px" }} />
              ) : (
                <FaRegHeart style={{ color: "white", fontSize: "24px" }} />
              )}
            </div>

            {/* Expand Button */}
            <button
              onClick={() => toggleExpand(bike._id)}
              style={{
                background: "gray",
                color: "white",
                padding: "8px",
                borderRadius: "5px",
                width: "100%",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "5px",
              }}
            >
              {expandedBike === bike._id ? "Hide Details" : "More"} <FaInfoCircle style={{ marginLeft: "5px" }} />
            </button>

            {/* Expanded Bike Details */}
            {expandedBike === bike._id && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "10px",
                  textAlign: "left",
                }}
              >
                <p>
                  <strong>Ex showrrom Price:</strong> {bike.price}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
