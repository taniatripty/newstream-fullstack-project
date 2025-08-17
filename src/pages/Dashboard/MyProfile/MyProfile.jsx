import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure/useAxiosSecure";

const MyProfile = () => {
  const { user: authUser } = useAuth();
  const axiosSecure = useAxiosSecure(); // your secure axios instance

  // Fetch profile using axiosSecure
  const fetchUserProfile = async () => {
    const res = await axiosSecure.get(`/users?email=${authUser.email}`);
    return res.data;
  };

  const { data: userData, isLoading, isError, error } = useQuery({
  queryKey: ["userProfile", authUser?.email],
  queryFn: fetchUserProfile,
  enabled: !!authUser?.email,
  staleTime: 1000 * 60 * 5, // 5 minutes
});

  if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;
  if (isError) return <p className="text-center mt-10">Error: {error.message}</p>;
  if (!userData) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>

      <div className="flex flex-col items-center space-y-4">
        <img
          src={userData?.photo || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-lime-500"
        />
        <div className="text-center">
          <h3 className="text-xl font-bold">{userData?.name || "N/A"}</h3>
          <p className="text-gray-600">{userData?.email || "No email found"}</p>
          <p className="text-gray-600">{userData?.phone || "No phone found"}</p>
          <p className="text-gray-600">{userData?.address || "No address found"}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
