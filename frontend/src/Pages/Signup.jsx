import React, { useState } from 'react';
import api from '../api/axios.js';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/signup', form);

      setMsg(response.data.message);

      // Form reset after successful signup
      setForm({
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      setMsg(error.response?.data?.message || 'An Error Occurred!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {msg && (
          <div className="mb-4 text-center text-sm text-blue-600 font-medium">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Enter Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Enter Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter Your Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;