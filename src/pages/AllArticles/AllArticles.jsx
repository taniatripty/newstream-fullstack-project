

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaCheck, FaStar, FaTimes, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";

const ITEMS_PER_PAGE = 10;

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [declineReason, setDeclineReason] = useState("");
  const [declineModalOpen, setDeclineModalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  // ✅ Fetch with pagination
  const { data, isLoading } = useQuery({
    queryKey: ["all-articles", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/article?page=${page}&limit=${ITEMS_PER_PAGE}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const articles = data?.data || [];
  const totalArticles = data?.total || 0;
  const totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE);

  // ✅ Approve article
  const approveMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.patch(`/articles/approve/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["all-articles"]),
  });

  // ✅ Decline article
  const declineMutation = useMutation({
    mutationFn: async ({ id, reason }) =>
      await axiosSecure.patch(`/articles/decline/${id}`, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-articles"]);
      setDeclineModalOpen(false);
      setDeclineReason("");
      Swal.fire("Declined!", "The article was declined.", "info");
    },
  });

  // ✅ Make article premium
  const premiumMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.patch(`/articles/premium/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-articles"]);
      Swal.fire("Premium!", "The article is now premium.", "success");
    },
  });

  // ✅ Delete article
  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/articles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-articles"]);
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This article will be published!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
        Swal.fire("Approved!", "The article is now published.", "success");
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
        Swal.fire("Deleted!", "The article has been deleted.", "success");
      }
    });
  };

  const openDeclineModal = (id) => {
    setSelectedArticleId(id);
    setDeclineModalOpen(true);
  };

  const handleDeclineSubmit = () => {
    if (!declineReason) {
      return Swal.fire("Error", "Please enter a decline reason", "warning");
    }
    declineMutation.mutate({ id: selectedArticleId, reason: declineReason });
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">All Articles</h2>
      <table className="min-w-full border bg-white text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Publisher</th>
            <th className="px-4 py-2">Posted</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, idx) => (
            <tr key={article._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{(page - 1) * ITEMS_PER_PAGE + idx + 1}</td>
              <td className="px-4 py-2">{article.title}</td>
              <td className="px-4 py-2 flex items-center gap-2">
                <img
                  src={article.AuthorPhoto}
                  alt="author"
                  className="w-8 h-8 rounded-full"
                />
                {article.Authorname}
              </td>
              <td className="px-4 py-2">{article.email}</td>
              <td className="px-4 py-2">{article.publisher}</td>
              <td className="px-4 py-2">
                {new Date(article.postedDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 capitalize">{article.status}</td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  {article.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(article._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => openDeclineModal(article._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    <FaTrash />
                  </button>
                  {!article.isPremium && article.status === "approved" && (
                    <button
                      onClick={() => premiumMutation.mutate(article._id)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded"
                    >
                      <FaStar />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Pagination Controls */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          className="btn btn-sm"
          disabled={page === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`btn btn-sm ${page === i + 1 ? "btn-active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
          className="btn btn-sm"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* ✅ Decline Modal */}
      {declineModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded p-6 w-[90%] max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Decline Reason</h3>
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="Write reason here..."
              className="w-full border border-gray-300 p-2 rounded h-24"
            ></textarea>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setDeclineModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeclineSubmit}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllArticles;
