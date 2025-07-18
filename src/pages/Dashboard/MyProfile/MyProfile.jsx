import useAuth from "../../../hooks/useAuth/useAuth";


const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>

      <div className="flex flex-col items-center space-y-4">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-lime-500"
        />
        <div className="text-center">
          <h3 className="text-xl font-bold">{user?.displayName || "N/A"}</h3>
          <p className="text-gray-600">{user?.email || "No email found"}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
