"use client"
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  subsets: ['latin'], 
  weight: '400', 
  style: 'normal', 
});

const Footer = () => {
//   const { data: session, status } = useSession();

  const [user, setUser] = useState()
  const [email, setemail] = useState("")
  const [confirm, setconfirm] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [error1, setError1] = useState()
  const [error2, setError2] = useState(false)
  const [error3, setError3] = useState(false)


//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       setLoading(true);
//       setUser(null);
//       setError(null);

//       if (status === "authenticated") {
//         setUser(session.user);
//         setLoading(false);
//       }

//       if (status === "unauthenticated") {
//         const token = document.cookie
//           .split("; ")
//           .find((row) => row.startsWith("token="))
//           ?.split("=")[1];

//         if (token) {
//           try {
//             const res = await fetch("/api/auth/me", {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             });

//             if (!res.ok) {
//               throw new Error("Failed to fetch user data");
//             }

//             const data = await res.json();
//             setUser(data.user);
//           } catch (err) {
//             console.error(err);
//             setError("Error fetching user data.");
//           }
//         } else {
//           setError("Please log in to view this page.");
//         }
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [status, session]);

  



  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center md:text-left">
          <h2 style={{ fontFamily: greatVibes.style.fontFamily }} className="text-gold text-4xl">Luxurious</h2>
          <p>Your destination for luxury and elegance.</p>
        </div>

        <div className="text-center md:text-right">
          <h3 className="text-xl font-bold text-gray-100 mb-4">Customer Support</h3>
          <p>Email: <a href="mailto:support@luxstore.com" className="hover:text-gold">muzammilmehdi52@gmail.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:text-gold">+92 348 8062645</a></p>
          <p>Developed by Muzammil Mehdi</p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 mt-10">
        <div className="flex flex-col md:flex-row justify-center items-center border-t border-gray-700 pt-6">
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-gold transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gold transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gold transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gold transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
