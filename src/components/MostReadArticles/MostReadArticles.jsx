
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";
import { FiTrendingUp, FiStar, FiBarChart2 } from "react-icons/fi";
import { FiClock } from 'react-icons/fi';

const MostReadArticles = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get current logged-in user data
  const { data: currentUser = {}, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch most read articles
  const {
    data: articles = [],
    isLoading: aLoading,
  } = useQuery({
    queryKey: ["most-read-articles"],
    queryFn: () => axiosSecure.get("/articles/mostreads").then((res) => res.data),
  });

  if (aLoading || userLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 rounded-full p-3 mb-4">
          <FiTrendingUp className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-serif">
          Most Read Articles
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
          Discover what others are reading the most
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {articles.map((article, index) => {
          const isPremium = article.isPremium;
          const isPremiumUser = currentUser?.role === "premium user";
          const hasPremiumToken = !!currentUser?.premiumTaken;
          const canView = !isPremium || (isPremium && isPremiumUser && hasPremiumToken);

          return (
            <div
              key={article._id}
              className={`relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                isPremium ? "border-l-4 border-yellow-400" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Rank Badge - Smaller on mobile */}
                <div className="flex items-center justify-center md:flex-col bg-gray-50 p-4 md:w-16">
                  <span className="text-xs text-gray-500 md:mb-1 hidden md:block">Rank</span>
                  <span className="text-2xl font-bold text-indigo-600 ml-2 md:ml-0">
                    #{index + 1}
                  </span>
                </div>

                {/* Article Image - Increased width */}
                <div className="md:w-64 lg:w-80 flex-shrink-0 h-48 md:h-auto">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                </div>

                {/* Article Content */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <FiClock className="mr-1.5 h-4 w-4 flex-shrink-0" />
                        <span>
                          {new Date(article.postedDate || article.created_at).toLocaleDateString()}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{article.publisher}</span>
                      </div>
                    </div>
                    {isPremium && (
                      <div className="bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <FiStar size={12} />
                        <span>Premium</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {canView ? article.description : "Subscribe to view this premium content"}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center text-indigo-600">
                      <FiBarChart2 className="mr-1" />
                      <span className="text-sm font-medium">
                        {article.points || 0} reads
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        if (!canView) {
                          navigate("/subscription");
                          return;
                        }
                        navigate(`/articles/${article._id}`);
                      }}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        canView
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }`}
                    >
                      {canView ? "Read Article" : "Upgrade to View"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {articles.length === 0 && !aLoading && (
        <div className="text-center py-10">
          <p className="text-gray-500">No trending articles found</p>
        </div>
      )}
    </section>
  );
};

export default MostReadArticles;