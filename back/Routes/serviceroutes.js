const express = require("express");
const {
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
    searchServiceCenterById
  } = require("../controllers/addservicecontroller");
  

const router = express.Router();

router.get("/", getAllServiceCenters);  
router.get("/address/:address", getServiceCenterByAddress);  
router.post("/add", addServiceCenter);  
router.put("/update", updateAllServiceCenters);  
router.put("/:id", updateServiceCenterById);  
router.delete("/delete", deleteAllServiceCenters);
router.delete("/delete/:id", deleteServiceCenterById);  
router.get("/nearest", searchNearestCenters); 
router.get("/reverse-geocode", reverseGeocode);
router.get("/calculate-route", calculateRoute);
router.get("/searchby/:id", searchServiceCenterById);

module.exports = router;
