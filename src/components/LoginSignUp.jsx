import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../utils/auth";
import { API_BASE_URL } from "../utils/constants";
import foodimg from "../assets/foodimg.jpg";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!data.success) {
          setError(data.message || "Login failed");
          setLoading(false);
          return;
        }
        setAuth(data.token, data.user);
      } else {
        if (!name.trim()) {
          setError("Name is required");
          setLoading(false);
          return;
        }
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), email, password, role }),
        });
        const data = await res.json();
        if (!data.success) {
          setError(data.message || "Registration failed");
          setLoading(false);
          return;
        }
        setError("");
        setSuccess("Account created. Please login with your email and password.");
        setIsLogin(true);
        setPassword("");
        setLoading(false);
        return;
      }
      navigate("/", { replace: true });
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            className="w-20 h-20 rounded-full shadow-lg"
            src={foodimg}
            alt="App logo"
          />
        </div>
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          Foodie Express
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {isLogin ? "Sign in to continue" : "Create an account"}
        </p>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex gap-2 mb-6 rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setError("");
                setSuccess("");
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                isLogin
                  ? "bg-white text-orange-500 shadow"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setError("");
                setSuccess("");
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                !isLogin
                  ? "bg-white text-orange-500 shadow"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white"
                >
                  <option value="User">User</option>
                  <option value="Delivery Partner">Delivery Partner</option>
                </select>
              </div>
            )}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                {success}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-200 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
