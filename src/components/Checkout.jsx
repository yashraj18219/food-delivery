import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCart, clearCart } from "../utils/cart";
import { getToken } from "../utils/auth";
import { API_BASE_URL } from "../utils/constants";
import StatusModal from "./StatusModal";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = getCart();
  const totalFromCart = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAmount = location.state?.totalAmount ?? totalFromCart;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modal, setModal] = useState({ open: false, type: "success", title: "", message: "" });

  const token = getToken();

  const fetchAddresses = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAddresses(data.addresses || []);
        if (data.addresses?.length && !selectedAddressId) {
          setSelectedAddressId(data.addresses[0]._id);
        }
      }
    } catch (err) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!newAddress.street?.trim() || !newAddress.city?.trim() || !newAddress.state?.trim() || !newAddress.pincode?.trim()) {
      setModal({ open: true, type: "error", title: "Error", message: "Street, city, state and pincode are required." });
      return;
    }
    if (!token) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAddress),
      });
      const data = await res.json();
      if (data.success) {
        setAddresses((prev) => [data.address, ...prev]);
        setSelectedAddressId(data.address._id);
        setNewAddress({ street: "", city: "", state: "", pincode: "", landmark: "" });
        setModal({ open: true, type: "success", title: "Saved", message: "Address saved successfully." });
      } else {
        setModal({ open: true, type: "error", title: "Error", message: data.message || "Failed to save address." });
      }
    } catch (err) {
      setModal({ open: true, type: "error", title: "Error", message: "Network error." });
    }
    setSubmitting(false);
  };

  const handlePlaceOrder = async () => {
    const cartItems = getCart();
    if (cartItems.length === 0) {
      setModal({ open: true, type: "error", title: "Error", message: "Cart is empty." });
      return;
    }
    if (!token) {
      setModal({ open: true, type: "error", title: "Error", message: "Please log in to place order." });
      return;
    }

    const items = cartItems.map(({ id, name, quantity, price, imageId }) => ({
      id,
      name,
      quantity,
      price,
      imageId: imageId || null,
    }));

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items,
          totalAmount,
          restaurantId: null,
          restaurantName: null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();
        setModal({
          open: true,
          type: "success",
          title: "Order Placed",
          message: "Your order has been placed. Cash on delivery.",
        });
        setTimeout(() => navigate("/", { replace: true }), 1500);
      } else {
        setModal({ open: true, type: "error", title: "Error", message: data.message || "Failed to place order." });
      }
    } catch (err) {
      setModal({ open: true, type: "error", title: "Error", message: "Network error." });
    }
    setSubmitting(false);
  };

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId);

  return (
    <div className="max-w-2xl mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <h2 className="text-lg font-semibold mb-2">Payment: Cash on Delivery</h2>
        <p className="text-gray-600 text-sm">Pay when your order is delivered.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
        {loading ? (
          <p className="text-gray-500 text-sm">Loading addresses...</p>
        ) : (
          <>
            {addresses.length > 0 && (
              <div className="space-y-2 mb-4">
                {addresses.map((addr) => (
                  <label key={addr._id} className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddressId === addr._id}
                      onChange={() => setSelectedAddressId(addr._id)}
                      className="mt-1"
                    />
                    <span className="text-gray-700">
                      {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                      {addr.landmark ? ` (${addr.landmark})` : ""}
                    </span>
                  </label>
                ))}
              </div>
            )}

            <div className="border border-gray-200 rounded-xl p-4 bg-white">
              <h3 className="font-medium mb-2">Add new address</h3>
              <form onSubmit={handleSaveAddress} className="grid gap-2">
                <input
                  type="text"
                  placeholder="Street / Building"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress((a) => ({ ...a, street: e.target.value }))}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress((a) => ({ ...a, city: e.target.value }))}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress((a) => ({ ...a, state: e.target.value }))}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress((a) => ({ ...a, pincode: e.target.value }))}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Landmark (optional)"
                  value={newAddress.landmark}
                  onChange={(e) => setNewAddress((a) => ({ ...a, landmark: e.target.value }))}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg px-4 py-2 bg-gray-700 text-white font-medium hover:bg-gray-800 disabled:opacity-50"
                >
                  Save Address
                </button>
              </form>
            </div>
          </>
        )}
      </div>

      <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200">
        <p className="text-lg font-semibold">Total Amount: ₹{totalAmount}</p>
      </div>

      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={submitting || !totalAmount}
        className="w-full py-3 rounded-xl bg-green-500 text-white font-bold text-lg hover:bg-green-600 disabled:opacity-50"
      >
        {submitting ? "Placing order..." : "Place Order (Cash on Delivery)"}
      </button>

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

export default Checkout;
