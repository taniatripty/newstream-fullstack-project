// src/components/Statistics/UserStatistics.jsx
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";

const UserStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/statistics");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading user statistics...</p>;

  const { total = 0, normal = 0, premium = 0 } = stats;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      {/* Total Users */}
      <div className="bg-white shadow rounded-lg p-6 border-t-4 border-blue-600">
        <p className="text-xl font-semibold mb-2">Total Users</p>
        <h2 className="text-4xl font-bold text-blue-600">
          <CountUp end={total} duration={20} />
        </h2>
      </div>

      {/* Normal Users */}
      <div className="bg-white shadow rounded-lg p-6 border-t-4 border-gray-500">
        <p className="text-xl font-semibold mb-2">Normal Users</p>
        <h2 className="text-4xl font-bold text-gray-600">
          <CountUp end={normal} duration={30} />
        </h2>
      </div>

      {/* Premium Users */}
      <div className="bg-white shadow rounded-lg p-6 border-t-4 border-yellow-500">
        <p className="text-xl font-semibold mb-2">Premium Users</p>
        <h2 className="text-4xl font-bold text-yellow-600">
          <CountUp end={premium} duration={30} />
        </h2>
      </div>
    </div>
  );
};

export default UserStatistics;
