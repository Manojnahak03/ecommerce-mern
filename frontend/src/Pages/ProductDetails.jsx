import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    try {
      const res = await api.get("/products");

      const productData = res.data.products.find(
        (item) => item._id === id
      );

      setProduct(productData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <img
        src={product.image}
        alt={product.title}
        className="w-full max-w-md rounded-lg"
      />

      <h1 className="text-3xl font-bold mt-4">
        {product.title}
      </h1>

      <p className="mt-3 text-gray-600">
        {product.description}
      </p>

      <p className="text-2xl font-bold text-green-600 mt-4">
        ₹{product.price}
      </p>

      <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;