

import axios from "axios";
import { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth/useAuth";

const EntertainmentSection = () => {
  const [articles, setArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch articles and current user
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all articles
        const articlesRes = await axios.get(
          "https://newspaper-fullstack-project-server.vercel.app/articles"
        );
        const entertainmentArticles = articlesRes.data.filter(
          (article) =>
            article.status === "approved" &&
            article.tags.includes("entertainment")
        );
        setArticles(entertainmentArticles);

        // Fetch current user from backend
        if (user?.email) {
          const userRes = await axios.get(
            `https://newspaper-fullstack-project-server.vercel.app/users?email=${user.email}`
          );
          setCurrentUser(userRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        <style jsx>{`
          .loader {
            border-top-color: #6366f1;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-serif">
          Entertainment Articles
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enjoy the latest approved entertainment content
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const isPremium = article.isPremium;
          const isPremiumUser = currentUser?.role === "premium user";
          const hasPremiumToken = !!currentUser?.premiumTaken;
          const canView =
            !isPremium || (isPremium && isPremiumUser && hasPremiumToken);

          return (
            <div
              key={article._id}
              className={`relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${
                isPremium ? "border-l-4 border-yellow-400" : ""
              }`}
            >
              {isPremium && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <FiStar size={12} />
                  <span>Premium</span>
                </div>
              )}

              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />

              <div className="p-5 bg-white flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2">
                  {article.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{article.publisher}</span>
                  <span>
                    {new Date(
                      article.postedDate || article.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.description}
                </p>

                <button
                  onClick={() => {
                    if (!canView) return; // Do nothing if user cannot view
                    navigate(`/articles/${article._id}`);
                  }}
                  disabled={!canView} // disable button when cannot view
                  className={`w-full py-2 rounded-lg font-medium transition-all ${
                    canView
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {canView ? "Read Article" : "Upgrade to View"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-gray-600">
            No articles found
          </h3>
          <p className="text-gray-500 mt-2">Try again later</p>
        </div>
      )}
    </div>
  );
};

export default EntertainmentSection;
