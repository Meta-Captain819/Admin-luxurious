"use client"
import React from "react";
import { useEffect,useState } from "react";
export default function HomePage() {
const [token, settoken] = useState()
const [order, setorder] = useState([])
  useEffect( () => {
   const token= document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
   const fetchorder= async()=>{
   try {
     const res = await fetch("/api/order",{method:"get"})
     if (res.ok) {
       const data = await res.json()
       setorder(data)
      //  console.log(data);
       
       
      }
    } catch (error) {
      
    }
  }
  if (token) {
    settoken(token)
    console.log(token);
    
    fetchorder()
  }
  
}, [])

  
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-black py-24 flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-opacity-50 bg-black"></div>
        <div className="z-10 space-y-6">
          <h1 className="text-5xl font-extrabold text-gold md:text-6xl">
            Admin Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-xl mx-auto">
            Manage your orders, customers, and products all in one place with ease and efficiency.
          </p>
          <a href={token ? "/dashboard" : "/login"}>

          <button className="bg-gold text-black px-8 py-4 rounded-full mt-3 text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300">
            Get Started
          </button>
          </a>
        </div>
      </section>

      {token &&
        <section className="py-16 bg-black text-white overflow-hidden">
          <div className="container mx-auto text-center ">
            <h2 className="text-4xl font-bold text-gold mb-12">Quick Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ml-2 mr-2">
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200">
                <h3 className="text-3xl font-semibold text-gold">{order.length}</h3>
                <p className="text-xl">Total Orders</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200">
                <h3 className="text-3xl font-semibold text-gold">{order.filter(o => o.orderStatus === "Pending").length}</h3>
                <p className="text-xl">Pending Orders</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200">
                <h3 className="text-3xl font-semibold text-gold">{order.filter(o => o.orderStatus === "Shipped").length}</h3>
                <p className="text-xl">Shipped Orders</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200">
                <h3 className="text-3xl font-semibold text-gold">{order.filter(o => o.orderStatus === "Delivered").length}</h3>
                <p className="text-xl">Delivered Orders</p>
              </div>
            </div>
          </div>
        </section>
      }
      <section className="py-16 bg-gray-800 overflow-hidden">
        <div className="container mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-gold">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-2 mr-2">
            <div className="bg-black p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-gold mb-4">Order Management</h3>
              <p className="text-lg">Efficiently manage and track the status of all your orders in real-time.</p>
            </div>
            <div className="bg-black p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-gold mb-4">Customer Management</h3>
              <p className="text-lg">View and manage your customer information to provide a personalized experience.</p>
            </div>
            <div className="bg-black p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-gold mb-4">Product Catalog</h3>
              <p className="text-lg">Add, edit, or remove products from your inventory effortlessly.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
