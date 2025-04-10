import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const PaymentGateway = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name || "N/A";
  const number = location.state?.number || "N/A";
  const downPayment = location.state?.downPayment || 0;
  const emi = location.state?.emi || 0;

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.text("Payment Receipt", 20, 20);
    doc.setFont("helvetica", "normal");

    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Number: ${number}`, 20, 50);
    doc.text(`Paid Amount: ₹${downPayment.toLocaleString()}`, 20, 60);
    doc.text(`EMI per Month: ₹${emi.toFixed(2)}`, 20, 70);
    doc.text(`EMI Starts From: Next Month`, 20, 80);

    // Automatically downloads the PDF (user must move it manually)
    doc.save("payment_receipt.pdf");
  };

  const handlePayment = () => {
    if (downPayment <= 0) {
      alert("Please enter a valid down payment amount!");
      return;
    }

    // Simulate successful payment
    setTimeout(() => {
      setPaymentSuccess(true);
      alert("Our Executive will Contact You");

      // Generate and save PDF
      generatePDF();
    }, 4000);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-xl font-semibold mb-4">Payment Gateway</h2>

      {!paymentSuccess ? (
        <>
          <div className="mb-4 p-4 bg-gray-100 rounded">
            <h3 className="text-lg font-semibold">
              Amount to Pay Now: ₹{downPayment.toLocaleString()}
            </h3>
          </div>
          <button
            className="w-full p-3 bg-blue-600 text-black rounded hover:bg-blue-700"
            onClick={handlePayment}
          >
            Confirm Payment
          </button>
        </>
      ) : (
        <div className="p-4 bg-green-100 rounded">
          <h3 className="text-lg font-semibold text-green-700">
            ✅ Payment of ₹{downPayment.toLocaleString()} Successful!
          </h3>
          <p className="mt-2">Your EMI will start from next month.</p>
          <button
            className="mt-4 w-full p-3 bg-gray-600 text-black rounded hover:bg-gray-700"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;