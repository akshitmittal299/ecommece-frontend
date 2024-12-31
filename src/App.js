import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Updated import
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Routes>
            {/* Route for Home/Products */}
            <Route 
              path="/" 
              element={
                <>
                  <ProductCard 
                    image="https://via.placeholder.com/400x300" 
                    title="Product 1" 
                    price="29.99" 
                  />
                  <ProductCard 
                    image="https://via.placeholder.com/400x300" 
                    title="Product 2" 
                    price="39.99" 
                  />
                  <ProductCard 
                    image="https://via.placeholder.com/400x300" 
                    title="Product 3" 
                    price="49.99" 
                  />
                  <ProductCard 
                    image="https://via.placeholder.com/400x300" 
                    title="Product 4" 
                    price="59.99" 
                  />
                </>
              }
            />

            {/* Route for Login */}
            <Route path="/login" element={<Login />} />

            {/* Route for Signup */}
            <Route path="/signup" element={<Signup />} />

            {/* Protected Route */}
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <h1>Profile Page (Protected)</h1>
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
