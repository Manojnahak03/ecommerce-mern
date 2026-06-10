import React, { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveAddress = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/address/add", {
        ...form,
        userId,
      });

      console.log(res.data);
      alert("Address Saved Successfully!");

      // Checkout Summary page par redirect
      navigate("/checkout-summary");
    } catch (error) {
      console.error(error);
      alert("Failed to save address");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delivery Address</h1>

      <form onSubmit={saveAddress}>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
            required
          />
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default Checkout;