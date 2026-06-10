import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (!userId) {
          setCartCount(0);
          return;
        }

        const res = await api.get(`/cart/${userId}`);

        const total = res.data.cart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        setCartCount(total);
      } catch (error) {
        console.error("Error loading cart:", error);
        setCartCount(0);
      }
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          Manoj Store
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          
          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            <span className="text-2xl">🛒</span>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full font-semibold">
                {cartCount}
              </span>
            )}
          </Link>

          {!userId ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition duration-200"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;