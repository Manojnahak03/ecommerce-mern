import { useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-5xl">✅</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-3">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Order ID Card */}
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 mb-6">
          <p className="text-gray-500 text-sm">
            Order ID
          </p>

          <p className="font-mono font-bold text-lg text-gray-800 break-all">
            {id}
          </p>
        </div>

        {/* Status Badge */}
        <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold mb-6">
          ✔ Confirmed
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={goHome}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold transition"
          >
            Print Order
          </button>
        </div>
      </div>
    </div>
  );
}