import { Link } from "react-router";

const PlansSection = () => {
  const freeFeatures = [
    "Post 1 article only",
    "View articles",
    "Comment on articles",
    "Basic support",
  ];

  const premiumFeatures = [
    "Post unlimited articles",
    "Access premium articles",
    "Priority comment visibility",
    "Advanced analytics",
    "Premium support",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-10">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-gray-400 hover:shadow-xl transition">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Free Plan</h3>
          <ul className="mb-6 space-y-2 text-gray-600">
            {freeFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-center">
                ✅ <span className="ml-2">{feature}</span>
              </li>
            ))}
          </ul>
          <Link to="/subscription">
            <button className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition">
              Upgrade Now
            </button>
          </Link>
        </div>

        {/* Premium Plan */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-yellow-500 hover:shadow-xl transition">
          <h3 className="text-2xl font-bold mb-4 text-yellow-600">Premium Plan</h3>
          <ul className="mb-6 space-y-2 text-gray-600">
            {premiumFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-center">
                ⭐ <span className="ml-2">{feature}</span>
              </li>
            ))}
          </ul>
          <Link to="/subscription">
            <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition">
              Subscribe Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlansSection;
