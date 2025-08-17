import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const plans = [
  {
    name: "Basic",
    price: "$5",
    duration: "per month",
    features: ["Post 5 article/month", "Access basic articles"],
  },
  {
    name: "Standard",
    price: "$15",
    duration: "per month",
    features: [
      "Post up to 15 articles/month",
      "Access all articles",
      "Priority support",
    ],
    recommended: true,
  },
  {
    name: "Premium",
    price: "$30",
    duration: "per month",
    features: [
      "Unlimited article posts",
      "Access premium articles",
      "Priority support",
      "Feature early access",
    ],
  },
];

const SubscriptionPlanPage = () => {
  const navigate = useNavigate();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubscribe = (planName) => {
    if (!acceptedTerms) {
      Swal.fire({
        icon: "warning",
        title: "Terms & Conditions",
        text: "You must accept the Terms & Conditions before subscribing!",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: `Subscribed to ${planName}!`,
      text: "Thank you for choosing a subscription plan.",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      // Navigate to payment or dashboard after success
      // navigate("/payment");
    });
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
          Choose Your Plan
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the subscription that fits your needs and unlock premium features.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-xl p-6 flex flex-col justify-between shadow-md hover:shadow-lg transition relative ${
              plan.recommended ? "border-indigo-500 bg-indigo-50" : "bg-white"
            }`}
          >
            {plan.recommended && (
              <div className="absolute top-3 right-3 bg-indigo-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                Recommended
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-gray-700 text-lg mb-4">
                {plan.price} <span className="text-gray-500 text-sm">{plan.duration}</span>
              </p>

              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-600 flex items-center">
                    <span className="mr-2 text-green-500 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-center text-gray-700 mb-4">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mr-2"
              />
              I accept the{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline ml-1"
              >
                Terms & Conditions
              </a>
            </label>

            <button
              onClick={() => handleSubscribe(plan.name)}
              className={`w-full py-2 rounded font-semibold transition ${
                plan.recommended
                  ? "bg-indigo-500 text-white hover:bg-indigo-600"
                  : "bg-gray-800 text-white hover:bg-gray-900"
              }`}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlanPage;
