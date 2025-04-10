import React, { useState } from "react";
import Bike from "../../assets/bb1.webp";

const banks = [
  { name: "Bank of India", rate: 8.75, link: "https://bankofindia.co.in/vehicle-loan1" },
  { name: "IDFC First Bank", rate: 8.5, link: "https://www.idfcfirstbank.com/personal-banking/loans/two-wheeler-loan" },
  { name: "ICICI Bank", rate: 10.5, link: "https://www.icicibank.com/personal-banking/loans/two-wheeler-loan" },
  { name: "Axis Bank", rate: 10.5, link: "https://www.axisbank.com/retail/loans/two-wheeler-loans" },
  { name: "Punjab National Bank", rate: 10.9, link: "https://www.pnbindia.in/" },
  { name: "HDFC Bank", rate: 14.5, link: "https://www.hdfcbank.com/personal/borrow/popular-loans/two-wheeler-loan" },
  { name: "State Bank of India", rate: 12.85, link: "https://sbi.co.in/hi/web/personal-banking/loans/auto-loans/sbi-two-wheeler-loan-scheme" },
  { name: "UCO Bank", rate: 10.0, link: "https://www.ucobank.com/vehicle-loan1" },
  { name: "Bajaj Auto Finance", rate: 35.0, link: "https://www.bajajfinserv.in/two-wheeler-loan" },
];

const bikes = [
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

const monthsOptions = [12, 24, 36, 48, 60];

const BankLoan = () => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedBike, setSelectedBike] = useState(null);
  const [months, setMonths] = useState(12);
  const [downPayment, setDownPayment] = useState(null);
  const [emiDetails, setEmiDetails] = useState(null);


  const calculateEMI = () => {
    if (!selectedBank || !selectedBike) return;

    const maxDownPayment = selectedBike.price;
    const downPaymentValue = Math.min(downPayment, maxDownPayment);
    const loanAmount = selectedBike.price - downPaymentValue;
    const annualRate = selectedBank.rate;
    const monthlyRate = annualRate / 12 / 100;
    const tenure = months;

    if (loanAmount <= 0) {
      alert("Down payment cannot be equal to or more than the bike price!");
      return;
    }

    if (downPaymentValue < 10000) {
      alert("Minimum downpayment amount is 10,000");
      return;
    }

    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);

    const totalPayable = emi * tenure;
    const interestPayable = totalPayable - loanAmount;

    setEmiDetails({
      loanAmount: loanAmount.toFixed(2),
      emi: emi.toFixed(2),
      totalPayable: totalPayable.toFixed(2),
      interestPayable: interestPayable.toFixed(2),
    });
  };

  const applyNow = () => {
    if (selectedBank && selectedBank.link) {
      window.location.href = selectedBank.link;
    } else {
      alert("Please select a bank to apply.");
    }
  };

  return (
    <div className="position-relative">
      {/* Background Image */}
      <img
        src={Bike}
        alt="Bike"
        className="img-fluid d-block w-100"
        style={{
          height: "100vh",
          objectFit: "cover",
          marginTop: "0px",
        }}
      />

      {/* Form Overlay */}
      <div
        className="position-absolute top-50 start-50 p-4 shadow-lg rounded-lg"
        style={{
          width: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(74, 42, 42, 0.8)",  // Semi-transparent white
          backdropFilter: "blur(10px)",  // Glassmorphism effect
        }}
      >

        <h2 className="text-lg font-semibold mb-4 text-center">Bike Loan EMI Calculator</h2>

        {/* Bike Selection */}
        <div className="mb-4">
          <label className="block font-medium">Select a Bike:</label>
          <select
            className="w-full p-2 border rounded"
            onChange={(e) =>
              setSelectedBike(bikes.find((bike) => bike.name === e.target.value))
            }
          >
            <option value="">-- Choose Bike --</option>
            {bikes.map((bike) => (
              <option key={bike.name} value={bike.name}>
                {bike.name} (₹{bike.price.toLocaleString()})
              </option>
            ))}
          </select>
        </div>

        {/* Bank Selection */}
        <div className="mb-4">
          <label className="block font-medium">Select a Bank:</label>
          <select
            className="w-full p-2 border rounded"
            onChange={(e) =>
              setSelectedBank(banks.find((bank) => bank.name === e.target.value))
            }
          >
            <option value="">-- Choose Bank --</option>
            {banks.map((bank) => (
              <option key={bank.name} value={bank.name}>
                {bank.name} ({bank.rate}% p.a.)
              </option>
            ))}
          </select>
        </div>

        {/* Down Payment Input */}
        <div className="mb-4">
          <label className="block font-medium">Enter Down Payment (₹):</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Enter Down Payment"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            min="0"
            max={selectedBike ? selectedBike.price : ""}
          />
        </div>

        {/* Tenure Selection */}
        <div className="mb-4">
          <label className="block font-medium">Select Tenure (Months):</label>
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => setMonths(Number(e.target.value))}
          >
            {monthsOptions.map((m) => (
              <option key={m} value={m}>
                {m} Months
              </option>
            ))}
          </select>
        </div>

        <button onClick={calculateEMI} className="w-full bg-blue-500 text-black p-2 rounded hover:bg-blue-600">
          Calculate EMI
        </button>

        <button onClick={applyNow} className="w-full bg-green-500 text-black p-2 rounded hover:bg-green-600 mt-2">
          Apply Now
        </button>

        {emiDetails && (
          <div className="mt-4 p-4 bg-gray-100 rounded text-white ">
            <h3 className="font-medium text-lg">Loan Details</h3>
            <p><strong>Bank:</strong> {selectedBank.name}</p>
            <p><strong>Monthly EMI:</strong> ₹{emiDetails.emi}</p>
            <p><strong>Loan Amount:</strong> ₹{emiDetails.loanAmount}</p>
            <p><strong>Total Payable Amount:</strong> ₹{emiDetails.totalPayable}</p>
            <p><strong>Interest Amount:</strong> ₹{emiDetails.interestPayable}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BankLoan;