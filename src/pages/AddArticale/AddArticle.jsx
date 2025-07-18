

import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";

// Static tags
const tagOptions = [
  { value: "politics", label: "Politics" },
  { value: "sports", label: "Sports" },
  { value: "education", label: "Education" },
  { value: "technology", label: "Technology" },
  { value: "health", label: "Health" },
  { value: "weather", label: "Weather" },
  { value: "climate change", label: "Climate Change" },
];

const AddArticle = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const [profilepic, setProfilePic] = useState();
  const [publisherOptions, setPublisherOptions] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ✅ Fetch publisher list from backend
  useEffect(() => {
    axiosSecure
      .get("/publishers")
      .then((res) => {
        const options = res.data.map((pub) => ({
          value: pub._id,
          label: pub.name,
        }));
        setPublisherOptions(options);
      })
      .catch((err) => {
        console.error("Error loading publishers:", err);
      });
  }, [axiosSecure]);

  // ✅ Upload image to imgbb
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_API
    }`;
    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  // ✅ Submit article
  const onSubmit = (data) => {
    const article = {
      title: data.title,
      description: data.description,
      publisher: data.publisher.label,
      publisherId: data.publisher.value,
      tags: data.tags.map((tag) => tag.value),
      image: profilepic,
      Authorname: user?.displayName,
      AuthorPhoto: user?.photoURL,
      email: user?.email,
      status: "pending",
      isPremium: false,
      postedDate: new Date().toISOString(),
    };

    axiosSecure
      .post("/articles", article)
      .then((res) => {
        if (res.data.insertedId || res.data.result?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Article added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          setProfilePic(null);
        }
      })
      .catch((error) => {
        const message =
          error.response?.data?.message ||
          "An error occurred while submitting the article.";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 max-w-2xl mx-auto bg-white shadow rounded"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Article</h2>

      {/* Title */}
      <input
        {...register("title", { required: true })}
        type="text"
        placeholder="Article Title"
        className="w-full p-2 border border-gray-300 rounded"
      />

      {/* Image Upload */}
      <input
        {...register("image")}
        onChange={handleImageUpload}
        type="file"
        className="w-full p-2 border border-gray-300 rounded"
      />

      {/* Publisher Dropdown */}
      <Controller
        name="publisher"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            options={publisherOptions}
            placeholder="Select Publisher"
          />
        )}
      />

      {/* Tags Multi Select */}
      <Controller
        name="tags"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            isMulti
            options={tagOptions}
            placeholder="Select Tags"
          />
        )}
      />

      {/* Description */}
      <textarea
        {...register("description", { required: true })}
        placeholder="Description"
        rows={4}
        className="w-full p-2 border border-gray-300 rounded"
      ></textarea>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit Article
      </button>
    </form>
  );
};

export default AddArticle;
