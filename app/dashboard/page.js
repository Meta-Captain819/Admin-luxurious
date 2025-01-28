"use client"
import React from "react";
import { useEffect, useState } from "react";
import { waveform } from "ldrs";

export default function Dashboard() {
  const [order, setorder] = useState([])
  const [user, setuser] = useState([])
  const [Recentorders, setRecentOrders] = useState([])
  const [totalsales, settotalsales] = useState()
  const [loading, setloading] = useState(true)
  const [selectedSection, setSelectedSection] = useState('Dashboard');
  const [orderSearchInput, setOrderSearchInput] = useState("");
  const [userSearchInput, setUserSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setsearch] = useState(false)
  if (typeof window !== "undefined") {
    waveform.register();
  }
  useEffect(() => {

    const fetchorder = async () => {
      try {
        const res = await fetch("/api/order", { method: "get" })
        if (res.ok) {
          const data = await res.json()
          const sortedOrders0 = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setorder(sortedOrders0)
          setFilteredOrders(data)
          //  console.log(data);
          const total = data.reduce((sum, order) => sum + parseFloat(order.finalamounts || 0), 0);
          settotalsales(total.toLocaleString())

          const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setRecentOrders(sortedOrders.slice(0, 3));
        }
      } catch (error) {

      }
    }

    const fetchuser = async () => {
      try {
        const res = await fetch("/api/user", { method: "get" })
        if (res.ok) {
          const data = await res.json()
          setuser(data)
          setFilteredUsers(data)
        }
      } catch (error) {

      }
    }
    fetchorder();
    fetchuser();
  }, [])

  useEffect(() => {
    const fetchData = () => {
      setloading(false);
    };
    const timer = setTimeout(fetchData, 3000);
    return () => clearTimeout(timer);
  }, [])

  


  const handleOrderSearch = (e) => {
    setsearch(true)
    setOrderSearchInput(e.target.value);
    const filtered = order.filter((o) =>
      o._id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const handleUserSearch = (e) => {
    setsearch(true)
    setUserSearchInput(e.target.value);
    const filtered = user.filter((u) =>
      u._id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
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

  if (loading === true) return (
    <p className='min-h-screen flex justify-center items-center text-black'><l-waveform
      size="55"
      stroke="3.5"
      speed="1"
      color="white"
    ></l-waveform></p>
  );



  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <header className="py-4 px-6 bg-gold flex justify-between items-center  sticky top-0">
        <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>

      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 ">
        {/* Sidebar */}
        <aside className=" w-full  lg:w-1/4 xl:w-1/5 bg-black text-gold py-6 px-4 lg:border-r lg:border-b-0 border-b border-gold ">
          <nav className="space-y-4">
            <button onClick={() => { setSelectedSection("Dashboard") }} className={` ${selectedSection === "Dashboard" ? "bg-gold text-black" : "bg-black"} block py-2 px-4 rounded-lg hover:bg-gold hover:text-black   transition`}>
              Dashboard
            </button>
            <button onClick={() => { setSelectedSection("Orders") }} className={`${selectedSection === "Orders" ? "bg-gold text-black" : "bg-black"} block py-2 px-4 rounded-lg hover:bg-gold hover:text-black   transition`}>
              Orders
            </button>

            <button onClick={() => { setSelectedSection("Users") }} className={`${selectedSection === "Users" ? "bg-gold text-black" : "bg-black"} block py-2 px-4 rounded-lg hover:bg-gold hover:text-black   transition`}>
              Users
            </button>
            
          </nav>
        </aside>
        {selectedSection === "Dashboard" && (

          <>

            {/* Dashboard Content */}
            <main className="flex-1 bg-black py-6 px-8">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-black border-2 border-gold rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gold">Total Sales</h3>
                  <p className="text-3xl font-bold">${totalsales}</p>
                </div>
                <div className="p-6 bg-black border-2 border-gold rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gold">Total Orders</h3>
                  <p className="text-3xl font-bold">{order.length}</p>
                </div>
                <div className="p-6 bg-black border-2 border-gold rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gold">Total Products</h3>
                  <p className="text-3xl font-bold">85</p>
                </div>
                <div className="p-6 bg-black border-2 border-gold rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-gold">New Users</h3>
                  <p className="text-3xl font-bold">{user.length}</p>
                </div>
              </div>

              {/* Recent Orders */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto  border-collapse border border-gold text-left">
                    <thead>
                      <tr>
                        <th className="border border-gold px-4 py-2 text-gold">Order ID</th>
                        <th className="border border-gold px-4 py-2 text-gold">Customer ID</th>
                        <th className="border border-gold px-4 py-2 text-gold">Status</th>
                        <th className="border border-gold px-4 py-2 text-gold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Recentorders.length > 0 ?
                        Recentorders.map((order) => (
                          <tr key={order._id}>
                            <td className="border border-gold px-4 py-2">{`${order._id}`}</td>
                            <td className="border border-gold px-4 py-2">{order.user}</td>
                            <td className={`border border-gold px-4 py-2 font-bold ${order.orderStatus === "Delivered" ? "text-green-500" : order.orderStatus === "Shipped" ? "text-yellow-500" : "text-red-500"}`}>{order.orderStatus}</td>
                            <td className="border border-gold px-4 py-2">${parseFloat(order.finalamounts).toLocaleString()}</td>
                          </tr>
                        ))
                        : (
                          <tr>
                            <td
                              colSpan="4"
                              className="border border-gold px-4 py-2 text-center text-gray-200"
                            >
                              No recent orders found.
                            </td>
                          </tr>
                        )}

                    </tbody>
                  </table>
                </div>
              </section>

              {/* Activity Feed */}
              <section>
                <div className="flex flex-col gap-6">

                <a href="/history" className="text-gold text-sm">
                <button className="bg-gold rounded-lg text-black py-3  w-full font-bold">Order History</button>
                
                </a>
                <a href="/orders" className="text-gold text-sm">
                <button className="bg-gold rounded-lg text-black py-3  w-full font-bold">Manage Orders</button>
                
                </a>
                <button onClick={handleSignOut} className="bg-gold rounded-lg text-black py-3  w-full font-bold">Log out</button>
                </div>
                
              </section>
            </main>
          </>
        )}
        {selectedSection === "Orders" && (
          <>
            <div className="min-h-screen bg-black text-white py-8 px-0 md:px-4 lg:px-8 xl:w-[1100px] lg:w-[800px] md:w-[600px] w-[400px]">
              <h1 className="text-3xl font-bold text-gold text-center mb-10">
                Order History
              </h1>

              {order.length === 0 ? (
                <p className="text-center text-gray-400">You have no order history.</p>
              ) : (


                <div className="space-y-12">
                  <input
                    type="text"
                    value={orderSearchInput}
                    onChange={handleOrderSearch}
                    placeholder="Search by Order ID"
                    className="w-full p-2 text-black rounded-lg mr-2 ml-2"
                  />
                  {search ? (
                  <>
                
                  {filteredOrders.map((order) => (
                    <div
                    key={order._id}
                      className="bg-white text-black rounded-lg shadow-lg p-6 xl:w-[1100px] lg:w-[800px] md:w-[600px] w-[400px]"
                    >
                      {/* Order Details */}
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                        <div>
                          <p className="text-sm text-gray-500">Order ID:</p>
                          <p className="font-bold">{order._id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Order Date:</p>
                          <p className="font-bold">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Amount:</p>
                          <p className="font-bold text-gold lg:text-center">
                          ${parseFloat(order.finalamounts).toLocaleString()}                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 text-center md:text-left">
                            Status:
                          </p>
                          <span
                            className={`px-3 py-1 rounded-full text-sm lg:text-center ${order.orderStatus === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : order.orderStatus === "Shipped"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                          >
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>

                      {/* Items Section */}
                      <div className="border-t border-gray-300 pt-4 w-full">
                        <h2 className="text-lg font-bold mb-2">Items</h2>
                        <div className="space-y-2">
                          {order.cartItems.map((item, index) => (
                            <div
                              key={index}
                              className="flex flex-wrap md:flex-nowrap justify-between items-center text-sm gap-4 w-full"
                            >
                              <p className="flex-1">{item.name}</p>
                              <p className="flex-1 text-center">
                                {item.quantity} x ${parseFloat(item.price).toLocaleString()}
                              </p>
                              <p className="flex-1 text-right">${parseFloat(item.totalAmount).toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Information */}
                      <div className="border-t border-gray-300 pt-4 w-full">
                        <h2 className="text-lg font-bold mb-2">Shipping Information</h2>
                        <p className="text-sm">
                          <strong>Address:</strong> {order.shippingDetails.address}
                        </p>
                        <p className="text-sm">
                          <strong>City:</strong> {order.shippingDetails.city}
                        </p>
                        <p className="text-sm">
                          <strong>Country:</strong> {order.shippingDetails.country}
                        </p>
                      </div>
                    </div>
                  ))}
                  </>
              ):(
                <>
                
              
                  {order.map((order) => (
                    <div
                      key={order._id}
                      className="bg-white text-black rounded-lg shadow-lg p-6 xl:w-[1050px] lg:w-[800px] md:w-[600px] w-[400px] mx-auto"
                    >
                      {/* Order Details */}
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4 w-full">
                        <div>
                          <p className="text-sm text-gray-500">Order ID:</p>
                          <p className="font-bold">{order._id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Order Date:</p>
                          <p className="font-bold">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Amount:</p>
                          <p className="font-bold text-gold lg:text-center">
                            ${parseFloat(order.finalamounts).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 text-center md:text-left">
                            Status:
                          </p>
                          <span
                            className={`px-3 py-1 rounded-full text-sm lg:text-center ${order.orderStatus === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : order.orderStatus === "Shipped"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                          >
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>

                      {/* Items Section */}
                      <div className="border-t border-gray-300 pt-4 w-full">
                        <h2 className="text-lg font-bold mb-2">Items</h2>
                        <div className="space-y-2">
                          {order.cartItems.map((item, index) => (
                            <div
                              key={index}
                              className="flex flex-wrap md:flex-nowrap justify-between items-center text-sm gap-4 w-full"
                            >
                              <p className="flex-1">{item.name}</p>
                              <p className="flex-1 text-center">
                                {item.quantity} x ${parseFloat(item.price).toLocaleString()}
                              </p>
                              <p className="flex-1 text-right">${parseFloat(item.totalAmount).toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Information */}
                      <div className="border-t border-gray-300 pt-4 w-full">
                        <h2 className="text-lg font-bold mb-2">Shipping Information</h2>
                        <p className="text-sm">
                          <strong>Address:</strong> {order.shippingDetails.address}
                        </p>
                        <p className="text-sm">
                          <strong>City:</strong> {order.shippingDetails.city}
                        </p>
                        <p className="text-sm">
                          <strong>Country:</strong> {order.shippingDetails.country}
                        </p>
                      </div>
                    </div>
                  ))}
                    </>              
              )}

                </div>
              )}
            </div>


          </>
        )}

        {selectedSection === "Users" && (
          <>
            <section className="min-h-screen bg-black text-white py-8 px-4 lg:px-10 xl:w-[1050px] lg:w-[800px] md:w-[600px] w-[400px]">
              <h1 className="text-3xl font-bold text-gold text-center mb-10">
                User Details
              </h1>
              <input
                    type="text"
                    value={userSearchInput}
                    onChange={handleUserSearch}
                    placeholder="Search by User ID"
                    className="w-full p-2 mb-12 text-black rounded-lg mr-2 ml-2"
                  />
              {user.length === 0 ? (
                <p className="text-center text-gray-400">No user data available.</p>
              ) : (
                <div className="space-y-10">
                  {search ?(

                  <>
                  
                    {filteredUsers.map((user) => (
                      <div
                      key={user._id}
                      className="bg-gradient-to-br from-black via-gray-900 to-black rounded-xl shadow-xl p-6 xl:w-[1000px] lg:w-[800px] md:w-[600px] w-[400px] mx-auto"
                    >
                      {/* Header Section */}
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                        <h2 className="text-2xl font-bold text-gold">{user.name}</h2>
                        <p className="text-gray-400 text-sm md:text-base">
                          <strong>Email:</strong> {user.email}
                        </p>
                      </div>

                      {/* User Information */}
                      <div className="border-t border-gray-600 pt-4">
                        <h3 className="text-lg font-semibold text-gold mb-2">
                          Account Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">User ID:</p>
                            <p className="text-lg font-medium text-white">{user._id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Joined On:</p>
                            <p className="text-lg font-medium text-white">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                        </div>
                      </div>


                    </div>
                  ))}
                  </>):(
                  <>                
                  {user.map((user) => (
                    <div
                      key={user._id}
                      className="bg-gradient-to-br from-black via-gray-900 to-black rounded-xl shadow-xl p-6 xl:w-[1000px] lg:w-[800px] md:w-[600px] w-[400px] mx-auto"
                    >
                      {/* Header Section */}
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                        <h2 className="text-2xl font-bold text-gold">{user.name}</h2>
                        <p className="text-gray-400 text-sm md:text-base">
                          <strong>Email:</strong> {user.email}
                        </p>
                      </div>

                      {/* User Information */}
                      <div className="border-t border-gray-600 pt-4">
                        <h3 className="text-lg font-semibold text-gold mb-2">
                          Account Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-400">User ID:</p>
                            <p className="text-lg font-medium text-white">{user._id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Joined On:</p>
                            <p className="text-lg font-medium text-white">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                        </div>
                      </div>


                    </div>
                  ))}
</>
                  
                )}
                </div>
              )}
            </section>

          </>
        )}

      </div>
    </div>
  );
}
