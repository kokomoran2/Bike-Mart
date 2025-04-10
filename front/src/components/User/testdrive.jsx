import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bike from "../../assets/b2.mp4";

const bikeOptions = [
  "Bajaj Pulsar NS200",
  "Bajaj Pulsar NS160",
  "Bajaj Pulsar RS200",
  "Bajaj Pulsar NS 400",
  "Bajaj Pulsar 150",
  "Bajaj Pulsar 125",
  "Bajaj Pulsar 220",
  "Bajaj Dominar 400",
  "Bajaj Pulsar N250",
  "Bajaj Pulsar N150",
  "Bajaj Platina 110",
  "Bajaj Platina 100",
  "Bajaj Dominar 250",
  "Bajaj Avenger 160",
  "Bajaj CT 110X",
  "Bajaj Avenger 220 Street",
];

const showrooms = [
  { name: "Popular Bajaj", location: "Palarivattom, Kochi" },
  { name: "Popular Bajaj", location: "Kakkanad, Kochi" },
  { name: "Popular Bajaj", location: "Tripunithura, Kochi" },
  { name: "Popular Bajaj", location: "Muvattupuzha" },
  { name: "Popular Bajaj", location: "Alappuzha" },
  { name: "Popular Bajaj", location: "Thrissur" },
  { name: "Popular Bajaj", location: "Ernakulam" },
  { name: "Popular Bajaj", location: "Kottayam" },
  { name: "Popular Bajaj", location: "Karukutty" },
  { name: "Popular Bajaj", location: "Perumbavoor" },
  { name: "Popular Bajaj", location: "Edapally" },
  { name: "Popular Bajaj", location: "Aluva" },
];

const TestDrive = () => {
  const navigate = useNavigate();
  const [bike, setBike] = useState("");
  const [showroom, setShowroom] = useState("");
  const [filteredShowrooms, setFilteredShowrooms] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowroomChange = (e) => {
    const input = e.target.value;
    setShowroom(input);
    const filtered = showrooms.filter((s) =>
      `${s.name} - ${s.location}`.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredShowrooms(filtered);
    setShowDropdown(true);
  };

  const handleShowroomSelect = (value, s) => {
    setShowroom(value);
    setShowDropdown(false);
    // Save to localStorage for access in BookTestDrive
    localStorage.setItem("bikeName", bike);
    localStorage.setItem("showroomName", s.name);
    localStorage.setItem("showroomLocation", s.location);
    navigate("/booktestdrive");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bike && showroom) {
      alert("Please select a showroom from the dropdown");
    } else {
      alert("Please select a bike and enter showroom name.");
    }
  };

  return (
    <div className="position-relative">
      <video
        src={Bike}
        autoPlay
        muted
        loop
        className="position-fixed top-0 start-0 w-100 vh-100 object-fit-cover z-n1"
      />
      <div className="container py-5 text-white">
        <h2 className="mb-4">Book Your Test Drive</h2>
        <form onSubmit={handleSubmit} className="bg-dark bg-opacity-75 p-4 rounded">
          <div className="mb-3">
            <label>Bike Model</label>
            <select
              value={bike}
              onChange={(e) => setBike(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select a bike</option>
              {bikeOptions.map((b, i) => (
                <option key={i} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="mb-3 position-relative">
            <label>Showroom</label>
            <input
              type="text"
              value={showroom}
              onChange={handleShowroomChange}
              className="form-control"
              placeholder="Location"
              required
              onFocus={() => setShowDropdown(true)}
            />
            {showDropdown && filteredShowrooms.length > 0 && (
              <ul
                className="list-group position-absolute w-100"
                style={{ zIndex: 10 }}
                onMouseDown={(e) => e.preventDefault()}
              >
                {filteredShowrooms.map((s, i) => (
                  <li
                    key={i}
                    className="list-group-item list-group-item-action"
                    onMouseDown={() =>
                      handleShowroomSelect(`${s.name} - ${s.location}`, s)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {s.name} - {s.location}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit" className="btn btn-primary">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default TestDrive;
