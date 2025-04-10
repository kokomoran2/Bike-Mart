import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Paylater.css"; // Import CSS file

const bikeList = [
  { name: "Select Bike", price: 0 },
  { name: "Bajaj Pulsar NS200", price: 160000 },
  { name: "Bajaj Pulsar NS160", price: 148000 },
  { name: "Bajaj Pulsar RS200", price: 184000 },
  { name: "Bajaj Pulsar NS 400", price: 186000 },
  { name: "Bajaj Pulsar 150", price: 115000 },
  { name: "Bajaj Pulsar 125", price: 90000 },
  { name: "Bajaj Pulsar 220", price: 142000 },
  { name: "Bajaj Dominar 400", price: 233000 },
  { name: "Bajaj Pulsar N250", price: 152000 },
  { name: "Bajaj Pulsar N150", price: 125000 },
  { name: "Bajaj Platina 110", price: 71558 },
  { name: "Bajaj Platina 100", price: 68889 },
  { name: "Bajaj Dominar 250", price: 186000 },
  { name: "Bajaj Avenger 160", price: 120000 },
  { name: "Bajaj CT 110X", price: 70380 },
  { name: "Bajaj Avenger 220 Street", price: 143000 },
];

const PayLater = () => {
  const [selectedBike, setSelectedBike] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const fixedInterestRate = 28;
  const [loanPeriod, setLoanPeriod] = useState(12);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const navigate = useNavigate();

  const loanAmount = selectedBike - downPayment;
  const monthlyInterest = fixedInterestRate / 12 / 100;
  const emi =
    loanAmount > 0
      ? (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, loanPeriod)) /
        (Math.pow(1 + monthlyInterest, loanPeriod) - 1)
      : 0;

  const handlePayment = () => {
    if (!name || !number || downPayment <= 0) {
      alert("Please fill all details correctly.");
      return;
    }
    navigate("/payment", { state: { name, number, downPayment, emi } });
  };

  return (
    <div className="paylater-container">
      <div className="paylater-card">
        <h2 className="paylater-title"> PayLater</h2>

        <div className="form-group">
          <label>Select Bike</label>
          <select onChange={(e) => setSelectedBike(Number(e.target.value))}>
            {bikeList.map((bike, index) => (
              <option key={index} value={bike.price}>
                {bike.name} {bike.price ? `- ₹${bike.price.toLocaleString()}` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <input type="text" placeholder="Mobile Number" value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Down Payment (₹)</label>
          <input type="number" placeholder="Enter Down Payment" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
        </div>

        <div className="form-group">
          <label>Loan Period (Months)</label>
          <select value={loanPeriod} onChange={(e) => setLoanPeriod(Number(e.target.value))}>
            {[12, 18, 24, 30, 36].map((month) => (
              <option key={month} value={month}>
                {month} Months
              </option>
            ))}
          </select>
        </div>

        <div className="emi-info">
          <h4>Interest Rate: {fixedInterestRate}%</h4>
          <h3>EMI per month: ₹{emi.toFixed(2)}</h3>
        </div>

        <button className="pay-button" onClick={handlePayment}>
          Pay Now 💰
        </button>
      </div>
    </div>
  );
};

export default PayLater;
