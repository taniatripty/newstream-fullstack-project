import { useState } from "react";
import { updateProfile } from "firebase/auth";
import useAuth from "../../hooks/useAuth/useAuth";


const Profile = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });
      alert("Profile updated successfully!");
      // Optionally refresh the page or update local state
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>

      <div className="flex flex-col items-center space-y-4">
        <img
          src={photo || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-lime-500"
        />
        <div className="text-center">
          <h3 className="text-xl font-bold">{user?.displayName || "N/A"}</h3>
          <p className="text-gray-600">{user?.email || "No email found"}</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="mt-6 space-y-4">
        <div>
          <label className="block font-medium">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Photo URL</label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
