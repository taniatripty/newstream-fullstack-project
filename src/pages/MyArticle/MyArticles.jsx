import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import { useState } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";

const MyArticles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [declineReason, setDeclineReason] = useState("");
  const [selectedReason, setSelectedReason] = useState(null);

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["my-articles", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-articles"]);
      Swal.fire("Deleted!", "Your article has been deleted.", "success");
    },
  });

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
      }
    });
  };

  const openReasonModal = (reason) => {
    setSelectedReason(reason);
    document.getElementById("reason_modal").showModal();
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">My Articles</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Is Premium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article._id} className="hover">
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>
                  {article.status === "declined" ? (
                    <>
                      <span className="text-red-600 font-semibold">Declined</span>
                      <button
                        onClick={() => openReasonModal(article.declineReason)}
                        className="ml-2 text-sm bg-red-100 px-2 py-1 rounded hover:bg-red-200"
                      >
                        Reason
                      </button>
                    </>
                  ) : article.status === "approved" ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>
                <td>{article.isPremium ? "Yes" : "No"}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => navigate(`/articles/${article._id}`)}
                    className="btn btn-sm bg-lime-500 text-white"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => navigate(`/article/${article._id}`)}
                    className="btn btn-sm bg-blue-500 text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="btn btn-sm bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decline Reason Modal */}
      <dialog id="reason_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Decline Reason</h3>
          <p className="py-4 text-gray-700">{selectedReason}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyArticles;
