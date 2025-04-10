const ServiceCenter = require("../models/servicecenter");

// GET all service centers
const getAllServiceCenters = async (req, res) => {
    try {
        const serviceCenters = await ServiceCenter.find();
        res.json(serviceCenters);
    } catch (error) {
        res.status(500).json({ message: "Error fetching service centers", error });
    }
};

// GET a single service center by ID
const getServiceCenterByAddress = async (req, res) => {
    try {
      const { address } = req.params;
      console.log("service",req.params);
      
      const serviceCenter = await ServiceCenter.findOne({ address });
  
      if (!serviceCenter) {
        return res.status(404).json({ message: 'Service Center not found.' });
      }
  
      res.json(serviceCenter);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  

const addServiceCenter = async (req, res) => {
    try {
        const { name, address, location, contact, status, closingTime, services } = req.body;

        // Check if all required fields are provided
        if (!name || !address || !location || !contact || !status || !closingTime || !services) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Validate location format
        if (!location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
            return res.status(400).json({ message: "Invalid location coordinates. Provide [longitude, latitude]." });
        }

        // Validate services format
        if (!Array.isArray(services)) {
            return res.status(400).json({ message: "Services must be an array." });
        }

        // Create and save new service center
        const newServiceCenter = new ServiceCenter({
            name,
            address,
            location,
            contact,
            status,
            closingTime,
            services
        });

        await newServiceCenter.save();

        return res.status(201).json({
            message: "Service center added successfully!",
            serviceCenter: newServiceCenter
        });

    } catch (error) {
        console.error("Error adding service center:", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};



// PUT (Update all service centers - this is optional, usually not needed)
const updateAllServiceCenters = async (req, res) => {
    try {
        await ServiceCenter.updateMany({}, req.body);
        res.json({ message: "All service centers updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error updating service centers", error });
    }
};

// PUT (Update a single service center by ID)
const updateServiceCenterById = async (req, res) => {
    try {
        const updatedServiceCenter = await ServiceCenter.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedServiceCenter) {
            return res.status(404).json({ message: "Service center not found" });
        }

        res.json({ message: "Service center updated successfully!", serviceCenter: updatedServiceCenter });
    } catch (error) {
        res.status(500).json({ message: "Error updating service center", error });
    }
};

// DELETE (Delete all service centers)
const deleteAllServiceCenters = async (req, res) => {
    try {
        await ServiceCenter.deleteMany();
        res.json({ message: "All service centers deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting service centers", error });
    }
};

// DELETE (Delete a single service center by ID)
const deleteServiceCenterById = async (req, res) => {
    try {
        const deletedServiceCenter = await ServiceCenter.findByIdAndDelete(req.params.id);
        if (!deletedServiceCenter) {
            return res.status(404).json({ message: "Service center not found" });
        }
        res.json({ message: "Service center deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting service center", error });
    }
};

const searchNearestCenters = async (req, res) => {
    try {
      const { longitude, latitude } = req.query;
   
      if (!longitude || !latitude) {
        return res.status(400).json({ message: "Longitude and Latitude are required." });
      }
   
      const formattedCoordinates = [parseFloat(longitude), parseFloat(latitude)];
   
      if (isNaN(formattedCoordinates[0]) || isNaN(formattedCoordinates[1])) {
        return res.status(400).json({ message: "Invalid coordinates. Provide valid longitude and latitude." });
      }
   
      // Perform geospatial query
      const centers = await ServiceCenter.find({
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: formattedCoordinates },
            $maxDistance: 50000 // 50km
          }
        }
      });
   
      if (!centers.length) {
        return res.status(404).json({ message: "No service centers found within the range." });
      }
   
      res.status(200).json(centers);
    } catch (error) {
      console.error("Error fetching nearest service centers:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
// REVERSE GEOCODING (Convert Coordinates to Address)
const reverseGeocode = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        if (!latitude || !longitude) {
            return res.status(400).json({ message: "Latitude and Longitude are required." });
        }

        const apiKey = "biRbS1TMgUKGrd6Q0xLHbG4LC4XFWB5W0pYd2Q_JSYQ";
        const response = await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apiKey=${apiKey}`);

        const address = response.data.items[0]?.address?.label || "Address not found";
        res.json({ address });
    } catch (error) {
        console.error("Error performing reverse geocoding:", error);
        res.status(500).json({ message: "Error retrieving address." });
    }
};

// ROUTE CALCULATION using HERE Maps API
const calculateRoute = async (req, res) => {
    try {
        const { origin, destination } = req.query;
        if (!origin || !destination) {
            return res.status(400).json({ message: "Origin and Destination coordinates are required." });
        }

        const apiKey = "biRbS1TMgUKGrd6Q0xLHbG4LC4XFWB5W0pYd2Q_JSYQ";
        const response = await axios.get(`https://router.hereapi.com/v8/routes?transportMode=car&origin=${origin}&destination=${destination}&return=polyline,summary&apiKey=${apiKey}`);

        res.json(response.data);
    } catch (error) {
        console.error("Error calculating route:", error);
        res.status(500).json({ message: "Error calculating route." });
    }
};

// SEARCH service centers by location name
const searchServiceCenterById = async (req, res) => {
    try {
      const { id } = req.params; // Get ID from URL params
  
      if (!id) {
        return res.status(400).json({ message: "Service center ID is required." });
      }
  
      const center = await ServiceCenter.findById(id);
  
      if (!center) {
        return res.status(404).json({ message: "Service center not found." });
      }
  
      res.status(200).json(center);
    } catch (error) {
      console.error("Error fetching service center by ID:", error);
      res.status(500).json({ message: "Error fetching service center", error: error.message });
    }
  };
  

module.exports = {
    getAllServiceCenters,
    getServiceCenterByAddress,
    addServiceCenter,
    updateAllServiceCenters,
    updateServiceCenterById,
    deleteAllServiceCenters,
    deleteServiceCenterById,
    searchNearestCenters,
    reverseGeocode,
    calculateRoute,
    searchServiceCenterById,
  };