import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure/useAxiosSecure";

const AllPublisher = () => {
  const axiosSecure = useAxiosSecure();

  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["all-publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-lime-500 text-lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Publishers</h2>
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-lime-100 text-left">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Logo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {publishers.map((publisher, index) => (
              <tr
                key={publisher._id}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={publisher.logo}
                    alt={publisher.name}
                    className="w-12 h-12 rounded-full object-contain border"
                  />
                </td>
                <td className="px-4 py-2 font-medium">{publisher.name}</td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {new Date(publisher.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPublisher;
