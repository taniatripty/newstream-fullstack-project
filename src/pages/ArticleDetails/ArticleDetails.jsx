import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";

const ArticleDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isSubscribed } = useAuth();
  const navigate = useNavigate();

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/article/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  if (isError || !article)
    return (
      <div className="text-center py-10">
        <p className="text-red-600">Article not found or failed to load.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );

  // If premium and not subscribed
  if (article.isPremium && !isSubscribed) {
    Swal.fire({
      icon: "info",
      title: "Premium Article",
      text: "Subscribe to access premium content!",
    });
    navigate("/subscribe");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-6">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-3xl font-bold mt-4">{article.title}</h2>
      <p className="text-sm text-gray-500 mt-1">
        Published by <span className="font-semibold">{article.publisher}</span> on{" "}
        {new Date(article.postedDate || article.created_at).toLocaleDateString()}
      </p>

      <div className="flex items-center gap-3 mt-4">
        <img
          src={article.AuthorPhoto}
          alt={article.Authorname}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{article.Authorname}</p>
          <p className="text-sm text-gray-400">{article.email}</p>
        </div>
      </div>

      <p className="mt-6 text-gray-800 leading-relaxed">{article.description}</p>

      <div className="mt-4">
        <p className="font-medium">Tags:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {article.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
