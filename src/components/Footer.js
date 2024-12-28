// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto text-center">
        <p>&copy; 2024 E-commerce, All Rights Reserved</p>
        <div className="space-x-4 mt-2">
          <a href="/terms" className="hover:text-blue-300">Terms</a>
          <a href="/privacy" className="hover:text-blue-300">Privacy</a>
          <a href="/contact" className="hover:text-blue-300">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
