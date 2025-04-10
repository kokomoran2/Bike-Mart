import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Navbarwishlist({ setFilteredBikes }) {
    // ✅ Using useCallback to prevent re-creation inside useEffect
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

    return (
        <Navbar expand="lg" variant="dark" className="navbar-custom w-full">
            <Container>
                <Navbar.Brand href="/" className="text-yellow-300 font-bold text-2xl">
                    BikeMart
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center gap-4">
                        <Nav.Link href="/user" className="nav-item">Home</Nav.Link>
                        <Nav.Link href="/service" className="nav-item">Book Service</Nav.Link>
                        <Nav.Link href="/testdrive" className="nav-item">Test Drive</Nav.Link>
                        <Nav.Link href="/feedback" className="nav-item">Contact us</Nav.Link>
                        <Nav.Link href="/" className="nav-item">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>

            {/* ✅ Custom Styles */}
            <style>
                {`
                .navbar-custom {
                    background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
                    padding: 15px 20px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
                }
                .nav-item {
                    color: white !important;
                    font-weight: bold;
                    font-size: 1.2rem;
                    transition: 0.3s;
                }
                .nav-item:hover {
                    color: #ffd700 !important;
                }
                .dropdown-custom .dropdown-menu {
                    background: rgba(85, 131, 148, 0.52);
                    border-radius: 8px;
                    padding: 10px;
                    box-shadow: 0px 4px 10px rgb(240, 235, 235);
                }
                .dropdown-custom .dropdown-item {
                    font-size: 1rem;
                    color: rgb(236, 241, 243) !important;
                    padding: 8px 15px;
                    transition: 0.3s;
                }
                .dropdown-custom .dropdown-item:hover {
                    background: #ffd700;
                    color: #0f2027 !important;
                    border-radius: 5px;
                }
                `}
            </style>
        </Navbar>
    );
}