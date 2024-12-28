// src/components/ProductCard.js
import React from "react";

const ProductCard = ({ image, title, price }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
      <img src={image} alt={title} className="w-full h-64 object-cover rounded-t-lg"/>
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-lg text-blue-500 mt-2">${price}</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-400">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
