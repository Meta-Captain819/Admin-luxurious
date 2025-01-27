"use client"
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [token, settoken] = useState()

  useEffect( () => {
     const token= document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
     
    if (token) {
      settoken(token)
      
      
    }
    
  }, [])

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close the mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  const handleSignOut = async () => {
   
      try {
        const res = await fetch("/api/logout", { method: "POST" });
        if (res.ok) {
          window.location.href = "/";
        } else {
          console.error("Failed to log out");
        }
      } catch (err) {
        console.error("Error logging out:", err);
      }
    
  };

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-gold">AdminPanel</a>
        {/* <div className="text-2xl font-bold text-gold">AdminPanel</div> */}

        {/* Menu Items */}
        <ul className="hidden md:flex space-x-6">
          <a href="/dashboard" className="hover:text-gold cursor-pointer">Dashboard</a>
          <a href="/orders" className="hover:text-gold cursor-pointer">Orders</a>
          { !token &&
          <a href="/login" className="hover:text-gold cursor-pointer">Login</a>}
          { token &&
          <a onClick={handleSignOut} className="hover:text-gold cursor-pointer">Logout</a>}
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            aria-label="Toggle navigation"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-80 z-20 flex justify-center items-center"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            &times; {/* This is the cross symbol */}
          </button>

          {/* Menu Content */}
          <ul className="space-y-6 text-center text-white py-8">
            <li>

            <a href="/dashboard" className="hover:text-gold cursor-pointer">Dashboard</a>
            </li>
            <li>

          <a href="/orders" className="hover:text-gold cursor-pointer">Orders</a>
            </li>
          { !token &&
          <li>

          <a href="/login" className="hover:text-gold cursor-pointer">Login</a>
          </li>}
          { token &&
          <li>

          <a onClick={handleSignOut} className="hover:text-gold cursor-pointer">Logout</a>
          </li>}
          </ul>
        </div>
      )}
    </nav>
  );
}
