import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BikeContext = createContext();

export const BikeProvider = ({ children }) => {
  const [selectedBike, setSelectedBike] = useState(null);
  const [bikes, setBikes] = useState([]); // ✅ Store bikes
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // ✅ Fetch bikes from API
  const fetchBikes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bikes/all");
      setBikes(response.data);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
  };

  // Fetch bikes on mount
  useEffect(() => {
    fetchBikes();
  }, []);

  // Sync wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggle Wishlist (Add/Remove a bike)
  const toggleWishlist = (bike) => {
    setWishlist((prevWishlist) => {
      const isAlreadyInWishlist = prevWishlist.some((b) => b._id === bike._id);
      return isAlreadyInWishlist
        ? prevWishlist.filter((b) => b._id !== bike._id) // Remove from wishlist
        : [...prevWishlist, bike]; // Add to wishlist
    });
  };

  return (
    <BikeContext.Provider value={{ selectedBike, setSelectedBike, wishlist, toggleWishlist, bikes, fetchBikes }}>
      {children}
    </BikeContext.Provider>
  );
};

// Hook to use Bike Context
export const useBike = () => useContext(BikeContext);
