import { useEffect, useState } from "react";
import ReactStars from "react-stars"; // react-stars package

const ShowReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://newspaper-fullstack-project-server.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Failed to fetch reviews:", err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mb-5">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white p-4 rounded-2xl shadow-md flex flex-col"
        >
          {/* User info */}
          <div className="flex items-center mb-3">
            {review.image && (
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
            )}
            <div>
              <h3 className="font-bold text-gray-800">{review.name}</h3>
              <p className="text-sm text-gray-500">{review.email}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-3">
            <ReactStars
              count={5}
              value={review.rating}
              size={20}
              edit={false}
              color1="orrange"
            />
          </div>

          {/* Review text */}
          <p className="text-gray-700">{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowReviews;
