import React, { useState, useEffect } from "react";
import { getToken } from "../utils/auth";
import { API_BASE_URL } from "../utils/constants";
import StatusModal from "./StatusModal";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const OrderCard = ({ order, onDelivered, onAssign, isAssigned }) => (
  <li className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
    <div className="flex justify-between items-start flex-wrap gap-2">
      <div>
        <p className="font-semibold">
          Order #{order._id.slice(-6)} • {order.restaurantName || "Restaurant"}
        </p>
        <p className="text-gray-600 text-sm">
          ₹{order.totalAmount} • {order.status}
          {order.createdAt && (
            <span className="ml-2 text-gray-500">• {formatDate(order.createdAt)}</span>
          )}
        </p>
        {order.userId && (
          <p className="text-sm text-gray-500">
            Customer: {order.userId.name} {order.userId.email && `(${order.userId.email})`}
          </p>
        )}
        <ul className="mt-2 text-sm text-gray-700">
          {order.items?.map((item, i) => (
            <li key={i}>
              {item.name} × {item.quantity} — ₹{item.price * item.quantity}
            </li>
          ))}
        </ul>
      </div>
      {isAssigned && order.status !== "Delivered" && (
        <button
          type="button"
          onClick={() => onDelivered(order._id)}
          className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600"
        >
          Delivered
        </button>
      )}
      {!isAssigned && onAssign && (
        <button
          type="button"
          onClick={() => onAssign(order._id)}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600"
        >
          Accept
        </button>
      )}
    </div>
  </li>
);

const DeliveryPartnerOrders = () => {
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [availableOrders, setAvailableOrders] = useState([]);
  const activeAssigned = assignedOrders.filter((o) => o.status !== "Delivered");
  const pastDelivered = assignedOrders.filter((o) => o.status === "Delivered");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, type: "success", title: "", message: "" });

  const fetchOrders = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const [assignedRes, availableRes] = await Promise.all([
        fetch(`${API_BASE_URL}/orders/delivery/assigned`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_BASE_URL}/orders/delivery/available`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const assignedData = await assignedRes.json();
      const availableData = await availableRes.json();
      if (assignedData.success) setAssignedOrders(assignedData.orders || []);
      if (availableData.success) setAvailableOrders(availableData.orders || []);
      if (!assignedData.success) setModal({ open: true, type: "error", title: "Error", message: assignedData.message || "Failed to load orders" });
    } catch (err) {
      setModal({ open: true, type: "error", title: "Error", message: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleMarkDelivered = async (orderId) => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Delivered" }),
      });
      const data = await res.json();
      if (data.success) {
        setAssignedOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: "Delivered" } : o))
        );
        setModal({ open: true, type: "success", title: "Delivered", message: "Order marked as delivered." });
      } else {
        setModal({ open: true, type: "error", title: "Error", message: data.message || "Failed to update" });
      }
    } catch (err) {
      setModal({ open: true, type: "error", title: "Error", message: "Network error" });
    }
  };

  const handleAcceptOrder = async (orderId) => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${orderId}/assign`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAvailableOrders((prev) => prev.filter((o) => o._id !== orderId));
        setAssignedOrders((prev) => [data.order, ...prev]);
        setModal({ open: true, type: "success", title: "Accepted", message: "Order assigned to you." });
      } else {
        setModal({ open: true, type: "error", title: "Error", message: data.message || "Failed to accept" });
      }
    } catch (err) {
      setModal({ open: true, type: "error", title: "Error", message: "Network error" });
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-20 p-4 text-center">
        <p className="text-gray-600">Loading assigned orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-6">Delivery Partner</h1>

      {availableOrders.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Available to accept</h2>
          <ul className="space-y-4">
            {availableOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onAssign={handleAcceptOrder}
                isAssigned={false}
              />
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">My assigned orders</h2>
        {activeAssigned.length === 0 ? (
          <p className="text-gray-600">No orders assigned to you.</p>
        ) : (
          <ul className="space-y-4">
            {activeAssigned.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onDelivered={handleMarkDelivered}
                isAssigned
              />
            ))}
          </ul>
        )}
      </section>

      {pastDelivered.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Past delivered</h2>
          <ul className="space-y-4">
            {pastDelivered.map((order) => (
              <OrderCard key={order._id} order={order} isAssigned={false} />
            ))}
          </ul>
        </section>
      )}

      <StatusModal
        isOpen={modal.open}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};

export default DeliveryPartnerOrders;
