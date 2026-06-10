import React, { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const CheckoutSummary = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [cart, setCart] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cart
        const cartRes = await api.get(`/cart/${userId}`);
          setCart(cartRes.data.cart);

        // Addresses
        const addressRes = await api.get(`/address/${userId}`);
        setAddresses(addressRes.data);

        if (addressRes.data.length > 0) {
          setSelectedAddress(addressRes.data[0]._id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const placeOrder = async () => {
  try {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    const selected = addresses.find(
      (addr) => addr._id === selectedAddress
    );

    const res = await api.post("/order/place", {
      userId,
      address: selected,
    });

    console.log("SUCCESS:", res.data);

    alert("Order Placed Successfully");

    if (res.data?.order?._id) {
      navigate(`/order-success/${res.data.order._id}`);
    } else {
      navigate("/");
    }

  } catch (error) {
    console.log("ERROR:", error);
    console.log("RESPONSE:", error.response);
    console.log("DATA:", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Failed to place order"
    );
  }
};

  if (!cart) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  const total =
    cart.items?.reduce(
      (acc, item) =>
        acc + item.productId.price * item.quantity,
      0
    ) || 0;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
        
        {/* Address Section */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-2xl font-bold mb-4">
            Select Delivery Address
          </h2>

          {addresses.length === 0 ? (
            <div>
              <p className="mb-3 text-gray-600">
                No address found
              </p>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Address
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((addr) => (
                <label
                  key={addr._id}
                  className={`block border rounded-lg p-4 cursor-pointer transition ${
                    selectedAddress === addr._id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={addr._id}
                    checked={selectedAddress === addr._id}
                    onChange={() =>
                      setSelectedAddress(addr._id)
                    }
                    className="mr-2"
                  />

                  <span className="font-bold block">
                    {addr.fullName}
                  </span>

                  <p>{addr.addressLine}</p>

                  <p>
                    {addr.city}, {addr.state} -{" "}
                    {addr.pincode}
                  </p>

                  <p>{addr.phone}</p>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-2xl font-bold mb-4">
            Order Summary
          </h2>

          <div className="space-y-3">
            {cart.items?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    {item.productId?.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹
                  {item.productId?.price *
                    item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;