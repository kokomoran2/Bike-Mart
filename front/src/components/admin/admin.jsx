import React, { useState } from "react";
import {
  FaHome,
  FaMotorcycle,
  FaTools,
  FaComment,
  FaMale,
  FaCaretLeft,
  FaCaretRight,
} from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";

function Admin() {
  const [showReports, setShowReports] = useState(false);

  const buttons = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/Addbike", label: "Add Bike", icon: <FaMotorcycle /> },
    { path: "/Viewbike", label: "View Bikes", icon: <FaMotorcycle /> },
    { path: "/Viewtestdrive", label: "View TestDrive Bookings", icon: <FaMotorcycle /> },
    { path: "/Addservice", label: "Add Service Center", icon: <FaTools /> },
    { path: "/viewservice", label: "View Service Center", icon: <FaTools /> },
    { path: "/viewcustomer", label: "Customer Details", icon: <FaMale /> },
    { path: "/viewfeedback", label: "Feedback", icon: <FaComment /> },
  ];

  const reports = [
    { path: "/viewsales", label: "Bike Bookings" },
    { path: "/bikesold", label: "Sold bikes" },
    { path: "/viewdistrictreport", label: "District Report" },
    { path: "/viewdatereport", label: "Date Report" },
    { path: "/viewbookings", label: "Service Bookings" },
  ];

  return (
    <div style={mainContainer}>
      <h1 style={titleStyle}>Admin Dashboard</h1>
      <h3 style={subtitleStyle}>Manage Your Bike Platform with Energy ⚡</h3>

      {/* Buttons Container */}
      <div style={buttonGrid}>
        {/* Main Buttons */}
        {buttons.map((button, index) => (
          <a key={index} href={button.path} style={buttonStyle} onMouseOver={hoverEffect} onMouseOut={resetEffect}>
            {button.icon} {button.label}
          </a>
        ))}

        {/* Reports Dropdown Button */}
 {/* Reports Dropdown Button */}
<div style={{ position: "relative" }}>
  <div 
    onClick={() => setShowReports(!showReports)} 
    style={buttonStyle} 
    onMouseOver={hoverEffect} 
    onMouseOut={resetEffect}
  >
    <FaChartBar /> Reports {showReports ? <FaCaretLeft /> : <FaCaretRight />}
  </div>

  {/* Right-Side Dropdown for Reports */}
  {showReports && (
    <div style={{
      position: "absolute",
      top: "0",
      right: "-250px", // Moves dropdown to the right
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: "230px",
      padding: "10px",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(20px)",
      transition: "0.3s ease-in-out",
    }}>
      {reports.map((report, index) => (
        <a key={index} href={report.path} style={subButtonStyle} onMouseOver={hoverEffect} onMouseOut={resetEffect}>
          {report.label}
        </a>
      ))}
    </div>
  )}
</div>
</div>
    </div>
  );
}

/* Styles */
const mainContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  background: "linear-gradient(135deg,rgb(18, 47, 83),rgb(26, 87, 104))",
  color: "white",
  textAlign: "center",
  fontFamily: "'Poppins', sans-serif",
  padding: "20px",
};

const titleStyle = {
  fontSize: "4rem",
  fontWeight: "bold",
  color: "#fff",
  textShadow: "4px 4px 30px rgba(255, 255, 255, 0.9)",
  marginBottom: "15px",
  letterSpacing: "2px",
};

const subtitleStyle = {
  fontSize: "1.6rem",
  fontWeight: "300",
  color: "#e3f2fd",
  marginBottom: "30px",
};

const buttonGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: "20px",
  width: "80%",
  maxWidth: "1000px",
};

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  padding: "18px",
  background: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  textDecoration: "none",
  fontSize: "1.3rem",
  fontWeight: "bold",
  borderRadius: "14px",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 5px 20px rgba(255, 255, 255, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(15px)",
  textTransform: "uppercase",
  cursor: "pointer",
};

// const reportsContainer = {
//   display: "flex",
//   flexDirection: "column",
//   gap: "10px",
//   width: "230px",
//   marginTop: "10px",
//   padding: "10px",
//   background: "rgba(255, 255, 255, 0.1)",
//   borderRadius: "12px",
//   boxShadow: "0 4px 15px rgba(255, 255, 255, 0.3)",
//   backdropFilter: "blur(20px)",
// };

const subButtonStyle = {
  ...buttonStyle,
  fontSize: "1.1rem",
  padding: "14px",
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.4)",
  width: "100%",
  textAlign: "center",
};

/* Hover Effects */
const hoverEffect = (e) => {
  e.target.style.background = "rgba(255, 255, 255, 0.3)";
  e.target.style.color = "#0072ff";
  e.target.style.transform = "scale(1.05)";
  e.target.style.boxShadow = "0 5px 25px rgba(255, 255, 255, 0.6)";
};

const resetEffect = (e) => {
  e.target.style.background = "rgba(255, 255, 255, 0.1)";
  e.target.style.color = "#fff";
  e.target.style.transform = "scale(1)";
  e.target.style.boxShadow = "0 5px 20px rgba(255, 255, 255, 0.3)";
};

export default Admin;
