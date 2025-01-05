import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Updated import
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ChangePassword from './components/ChangePassword';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4 grid place-items-center">
          <Routes>
            {/* Route for Home/Products */}
            <Route 
              path="/products" 
              element={
                <PrivateRoute>
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
                </PrivateRoute>
              }
            />

            {/* Route for Login */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Route for Signup */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={
              <PrivateRoute>
                <h1>cart page</h1>
              </PrivateRoute>
            }
            />
            <Route path="/change-password" element={
              <PrivateRoute>
                <ChangePassword/>
              </PrivateRoute>}/>
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
