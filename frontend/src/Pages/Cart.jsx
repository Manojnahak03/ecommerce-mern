import React, { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // Load Cart
  const loadCart = async () => {
    if (!userId) return;

    try {
      const response = await api.get(`/cart/${userId}`);
      setCart(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, [userId]);

  // Checkout Logic
  const handleCheckout = async () => {
    try {
      const res = await api.get(`/address/${userId}`);

      if (res.data && res.data.length > 0) {
        // Address already exists
        navigate("/checkout-summary");
      } else {
        // No address found
        navigate("/checkout");
      }
    } catch (error) {
      console.error("Address check error:", error);
      navigate("/checkout");
    }
  };

  // Remove Item
  const removeItem = async (productId) => {
    try {
      await api.delete("/cart/remove", {
        data: {
          userId,
          productId,
        },
      });

      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Update Quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity < 1) {
        await removeItem(productId);
        return;
      }

      await api.put("/cart/update", {
        userId,
        productId,
        quantity,
      });

      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (!cart) {
    return (
      <div className="flex justify-center items-center h-60 text-xl">
        Loading...
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="flex justify-center items-center h-60 text-xl">
        Your Cart is Empty 🛒
      </div>
    );
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.productId._id}
            className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.productId.image}
                alt={item.productId.title}
                className="w-24 h-24 object-cover rounded"
              />

              <div>
                <h3 className="text-lg font-semibold">
                  {item.productId.title}
                </h3>

                <p className="text-gray-600">
                  ₹{item.productId.price}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateQuantity(
                    item.productId._id,
                    item.quantity - 1
                  )
                }
                className="bg-gray-200 px-3 py-1 rounded"
              >
                -
              </button>

              <span className="font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  updateQuantity(
                    item.productId._id,
                    item.quantity + 1
                  )
                }
                className="bg-gray-200 px-3 py-1 rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.productId._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white shadow-md rounded-lg p-5">
        <h3 className="text-2xl font-bold">
          Total: ₹{total.toFixed(2)}
        </h3>

        <button
          onClick={handleCheckout}
          className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;