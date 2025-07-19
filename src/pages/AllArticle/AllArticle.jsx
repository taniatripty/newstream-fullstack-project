
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";

const AllArticle = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchTitle, setSearchTitle] = useState("");
  const [publisherFilter, setPublisherFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState([]);

  // Get current logged-in user data (includes premiumTaken)
  const { data: currentUser = {}, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch publishers & tags
  const { data: publishers = [], isLoading: pLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: () => axiosSecure.get("/publishers").then((res) => res.data),
  });

  const { data: tags = [], isLoading: tLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: () => axiosSecure.get("/tags").then((res) => res.data),
  });

  // Fetch filtered articles
  const {
    data: articles = [],
    refetch,
    isLoading: aLoading,
  } = useQuery({
    queryKey: ["articles", searchTitle, publisherFilter, tagsFilter],
    queryFn: () => {
      const params = {};
      if (searchTitle) params.title = searchTitle;
      if (publisherFilter) params.publisher = publisherFilter;
      if (tagsFilter.length) params.tags = tagsFilter.join(",");
      return axiosSecure.get("/article/approve", { params }).then((res) => res.data);
    },
  });

  useEffect(() => {
    refetch();
  }, [searchTitle, publisherFilter, tagsFilter]);

  if (aLoading || pLoading || tLoading || userLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">All Articles</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="flex-grow p-2 border rounded"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={publisherFilter}
          onChange={(e) => setPublisherFilter(e.target.value)}
        >
          <option value="">All Publishers</option>
          {publishers.map((pub) => (
            <option key={pub._id} value={pub.name}>
              {pub.name}
            </option>
          ))}
        </select>
        <select
          multiple
          className="p-2 border rounded flex-grow"
          value={tagsFilter}
          onChange={(e) =>
            setTagsFilter(Array.from(e.target.selectedOptions).map((o) => o.value))
          }
        >
          {tags.map((tag) => (
            <option key={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const isPremium = article.isPremium;
          const isPremiumUser = currentUser?.role === "premium user";
          const hasPremiumToken = !!currentUser?.premiumTaken;

          // Logic for Button Disable/Enable
          const canView =
            !isPremium || (isPremium && isPremiumUser && hasPremiumToken);

          const buttonText = canView ? "Details" : "Subscribe to View";

          return (
            <div
              key={article._id}
              className={`rounded-lg overflow-hidden shadow-md transition hover:shadow-lg ${
                isPremium ? "border-4 border-yellow-400 bg-yellow-50" : "bg-white"
              }`}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-500">Publisher: {article.publisher}</p>
                <p className="text-sm text-gray-500">Tags: {article.tags.join(", ")}</p>
                <p className="text-sm text-gray-500">
                  Posted: {new Date(article.postedDate || article.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm mt-2">{article.description.slice(0, 100)}...</p>
                <button
                  onClick={() => {
                    if (!canView) return;
                    navigate(`/articles/${article._id}`);
                  }}
                  disabled={!canView}
                  aria-disabled={!canView}
                  title={!canView ? "Subscribe to premium to view this article" : undefined}
                  className={`mt-4 w-full py-2 font-medium text-white rounded transition-all duration-200 ${
                    canView
                      ? "bg-lime-500 hover:bg-lime-600 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed opacity-60"
                  }`}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllArticle;
