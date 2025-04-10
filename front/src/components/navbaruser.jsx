import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaMale } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbaruser({ bikes, setFilteredBikes }) {
    const [searchQuery, setSearchQuery] = useState("");
    const customerEmail = localStorage.getItem("customerEmail") || "default";
    const encodedEmail = encodeURIComponent(customerEmail); // ✅ Encode email

    // Fetch Bikes with useCallback
    const fetchBikes = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/bikes/all");
            setFilteredBikes(response.data);
        } catch (error) {
            console.error("Error fetching bikes:", error);
        }
    }, [setFilteredBikes]);

    useEffect(() => {
        fetchBikes();
    }, [fetchBikes]);

    // Search Bikes (Debounced for better performance)
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!bikes || bikes.length === 0) return;

            const filtered = bikes.filter((bike) =>
                bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                bike.model.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setFilteredBikes(filtered);
        }, 300); // 300ms debounce time

        return () => clearTimeout(timeout);
    }, [searchQuery, bikes, setFilteredBikes]);

    return (
        <Navbar expand="lg" className="navbar-custom w-full">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-logo">
                    BikeMart
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center gap-4">
                        {/* 🔍 Search Bar */}
                        <div className="search-container">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                                placeholder="Search bikes..."
                            />
                            <button className="search-button">🔍</button>
                        </div>

                        {/* 🏠 Navigation Links */}
                        <Nav.Link as={Link} to="/user" className="nav-item">Home</Nav.Link>
                        <Nav.Link as={Link} to="/service" className="nav-item">Book Service</Nav.Link>
                        <Nav.Link as={Link} to="/testdrive" className="nav-item">Test Drive</Nav.Link>
                        <Nav.Link as={Link} to="/wishlist" className="nav-item">Wishlist</Nav.Link>
                        <Nav.Link as={Link} to="/feedback" className="nav-item">Contact Us</Nav.Link>

                        {/* 🛒 Orders */}
                        <Nav.Link as={Link} to={`/order/${encodedEmail}`} className="nav-item">Orders</Nav.Link>

                        {/* 👤 Profile */}
                        <Nav.Link as={Link} to="/profile" className="nav-item profile-link">
                            <FaMale className="menu-icon" /> Profile
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>

            {/* 🌟 Premium Styling */}
            <style>
                {`
                /* ✨ Glassmorphism Navbar */
                .navbar-custom {
                    background: rgba(15, 32, 39, 0.8);
                    backdrop-filter: blur(10px);
                    padding: 15px 20px;
                    border-radius: 12px;
                    box-shadow: 0px 4px 20px rgba(255, 215, 0, 0.2);
                    transition: all 0.3s ease-in-out;
                }

                /* 🚀 Brand Logo */
                .brand-logo {
                    color: #ffd700 !important;
                    font-weight: bold;
                    font-size: 1.8rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    transition: 0.3s;
                }
                .brand-logo:hover {
                    text-shadow: 0 0 8px rgba(255, 215, 0, 0.7);
                }

                /* 🎨 Navigation Links */
                .nav-item {
                    color: white !important;
                    font-weight: 500;
                    font-size: 1.2rem;
                    transition: 0.3s ease-in-out;
                    position: relative;
                }
                .nav-item::after {
                    content: "";
                    width: 0%;
                    height: 3px;
                    background: #ffd700;
                    position: absolute;
                    bottom: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    transition: width 0.3s ease-in-out;
                }
                .nav-item:hover::after {
                    width: 80%;
                }
                .nav-item:hover {
                    color: #ffd700 !important;
                }

                /* 🛠️ Search Box */
                .search-container {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50px;
                    padding: 5px;
                    box-shadow: 0px 4px 10px rgba(255, 215, 0, 0.2);
                }
                .search-input {
                    border: none;
                    background: transparent;
                    color: white;
                    padding: 10px;
                    width: 180px;
                    outline: none;
                    border-radius: 20px;
                }
                .search-button {
                    background: #ffd700;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .search-button:hover {
                    background: #fff;
                }

                /* 👤 Profile Icon */
                .profile-link {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    transition: 0.3s;
                }
                .profile-link:hover {
                    color: #ffd700 !important;
                }
                `}
            </style>
        </Navbar>
    );
}
