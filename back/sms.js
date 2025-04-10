const axios = require("axios");

const FAST2SMS_API_KEY = "JMdRnFuToLQCcwxYbD50O98HEPf3tasipSzqkWK62Ig7BG4v1VbUtKh48ilsIygwzpjeSHaQWTNALmOR";

const sendSMS = async (phoneNumber, customerName, bookingDate) => {
  const message = `Hi ${customerName}, your test drive is booked for ${bookingDate}. Thank you for choosing us!`;

  const params = {
    authorization: FAST2SMS_API_KEY,
    route: "q",
    message,
    language: "english",
    flash: "0",
    numbers: phoneNumber,
  };

  try {
    const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", { params });

    if (response.data.return === true) {
      console.log("✅ SMS sent successfully:", response.data);
    } else {
      console.log("⚠️ SMS not sent. Reason:", response.data);
    }
  } catch (error) {
    console.error("❌ Error sending SMS:", error.response?.data || error.message);
  }
};

module.exports = sendSMS;
