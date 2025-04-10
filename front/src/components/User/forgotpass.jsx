import React, { useState } from "react";

const ForgotPass = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const handleEmailSubmit = async () => {
    // Send email to backend to trigger OTP
    console.log("Sending OTP to", email);
    setStep(2);
  };
  
  const handleOtpSubmit = async () => {
    // Verify OTP
    console.log("Verifying OTP", otp);
    setStep(3);
  };
  
  const handleSecuritySubmit = async () => {
    // Validate security answer
    console.log("Checking answer", securityAnswer);
    setStep(4);
  };
  
  const handlePasswordReset = async () => {
    // Update password in backend
    console.log("Resetting password", newPassword);
    alert("Password reset successful!");
    setStep(1);
  };
  
  return (
    <div className="forgot-password">
      {step === 1 && (
        <div>
          <h2>Forgot Password</h2>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleEmailSubmit}>Send OTP</button>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <h2>Enter OTP</h2>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={handleOtpSubmit}>Verify OTP</button>
        </div>
      )}
      
      {step === 3 && (
        <div>
          <h2>Security Question</h2>
          <input type="text" placeholder="Enter your answer" value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)} />
          <button onClick={handleSecuritySubmit}>Verify Answer</button>
        </div>
      )}
      
      {step === 4 && (
        <div>
          <h2>Reset Password</h2>
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button onClick={handlePasswordReset}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default ForgotPass;