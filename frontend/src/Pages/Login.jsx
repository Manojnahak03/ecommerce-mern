import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", form);

      console.log("Login Response:", response.data);

      // Save Token
      localStorage.setItem("token", response.data.token);

      // Save User ID
      localStorage.setItem("userId", response.data.user.id);

      setMsg("Login Successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.log(error);

      setMsg(
        error.response?.data?.message || "Login Failed!"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        {msg && (
          <div className="mb-4 text-center text-blue-600 font-medium">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;