import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product List</h2>

        <Link
          to="/admin/products/add"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </Link>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;