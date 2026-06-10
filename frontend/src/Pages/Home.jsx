import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    try {
      const res = await api.get(
        `/products?search=${search}&category=${category}`
      );

      setProducts(res.data.products || []);
    } catch (error) {
      console.log("Internal Server Error", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first.");
        return;
      }

      const res = await api.post("/cart/add", {
        userId,
        productId,
      });

      const total = res.data.cart.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      localStorage.setItem("cartCount", total);

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Product Added To Cart Successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to add product to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Product Store
      </h1>

      {/* Search & Filter */}
      <div className="max-w-5xl mx-auto bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Search Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Products</option>
          <option value="Laptops">Laptops</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Tablets">Tablets</option>
        </select>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <Link to={`/products/${product._id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h2>

                <p className="text-green-600 font-bold text-xl mt-2">
                  ₹{product.price}
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  Category: {product.category}
                </p>

                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </Link>

            <div className="p-4 pt-0">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center text-gray-500 text-xl mt-10">
          No Products Found 😔
        </div>
      )}
    </div>
  );
};

export default Home;