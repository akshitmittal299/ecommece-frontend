import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user, authTokens, setUser, logout } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user details using "Get Me" API
  useEffect(() => {
    let retryTimeout;

    const fetchUserDetails = async () => {
      if (!authTokens) {
        console.warn("No token available, retrying in 1 second...");
        retryTimeout = setTimeout(fetchUserDetails, 1000); // Retry after 1 second
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/v1/get/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Update user in context
        } else {
          console.error("Failed to fetch user details, status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();

    return () => clearTimeout(retryTimeout); // Cleanup on unmount
  }, [authTokens, setUser]);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".dropdown")) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          E-commerce
        </div>

        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link to="/" className="hover:text-blue-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-300">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-blue-300">
                Cart
              </Link>
            </li>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative dropdown">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      src={user.profilePicture || "https://via.placeholder.com/40"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <span className="font-medium">{user.first_name || "User"}</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800 z-50">
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                        Profile
                      </Link>
                      <Link
                        to="/change-password"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Change Password
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
