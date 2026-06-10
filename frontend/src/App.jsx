import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Navbar from "./Components/Navbar.jsx";
import Cart from "./Pages/Cart.jsx";
import Checkout from "./Pages/Checkout.jsx";
import CheckoutSummary from "./Pages/CheckoutSummary.jsx";
import OrderSuccess from "./Pages/OrderSuccess.jsx";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/checkout-summary", element: <CheckoutSummary /> },
      { path: "/order-success/:id", element: <OrderSuccess /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}