import React from "react";
import { motion } from "framer-motion";

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center"
      >
        {/* Header */}
        <div className="flex justify-center items-center space-x-2">
          <h2 className="text-xl font-bold text-gray-800">ALERT</h2>
          <span className="text-2xl">😏</span>
        </div>

        {/* Message */}
        <p className="mt-3 text-gray-600 text-sm">{message}</p>

        {/* Button */}
        <button
          onClick={onClose}
          className="mt-5 bg-blue-500 text-black px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default Popup;