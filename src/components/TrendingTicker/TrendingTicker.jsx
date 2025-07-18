import { useEffect, useState } from "react";
import { FaBolt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";


const TrendingTicker = () => {
  const [trending, setTrending] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchTrending = async () => {
      const res = await axiosSecure.get("/articles/approved");
      const sorted = res.data
        .sort((a, b) => b.views - a.views)
        .slice(0, 5); // top 5 articles
      setTrending(sorted);
    };
    fetchTrending();
  }, []);

  return (
    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 py-2 text-black">
      <div className="flex items-center gap-4 max-w-7xl mx-auto px-4 overflow-hidden">
        <FaBolt className="text-xl animate-pulse" />
        <div className="whitespace-nowrap overflow-hidden relative w-full">
          <div className="animate-marquee inline-block whitespace-nowrap">
            {trending.map((a) => (
              <span key={a._id} className="mx-6 font-semibold">
                🔥 {a.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingTicker;
