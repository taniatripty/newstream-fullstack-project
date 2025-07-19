import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const SubscriptionPromptModal = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = () => {
    setShowModal(false);
    navigate("/subscription");
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Enjoying the content?
        </h2>
        <p className="text-gray-600 mb-6">
          Subscribe now to post unlimited articles and access premium features!
        </p>
        <button
          onClick={handleSubscribe}
          className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition"
        >
          Go to Subscription
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPromptModal;
