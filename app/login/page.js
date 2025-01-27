// pages/login.js
"use client"
import { useState,useEffect } from 'react';
import Cookies from "js-cookie";
import { waveform } from "ldrs";



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [error1, seterror1] = useState('');
  const [error2, seterror2] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      waveform.register();
    }
  }, []);
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email && !password){
        setError("Fill all the required fields")
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 404) {
        seterror2("User not found")
      setIsLoading(false)

      }
      if (res.status === 401) {
        seterror1("Invalid Credentials")
      setIsLoading(false)

      }

      if (res.status === 200) {
        const { token, user } = data;

        Cookies.set('token', token, { path: '/' });

        window.location.href = "/dashboard";
      } else {
        console.log("Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
    //   setIsLoading(false)
    }

    
  }

  return (
    <div className="h-screen flex items-center justify-center bg-black">
        {isLoading ? (
        <p className='min-h-screen flex justify-center items-center text-black'>{typeof window !== "undefined" && (
          <l-waveform size="55" stroke="3.5" speed="1" color="white"></l-waveform>
        )}</p>
      ) : (
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-bold text-black mb-6">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-xl text-black font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-xl text-black font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gold text-white text-xl font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-gold hover:bg-amber-500 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
      )}
    </div>
  );
}
