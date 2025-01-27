"use client"
import React, { useEffect, useState } from "react";
import { waveform } from "ldrs";

const OrderActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [orderSearchInput, setOrderSearchInput] = useState("");
      const [filteredOrders, setFilteredOrders] = useState([]);
      const [search, setsearch] = useState(false)
      const [loading, setloading] = useState(true)
  
      if (typeof window !== "undefined") {
        waveform.register();
      }
  useEffect(() => {
    const fetchOrderActivities = async () => {
      try {
        const response = await fetch("/api/activities");
        if (response.ok) {
          const data = await response.json();
          setActivities(data.activities);
          
        } else {
            console.error("Failed to fetch order activities");
        }
    } catch (error) {
        console.error("Error fetching order activities:", error);
    }
};

setTimeout(() => {
    fetchOrderActivities();
}, 100);
setTimeout(() => {
    
    setloading(false)
}, 2500);
}, []);

const handleOrderSearch = (e) => {
    setsearch(true)
    setOrderSearchInput(e.target.value);
    const filtered = activities.filter((o) =>
        o._id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOrders(filtered);
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
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold text-gold text-center mb-6">
        Order Activity
      </h1>
      {activities.length === 0 ? (
        <p className="text-center text-white/80">No recent activity found.</p>
      ) : (
        <div className="overflow-x-auto">
             <input
                type="text"
                value={orderSearchInput}
                onChange={handleOrderSearch}
                placeholder="Search by Order ID"
                className="w-full mb-4 p-2 text-black rounded-lg"
            />
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gold text-black">
                <th className="p-4 border border-white/10">Order ID</th>
                <th className="p-4 border border-white/10">User ID</th>
                <th className="p-4 border border-white/10">Action</th>
                <th className="p-4 border border-white/10">Timestamp</th>
              </tr>
            </thead>
            <tbody>
                { search ?(
                    <>
              {filteredOrders.map((activity, index) => {
              const createdDate = new Date(activity.createdAt);
              const updatedDate = new Date(activity.updatedAt);
              const isUpdated = updatedDate > createdDate;
              const displayStatus = isUpdated ? activity.orderStatus : "New Order";
              return (
                
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white/10" : "bg-white/5"
                  }`}
                >
                  <td className="p-4 border border-white/10">
                    {activity._id}
                  </td>
                  <td className="p-4 border border-white/10">
                    {activity.user}
                  </td>
                  <td className="p-4 border border-white/10">
                    {displayStatus}
                  </td>
                  <td className="p-4 border border-white/10">
                    {new Date(activity.updatedAt).toLocaleString()}
                  </td>
                </tr>
              );
})}
</>
                ):(
                    <>
                    
              {activities.map((activity, index) => {
              const createdDate = new Date(activity.createdAt);
              const updatedDate = new Date(activity.updatedAt);
              const isUpdated = updatedDate > createdDate;
              const displayStatus = isUpdated ? activity.orderStatus : "New Order";
              return (
                
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white/10" : "bg-white/5"
                  }`}
                >
                  <td className="p-4 border border-white/10">
                    {activity._id}
                  </td>
                  <td className="p-4 border border-white/10">
                    {activity.user}
                  </td>
                  <td className="p-4 border border-white/10">
                    {displayStatus}
                  </td>
                  <td className="p-4 border border-white/10">
                    {new Date(activity.updatedAt).toLocaleString()}
                  </td>
                </tr>
              );
})}
</>
                )
}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderActivityPage;


