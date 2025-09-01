

import { use, useState } from "react";
import Swal from "sweetalert2";
import { AuthContex } from "../../AuthContex/AuthContex";

const OpinionForm = () => {
  const { user } = use(AuthContex);
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !review) {
      Swal.fire("Oops!", "Please fill all fields", "warning");
      return;
    }

    // Prepare reviewData
    const reviewData = {
      name: user?.displayName,
      email: user?.email,
      rating: parseFloat(rating),
      review,
    };

    // Include image only if the user has one
    if (user?.photo) {
      reviewData.image = user.photo;
    }

    try {
      const res = await fetch(
        "https://newspaper-fullstack-project-server.vercel.app/reviews",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData),
        }
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire("Thank you!", "Your review has been submitted!", "success");
        setRating("");
        setReview("");
      } else {
        Swal.fire("Error!", "Failed to submit review", "error");
      }
    } catch (error) {
      console.error("Error posting review:", error);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">Give Your Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full border p-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border p-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium">Rating (1-5)</label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border p-2 rounded-md"
            placeholder="Enter numeric rating (e.g. 4.5)"
          />
        </div>

        {/* Review */}
        <div>
          <label className="block text-sm font-medium">Your Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full border p-2 rounded-md"
            rows="4"
            placeholder="Write your review..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-lime-500 text-white py-2 rounded-md hover:bg-lime-600 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default OpinionForm;
