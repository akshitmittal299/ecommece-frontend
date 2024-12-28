// src/components/Header.js
import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">E-commerce</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:text-blue-300">Home</a>
            </li>
            <li>
              <a href="/products" className="hover:text-blue-300">Products</a>
            </li>
            <li>
              <a href="/cart" className="hover:text-blue-300">Cart</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
