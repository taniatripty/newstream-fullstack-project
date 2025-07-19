

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxios from "../../../hooks/useAxios/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [profilepic, setProfilePic] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();

  const { Googlelogin, createuser, upadeteuser } = useAuth();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    createuser(data.email, data.password)
      .then(async (result) => {
        const userInfo = {
          name: data.name,
          photo: profilepic,
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
          premiumTaken: null,
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        if (userRes.data.inserted !== false) {
          console.log(" New user created in DB");
        } else {
          console.log(" User already exists in DB");
        }

        const userProfile = {
          displayName: data.name,
          photoURL: profilepic,
        };

        upadeteuser(userProfile)
          .then(() => {
            Swal.fire("Success", "Account created successfully", "success");
            navigate(from);
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        Swal.fire("Error", "Failed to register user", "error");
      });
  };

  const handleimageupload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API}`;
    const res = await axios.post(uploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  const handleGoogleLogin = () => {
    Googlelogin()
      .then(async (result) => {
        const loggedUser = result.user;

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Social login successful",
          showConfirmButton: false,
          timer: 1500,
        });

        const userInfo = {
          name: loggedUser.displayName,
          photo: loggedUser.photoURL,
          email: loggedUser.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
          premiumTaken: null,
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        if (userRes.data.inserted !== false) {
          console.log(" New social user created in DB");
        } else {
          console.log(" Social user already exists in DB");
        }

        navigate(from);
      })
      .catch((error) => {
        console.error("Google login error:", error);
        Swal.fire("Error", "Google login failed", "error");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Register</h1>
          <p className="text-sm text-gray-400">Sign up to access account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter Your name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
              {errors.name && <p className="text-red-600">Name is required</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm">Select Image:</label>
              <input
                className="bg-gray-200 cursor-pointer"
                onChange={handleimageupload}
                type="file"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Email address</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
              {errors.email && <p className="text-red-600">Email is required</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                })}
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Must be at least 6 characters</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Must include one uppercase, one lowercase, and one digit
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white"
            >
              Register
            </button>
          </div>
        </form>

        <div className="space-y-1 mt-2">
          <button className="text-xs hover:underline hover:text-lime-500 text-gray-400">
            Forgot password?
          </button>
        </div>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">Or continue with</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div
          onClick={handleGoogleLogin}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-lime-500 text-gray-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
