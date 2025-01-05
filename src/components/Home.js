// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-100">
      {/* Hero Section */}
      <div className="text-center bg-white p-8 rounded-lg shadow-lg mt-12 w-11/12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to Our Store
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Find the best products at unbeatable prices!
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
          <button
            onClick={() => navigate('/products')}
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
          >
            Shop Now
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 max-w-6xl">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast Delivery</h3>
          <p className="text-gray-600">
            Get your products delivered to your doorstep in no time.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Exclusive Deals</h3>
          <p className="text-gray-600">
            Save big on your favorite products with our special discounts.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">24/7 Support</h3>
          <p className="text-gray-600">
            Need help? Our team is here for you around the clock.
          </p>
        </div>
      </div>


    </div>
  );
};

export default Home;
