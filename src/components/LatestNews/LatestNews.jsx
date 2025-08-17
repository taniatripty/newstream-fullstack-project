// import { useQuery } from "@tanstack/react-query";

// import { useNavigate } from "react-router";
// import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";

// const LatestNews = () => {
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   // Fetch approved articles (latest first)
//   const { data: articles = [], isLoading } = useQuery({
//     queryKey: ["latest-articles"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/articles/approved");
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return <p className="text-center mt-10 text-lg font-medium">Loading latest news...</p>;
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-4xl font-heading font-bold mb-8 text-center text-heading">
//         Latest News
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {articles.slice(0, 6).map((article) => (
//           <div
//             key={article._id}
//             className="rounded-xl overflow-hidden shadow-md transition transform hover:scale-105 hover:shadow-xl bg-white"
//           >
//             <img
//               src={article.image}
//               alt={article.title}
//               className="w-full h-52 object-cover"
//             />
//             <div className="p-5 space-y-2">
//               <h3 className="text-xl font-semibold text-heading">{article.title}</h3>
//               <p className="text-sm text-secondary">Publisher: {article.publisher}</p>
//               <p className="text-sm text-secondary">
//                 Posted: {new Date(article.postedDate || article.created_at).toLocaleDateString()}
//               </p>
//               <p className="text-sm text-body mt-2">{article.description.slice(0, 100)}...</p>
//               <button
//                 onClick={() => navigate(`/articles/${article._id}`)}
//                 className="mt-4 w-full py-2 font-medium text-white rounded-lg bg-lime-500 hover:bg-lime-600 transition"
//               >
//                 Read More
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LatestNews;

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";
import { FiClock, FiStar } from "react-icons/fi";

const LatestNews = () => {
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

  // Fetch latest approved articles
  const {
    data: articles = [],
    isLoading: aLoading,
  } = useQuery({
    queryKey: ["latest-articles"],
    queryFn: () => {
      return axiosSecure.get("/article/approve", { 
        params: { 
          sort: "postedDate", 
          order: "desc", 
          limit: 6 
        } 
      }).then((res) => res.data);
    },
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
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-serif">
          Latest News
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
          Stay updated with our newest articles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => {
          const isPremium = article.isPremium;
          const isPremiumUser = currentUser?.role === "premium user";
          const hasPremiumToken = !!currentUser?.premiumTaken;
          const canView = !isPremium || (isPremium && isPremiumUser && hasPremiumToken);

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
                  e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />
              
              <div className="p-5 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{article.title}</h3>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FiClock className="mr-1.5 h-4 w-4 flex-shrink-0" />
                  <span>
                    {new Date(article.postedDate || article.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {canView ? article.description : "Subscribe to view this premium content"}
                </p>
                
                <button
                  onClick={() => {
                    if (!canView) {
                      navigate("/subscription");
                      return;
                    }
                    navigate(`/articles/${article._id}`);
                  }}
                  className={`w-full py-2 rounded-lg font-medium transition-all ${
                    canView
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-yellow-500 hover:bg-yellow-600 text-white"
                  }`}
                >
                  {canView ? "Read Article" : "Upgrade to View"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {articles.length === 0 && !aLoading && (
        <div className="text-center py-10">
          <p className="text-gray-500">No articles found</p>
        </div>
      )}
    </section>
  );
};

export default LatestNews;