import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";

const PremiumArticle = () => {
  const axiosSecure = useAxiosSecure();
  const { isSubscribed } = useAuth();
  const navigate = useNavigate();

  // Fetch premium articles only
  const { data: articles = [], isLoading, isError } = useQuery({
    queryKey: ["premium-articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles", {
        params: { isPremium: true },
      });
      return res.data.filter((article) => article.isPremium);
    },
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading premium articles...</p>;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to load premium articles.
      </p>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-600">
        Premium Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const canView = isSubscribed;

          return (
            <div
              key={article._id}
              className="relative rounded-lg overflow-hidden shadow-lg border-4 border-yellow-400 bg-yellow-50 transition hover:shadow-2xl"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-3">
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-600">Publisher: {article.publisher}</p>
                <p className="text-sm text-gray-700">
                  {article.description.slice(0, 150)}...
                </p>
                <button
                  disabled={!canView}
                  onClick={() => {
                    if (canView) navigate(`/articles/${article._id}`);
                  }}
                  className={`mt-3 w-full py-2 font-medium text-white rounded ${
                    canView
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {canView ? "Details" : "Subscribe to View"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PremiumArticle;
