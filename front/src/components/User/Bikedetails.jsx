import React from 'react';
import { useBike } from '../User/Bikecontext';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import axios

const BikeDetails = () => {
  const { selectedBike } = useBike(); // Ensure fetchBikes is available from context
  const navigate = useNavigate();

  if (!selectedBike) {
    return <h2 style={{ color: 'white', textAlign: 'center' }}>No bike selected. Go back to the home page.</h2>;
  }

  const handleBuynow = async () => {
    // if (window.confirm("Do you want to buy this bike?")) {
    //   try {
    //     // Decrease stock by 1
    //     const updatedBikeData = {
    //       ...selectedBike, // Copy existing bike data
    //       Stock: selectedBike.Stock - 1, // Reduce stock by 1
    //     };

    //     await axios.put(`http://localhost:5000/api/bikes/update/${selectedBike._id}`, updatedBikeData);

    //     alert("Bike purchased successfully!");
    //     fetchBikes(); // Refresh bike list
    //   } catch (error) {
    //     console.error("Error updating bike:", error);
    //   }
    // }
    navigate("/address")
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,rgb(5, 12, 82), #1e1e1e,rgb(11, 4, 64))',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '20px',
        borderRadius: '15px',
        color: 'white',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <img src={selectedBike.bikeImage} alt={selectedBike.name} 
          style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }} 
        />
        <h2 style={{ color: 'yellow' }}>{selectedBike.name}</h2>
        <p><strong>Model:</strong> {selectedBike.model}</p>
        <p><strong>Engine:</strong> {selectedBike.engine}</p>
        <p><strong>Power:</strong> {selectedBike.power}</p>
        <p><strong>Mileage:</strong> {selectedBike.mileage}</p>
        <p><strong>Ex Showroom Price:</strong> {selectedBike.price}</p>
        <p><strong>Stock Left:</strong> {selectedBike.Stock}</p> {/* Display stock count */}
        
        <button onClick={() => navigate(-1)} 
          style={{ background: 'yellow', color: 'black', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px' }}
        >
          Go Back
        </button>
        <button onClick={handleBuynow} 
          style={{ background: 'green', color: 'black', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Buy Now
        </button>
        <button onClick={()=>{navigate("/bankloan")}} 
          style={{ background: 'green', color: 'black', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Bank Loan
        </button>
        <button onClick={()=>{navigate("/paylater")}} 
          style={{ background: 'green', color: 'black', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          PayLater
        </button>
      </div>
    </div>
  );
};

export default BikeDetails;
