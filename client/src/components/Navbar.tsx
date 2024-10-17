import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth.ts";
import AuthService from "../utils/auth.ts";

const Navbar: React.FC = () => {
  const isLoggedIn = Auth.loggedIn();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">MelodyHub</Link>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <>
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md"
                onClick={() => AuthService.logout()}
              >
                Logout
              </button>
            </>
          )}
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link to="/signup" className="text-gray-300 hover:text-white">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
