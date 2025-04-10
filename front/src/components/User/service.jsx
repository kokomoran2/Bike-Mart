import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HERE_API_KEY = "biRbS1TMgUKGrd6Q0xLHbG4LC4XFWB5W0pYd2Q_JSYQ";

const Service = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const navigate = useNavigate();

  const initializeMap = (lat = 11.3046, lng = 75.877) => {
    if (!window.H) {
      console.error("HERE Maps library is not loaded. Please check your API key and network.");
      return;
    }
    
    if (!mapInstance.current) {
      const platform = new window.H.service.Platform({ apikey: HERE_API_KEY });
      const defaultLayers = platform.createDefaultLayers();
  
      mapInstance.current = new window.H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        { center: { lat, lng }, zoom: 12 }
      );
  
      new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(mapInstance.current));
      window.H.ui.UI.createDefault(mapInstance.current, defaultLayers);
    } else {
      mapInstance.current.setCenter({ lat, lng });
      mapInstance.current.setZoom(12);
    }
  };
  

  // Place Markers on Map
  const placeMarkers = (centers) => {
    if (!mapInstance.current) return;
    mapInstance.current.removeObjects(mapInstance.current.getObjects());

    centers.forEach((center) => {
      if (center?.location?.coordinates) {
        const marker = new window.H.map.Marker({
          lat: center.location.coordinates[1],
          lng: center.location.coordinates[0],
        });
        mapInstance.current.addObject(marker);
      }
    });
  };

  // Fetch Service Center by Address
  const fetchServiceCenterByAddress = async () => {
    if (!searchAddress.trim()) return alert("Please enter a valid Service Center Address.");
    setLoading(true);

    try {
      const { data } = await axios.get(`http://localhost:5000/api/service-centers/address/${searchAddress}`);
      if (!data || !data.location?.coordinates) throw new Error("Invalid service center data.");
      setServiceCenters([data]);

      const [lng, lat] = data.location.coordinates;
      initializeMap(lat, lng);
      placeMarkers([data]);
    } catch (err) {
      console.error("Error fetching service center by Address:", err);
      alert(err.response?.data?.message || err.message || "Service Center not found.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Book Now
  const handleBookNow = (centerName) => {
    localStorage.setItem("serviceCenterName", centerName); // Store in localStorage
    navigate("/bookservice"); // Navigate to BookService page
  };

  useEffect(() => initializeMap(), []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Find Service Centers By Address</h2>

      <div>
        <input
          type="text"
          placeholder="Enter Service Center Address"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
        />
        <button onClick={fetchServiceCenterByAddress}>Search</button>
      </div>

      {loading ? (
        <p>Loading service centers...</p>
      ) : serviceCenters.length === 0 ? (
        <p>No service centers found.</p>
      ) : (
        <ul>
          {serviceCenters.map((center) => (
            <li key={center._id} style={{ marginBottom: '20px' }}>
              <strong>{center.name}</strong> - {center.address}
              <p><strong>Contact:</strong> {center.contact}</p>
              <p><strong>Status:</strong> {center.status}</p>
              <p><strong>Closing Time:</strong> {center.closingTime}</p>
              <p><strong>Services Provided:</strong></p>
              <ul>
                {center.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
              <button 
                onClick={() => handleBookNow(center.name)} 
                style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', marginTop: '10px' }}
              >
                Book Now
              </button>
            </li>
          ))}
        </ul>
      )}

      <div ref={mapRef} style={{ width: "100%", height: "400px", marginTop: "20px" }}></div>
    </div>
  );
};

export default Service;
