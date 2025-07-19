import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrendingSlider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: trending = [], isLoading } = useQuery({
    queryKey: ["trending-articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles/trending");
      return res.data;
    },
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  if (isLoading) return <p className="text-center py-8">Loading Trending Articles...</p>;

  return (
    <div className="max-w-7xl  mx-auto px-4 py-10">
      <h2 className="text-3xl text-center font-bold mb-6">🔥 Trending Articles</h2>
      <Slider {...settings}>
        {trending.map((article) => (
          <div key={article._id} className="p-4">
            <div className="bg-white rounded shadow hover:shadow-lg transition h-auto lg:h-[350px] flex flex-col">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{article.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  points: {article.points|| 0}
                </p>
                <Link
                  to={`/articles/${article._id}`}
                  className="inline-block mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingSlider;
