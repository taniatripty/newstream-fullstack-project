import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Sophia Ahmed",
    role: "Premium Subscriber",
    feedback: "I love how reliable and unbiased the reporting is. The premium subscription is totally worth it!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "James Carter",
    role: "Free User",
    feedback: "The Latest News and Trending sections keep me updated every morning.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Arif Hossain",
    role: "Publisher",
    feedback: "Publishing on this platform gave my news agency huge visibility!",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

const ReaderTestimonials = () => {
  return (
    <div className="bg-gray-50 py-12 px-6">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">What Our Readers Say</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <img
              src={t.image}
              alt={t.name}
              className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-lime-500"
            />
            <p className="text-gray-600 italic mb-3">“{t.feedback}”</p>
            <h4 className="font-semibold text-gray-800">{t.name}</h4>
            <span className="text-sm text-gray-500">{t.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReaderTestimonials;
