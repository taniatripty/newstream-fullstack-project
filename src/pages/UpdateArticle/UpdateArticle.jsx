// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import Select from "react-select";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";
// import useAuth from "../../hooks/useAuth/useAuth";
// import { useParams } from "react-router";

// const tagOptions = [
//   { value: "politics", label: "Politics" },
//   { value: "sports", label: "Sports" },
//   { value: "education", label: "Education" },
//   { value: "technology", label: "Technology" },
//   { value: "health", label: "Health" },
//   { value: "weather", label: "Weather" },
//   { value: "climate chnage", label: "Climate Change" },
// ];

// const UpdateArticle = () => {
//   const { id } = useParams();
//   const { register, handleSubmit, control, reset, setValue } = useForm();
//   const [profilepic, setProfilePic] = useState(null);
//   const [publisherOptions, setPublisherOptions] = useState([]);
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   useEffect(() => {
//     axiosSecure.get("/publishers").then((res) => {
//       const options = res.data.map((pub) => ({
//         value: pub._id,
//         label: pub.name,
//       }));
//       setPublisherOptions(options);
//     });
//   }, [axiosSecure]);

//   useEffect(() => {
//     if (id) {
//       axiosSecure.get(`/article/${id}`).then((res) => {
//         const article = res.data;
//         reset({
//           title: article.title,
//           description: article.description,
//         });
//         setValue("tags", article.tags.map((tag) => ({ label: tag, value: tag })));
//         setValue("publisher", {
//           label: article.publisher,
//           value: article.publisherId,
//         });
//         setProfilePic(article.image);
//       });
//     }
//   }, [id, axiosSecure, reset, setValue]);

//   const handleImageUpload = async (e) => {
//     const image = e.target.files[0];
//     const formData = new FormData();
//     formData.append("image", image);

//     const res = await axios.post(
//       `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API}`,
//       formData
//     );

//     setProfilePic(res.data.data.url);
//   };

//   const onSubmit = (data) => {
//     const updatedArticle = {
//       title: data.title,
//       description: data.description,
//       publisher: data.publisher.label,
//       publisherId: data.publisher.value,
//       tags: data.tags.map((tag) => tag.value),
//       image: profilepic,
//     };

//     axiosSecure.patch(`/articles/${id}`, updatedArticle).then((res) => {
//       if (res.data.modifiedCount > 0) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Article updated successfully",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-4 p-6 max-w-2xl mx-auto bg-white shadow rounded"
//     >
//       <h2 className="text-2xl font-semibold mb-4">Update Article</h2>

//       <input
//         {...register("title", { required: true })}
//         type="text"
//         placeholder="Article Title"
//         className="w-full p-2 border border-gray-300 rounded"
//       />

//       <input
//         onChange={handleImageUpload}
//         type="file"
//         className="w-full p-2 border border-gray-300 rounded"
//       />

//       {profilepic && (
//         <img src={profilepic} alt="Preview" className="w-40 h-24 object-cover rounded" />
//       )}

//       <Controller
//         name="publisher"
//         control={control}
//         rules={{ required: true }}
//         render={({ field }) => (
//           <Select
//             {...field}
//             options={publisherOptions}
//             placeholder="Select Publisher"
//           />
//         )}
//       />

//       <Controller
//         name="tags"
//         control={control}
//         rules={{ required: true }}
//         render={({ field }) => (
//           <Select
//             {...field}
//             isMulti
//             options={tagOptions}
//             placeholder="Select Tags"
//           />
//         )}
//       />

//       <textarea
//         {...register("description", { required: true })}
//         placeholder="Description"
//         rows={4}
//         className="w-full p-2 border border-gray-300 rounded"
//       ></textarea>

//       <button
//         type="submit"
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Update Article
//       </button>
//     </form>
//   );
// };

// export default UpdateArticle;
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";
import { useParams } from "react-router";

const tagOptions = [
  { value: "politics", label: "Politics" },
  { value: "sports", label: "Sports" },
  { value: "education", label: "Education" },
  { value: "technology", label: "Technology" },
  { value: "health", label: "Health" },
  { value: "weather", label: "Weather" },
  { value: "climate change", label: "Climate Change" },
];

const UpdateArticle = () => {
  const { id } = useParams();
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [profilepic, setProfilePic] = useState(null);
  const [publisherOptions, setPublisherOptions] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loaded, setLoaded] = useState(false);

  // Fetch publisher options
  useEffect(() => {
    axiosSecure.get("/publishers").then((res) => {
      const options = res.data.map((pub) => ({
        value: pub._id,
        label: pub.name,
      }));
      setPublisherOptions(options);
    });
  }, [axiosSecure]);

  // Fetch article and set form values
  useEffect(() => {
    if (id && !loaded) {
      axiosSecure.get(`/article/${id}`).then((res) => {
        const article = res.data;
        reset({
          title: article.title,
          description: article.description,
        });
        setValue(
          "tags",
          article.tags.map((tag) => ({ label: tag, value: tag }))
        );
        setValue("publisher", {
          label: article.publisher,
          value: article.publisherId,
        });
        setProfilePic(article.image);
        setLoaded(true);
      });
    }
  }, [id, loaded, axiosSecure, reset, setValue]);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API}`,
      formData
    );

    setProfilePic(res.data.data.url);
  };

  // Submit updated article
  const onSubmit = (data) => {
    const updatedArticle = {
      title: data.title,
      description: data.description,
      publisher: data.publisher.label,
      publisherId: data.publisher.value,
      tags: data.tags.map((tag) => tag.value),
      image: profilepic,
    };

    axiosSecure.patch(`/articles/${id}`, updatedArticle).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Article updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 max-w-2xl mx-auto bg-white shadow rounded"
    >
      <h2 className="text-2xl font-semibold mb-4">Update Article</h2>

      <input
        {...register("title", { required: true })}
        type="text"
        placeholder="Article Title"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        onChange={handleImageUpload}
        type="file"
        className="w-full p-2 border border-gray-300 rounded"
      />

      {profilepic && (
        <img
          src={profilepic}
          alt="Preview"
          className="w-40 h-24 object-cover rounded"
        />
      )}

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
        Update Article
      </button>
    </form>
  );
};

export default UpdateArticle;
