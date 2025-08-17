

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";
import { FiSearch, FiX, FiFilter, FiStar } from "react-icons/fi";

const AllArticle = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchTitle, setSearchTitle] = useState("");
  const [publisherFilter, setPublisherFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

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

  const clearFilters = () => {
    setSearchTitle("");
    setPublisherFilter("");
    setTagsFilter([]);
  };

  if (aLoading || pLoading || tLoading || userLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-serif">Explore Articles</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover insightful content from our collection of premium and free articles
        </p>
      </div>

      {/* Enhanced Search Section */}
      <div className="mb-8 bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search  by title..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            {searchTitle && (
              <button
                onClick={() => setSearchTitle("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <FiFilter />
            <span>Filters</span>
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
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
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <select
                  multiple
                  className="w-full p-2 border border-gray-300 rounded-md h-auto min-h-[42px] focus:ring-indigo-500 focus:border-indigo-500"
                  value={tagsFilter}
                  onChange={(e) =>
                    setTagsFilter(Array.from(e.target.selectedOptions).map((o) => o.value))
                  }
                >
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {(publisherFilter || tagsFilter.length > 0) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <FiX size={14} />
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{article.publisher}</span>
                  <span>{new Date(article.postedDate || article.created_at).toLocaleDateString()}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.description}</p>
                
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
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
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
          <h3 className="text-xl font-medium text-gray-600">No articles found</h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filters
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllArticle;
