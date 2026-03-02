import React, { useState, useEffect } from "react";
import { getToken } from "../utils/auth";
import { API_BASE_URL } from "../utils/constants";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(`${API_BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrders(data.orders || []);
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-20 p-4 text-center">
        <p className="text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You haven&apos;t placed any orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order._id}
              className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <p className="font-semibold">
                    Order #{order._id.slice(-6)} • {order.restaurantName || "Order"}
                  </p>
                  <p className="text-gray-500 text-sm">{formatDate(order.createdAt)}</p>
                  <p className="text-gray-600 text-sm mt-1">
                    ₹{order.totalAmount} • <span className="font-medium">{order.status}</span>
                  </p>
                  <ul className="mt-2 text-sm text-gray-700">
                    {order.items?.map((item, i) => (
                      <li key={i}>
                        {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
