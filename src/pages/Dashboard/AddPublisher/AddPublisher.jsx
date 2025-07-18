import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import axios from "axios";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure/useAxiosSecure";
import { useState } from "react";

const AddPublisher = () => {
  const { register, handleSubmit, reset } = useForm();
  const[profilepic,setProfilePic]=useState(null)
  const axiosSecure = useAxiosSecure();

 

  const onSubmit = async (data) => {
    try {
      // Image Upload
     

      const publisher = {
        name: data.name,
        logo: profilepic,
        created_at: new Date().toISOString(),
      };

      // Save to DB
      const res = await axiosSecure.post("/publishers", publisher);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Publisher Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (error) {
      console.error("Error adding publisher:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add publisher",
      });
    }
  };

   const handleimageupload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API}`;
    const res = await axios.post(uploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6">Add New Publisher</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Publisher Name */}
        <div>
          <label className="block text-sm mb-1">Publisher Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Enter Publisher Name"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm mb-1">Publisher Logo</label>
          <input
            type="file"
            accept="image/*"
           onChange={handleimageupload}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded"
        >
          Add Publisher
        </button>
      </form>
    </div>
  );
};

export default AddPublisher;
