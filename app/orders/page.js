"use client"
import React, { useState, useEffect } from "react";
import { waveform } from "ldrs";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setloading] = useState(true)
    const [orderSearchInput, setOrderSearchInput] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [search, setsearch] = useState(false)


    if (typeof window !== "undefined") {
        waveform.register();
    }

    // Fetch orders from backend on component mount
    useEffect(() => {
        async function fetchOrders() {
            const response = await fetch("/api/order"); // Replace with your actual API endpoint
            const data = await response.json();
            setOrders(data);
        }

        setTimeout(() => {
            fetchOrders();
            setloading(false)
        }, 2000);
    }, []);

    // Update order status
    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await fetch(`/api/order/updateOrderStatus`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, status }),
            });

            if (response.ok) {
                const data = await response.json();
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, orderStatus: data.order.orderStatus } : order
                    )
                );
            } else {
                console.error("Failed to update order status:", await response.json());
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    // Remove an order
    const removeOrder = async (orderId) => {
        try {
            const response = await fetch(`/api/order/removeOrder`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId }),
            });

            if (response.ok) {
                const data = await response.json();
                setOrders((prevOrders) =>
                    prevOrders.filter((order) => order._id !== orderId)
                );
            } else {
                console.error("Failed to remove order:", await response.json());
            }
        } catch (error) {
            console.error("Error removing order:", error);
        }
    };

    const handleOrderSearch = (e) => {
        setsearch(true)
        setOrderSearchInput(e.target.value);
        const filtered = orders.filter((o) =>
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
            <h1 className="text-3xl font-bold text-gold mb-6 text-center">Orders Management</h1>
            <input
                type="text"
                value={orderSearchInput}
                onChange={handleOrderSearch}
                placeholder="Search by Order ID"
                className="w-full mb-4 p-2 text-black rounded-lg ml-1"
            />
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gold text-sm">
                    <thead className="bg-gold text-black">
                        <tr>
                            <th className="border border-gold p-2">Order ID</th>
                            <th className="border border-gold p-2">User ID</th>
                            <th className="border border-gold p-2">Total</th>
                            <th className="border border-gold p-2">Status</th>
                            <th className="border border-gold p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { search ? (
                            <>
                            
                        {filteredOrders.map((order) => (
                            <tr key={order._id} className="text-center">
                                <td className="border border-gold p-2">{order._id}</td>
                                <td className="border border-gold p-2">{order.user}</td>
                                <td className="border border-gold p-2 text-center">${parseFloat(order.finalamounts).toLocaleString()}</td>
                                <td className={`border border-gold px-4 py-2 font-bold ${order.orderStatus === "Delivered" ? "text-green-500" : order.orderStatus === "Shipped" ? "text-yellow-500" : "text-red-500"}`}>{order.orderStatus}</td>
                                <td className="border border-gold p-2 space-x-2">
                                    <button
                                        onClick={() => updateOrderStatus(order._id, "Shipped")}
                                        className="px-3 py-1 bg-gold text-black rounded hover:bg-white hover:text-black transition"
                                    >
                                        Mark as Shipped
                                    </button>
                                    <button
                                        onClick={() => updateOrderStatus(order._id, "Delivered")}
                                        className="px-3 py-1 bg-gold text-black rounded hover:bg-white hover:text-black transition"
                                    >
                                        Mark as Delivered
                                    </button>
                                    <button
                                        onClick={() => removeOrder(order._id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-800 transition"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </>
                        ) : (
                            <>
                            
                        {orders.map((order) => (
                            <tr key={order._id} className="text-center">
                                <td className="border border-gold p-2">{order._id}</td>
                                <td className="border border-gold p-2">{order.user}</td>
                                <td className="border border-gold p-2 text-center">${parseFloat(order.finalamounts).toLocaleString()}</td>
                                <td className={`border border-gold px-4 py-2 font-bold ${order.orderStatus === "Delivered" ? "text-green-500" : order.orderStatus === "Shipped" ? "text-yellow-500" : "text-red-500"}`}>{order.orderStatus}</td>
                                <td className="border border-gold p-2 space-x-2">
                                    <button
                                        onClick={() => updateOrderStatus(order._id, "Shipped")}
                                        className="px-3 py-1 bg-gold text-black rounded hover:bg-white hover:text-black transition"
                                    >
                                        Mark as Shipped
                                    </button>
                                    <button
                                        onClick={() => updateOrderStatus(order._id, "Delivered")}
                                        className="px-3 py-1 bg-gold text-black rounded hover:bg-white hover:text-black transition"
                                    >
                                        Mark as Delivered
                                    </button>
                                    <button
                                        onClick={() => removeOrder(order._id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-800 transition"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </>
                    )
                    }
                    </tbody>
                </table>
            </div>

            {orders.length === 0 && (
                <p className="text-center text-gold mt-6">No orders found.</p>
            )}
        </div>
    );
}
