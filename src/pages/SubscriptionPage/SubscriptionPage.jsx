

import { useState } from "react";
import { useNavigate } from "react-router"

import newspaper from '../../assets/colorfullnewspaper.jpg'

const SubscriptionPage = () => {
  const navigate = useNavigate();

  const [duration, setDuration] = useState("1");
  const [price, setPrice] = useState(0.5);
  const [showForm, setShowForm] = useState(false); // toggle for form

  const handleDurationChange = (e) => {
    const val = e.target.value;
    setDuration(val);
    if (val === "1") setPrice(1);
    else if (val === "5") setPrice(5);
    else if (val === "10") setPrice(8);
  };

  const handleSubscribe = () => {
    navigate("/payment", {
      state: {
        duration: parseInt(duration),
        price,
      },
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          `url(${newspaper})`, // Use your asset image here
      }}
    >
      <div className="absolute inset-0 bg-opacity-60 z-0" />

      <div className="relative z-10 flex items-center justify-center px-4 py-16 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl w-full text-white">
          {/* Left Banner Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ✨ Go Premium. Read Without Limits!
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              Unlock exclusive articles, remove distractions, and gain early access to premium content.
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4334/4334817.png"
              alt="Premium Icon"
              className="w-32 mx-auto md:mx-0 mb-6"
            />

            {/* Get Subscription Button */}
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="py-3 px-6 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
              >
                Get Subscription
              </button>
            )}
          </div>

          {/* Subscription Form (conditionally rendered) */}
          {showForm && (
            <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-lg w-full">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Choose Your Subscription Plan
              </h2>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Select Duration</label>
                <select
                  value={duration}
                  onChange={handleDurationChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="1">1 Minute (For Demo/Assignment)</option>
                  <option value="5">5 Days</option>
                  <option value="10">10 Days</option>
                </select>
              </div>

              <div className="mb-6">
                <p className="text-lg">
                  <strong>Price:</strong> ${price.toFixed(2)}
                </p>
              </div>

              <button
                onClick={handleSubscribe}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
              >
                Subscribe Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
