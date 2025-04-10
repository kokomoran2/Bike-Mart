import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Bike from "../assets/b3.mp4";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Index() {
  const navigate = useNavigate(); // Declare navigate

  return (
    <div>
      {/* Switch Button */}
      <div className="position-absolute top-0 end-0 m-3">
        <button 
          className="btn btn-warning fw-bold" 
          onClick={() => navigate("/ktmindex")} // Use navigate correctly
        >
          Switch to KTM
        </button>
      </div>

      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          background: "linear-gradient(135deg, rgb(30, 40, 30), rgb(10, 15, 10))",
          borderBottom: "2px solid rgba(0, 255, 0, 0.5)", // Neon green accent
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-bold" href="/">
            Brand
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-white" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/login">Login</a>
              </li>

              {/* Bike Finance Dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle text-white border-0 bg-transparent"
                  id="bikeFinanceDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Bike Finance
                </button>
                <ul className="dropdown-menu" aria-labelledby="bikeFinanceDropdown">
                  <li>
                    <a className="dropdown-item" href="/paylater">Paylater</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/bankloan">Bank Loans</a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link text-white" href="/testdrive">Test Drive</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Fullscreen Video with Overlay */}
      <div className="position-relative">
        <video 
          src={Bike} 
          autoPlay 
          loop
          muted
          className="w-100 vh-100 object-fit-cover" 
        />

        {/* Centered Text */}
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="text-white fw-bold display-4">Welcome to Bike Mart</h1>
          <h3 className="text-white fw-light">Your Bike Partner</h3>
        </div>

        {/* Bottom Buttons (Admin, About, Support) */}
        <nav className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
          <ul className="nav flex-column text-center">
            <li className="nav-item">
              <a href="/login" className="nav-link text-black">Admin</a>
            </li>
            <li className="nav-item">
              <a href="/aboutus" className="nav-link text-black">About Us</a>
            </li>
            <li className="nav-item">
              <a href="/support" className="nav-link text-black">Support</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Index;