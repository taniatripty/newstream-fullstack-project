
// import { useForm } from "react-hook-form";
// import { FcGoogle } from "react-icons/fc";
// import { Link, useLocation, useNavigate } from "react-router";
// import Swal from "sweetalert2";
// import useAuth from "../../../hooks/useAuth/useAuth";
// import useAxios from "../../../hooks/useAxios/useAxios";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const axiosInstance = useAxios();
//   const from = location.state?.from || "/";
//   const { login, Googlelogin } = useAuth();

//   // Email / Password Login
//   const onSubmit = (data) => {
//     login(data.email, data.password)
//       .then((result) => {
//         console.log(result);
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Login successful",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         navigate(from);
//       })
//       .catch((error) => {
//         console.error(error);
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: error.message || "Something went wrong. Please try again.",
//         });
//       });
//   };

//   // Google Login
//   const handleGoogleLogin = () => {
//     Googlelogin()
//       .then(async (result) => {
//         const loggedUser = result.user;
//         console.log(loggedUser);

//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Social login successful",
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         const userInfo = {
//           name: loggedUser.displayName,
//           photo: loggedUser.photoURL,
//           email: loggedUser.email,
//           role: "user",
//           address:'Dhaka',
//           phone:null,
//           created_at: new Date().toISOString(),
//           last_log_in: new Date().toISOString(),
//           premiumTaken: null,
//         };

//         try {
//           const userRes = await axiosInstance.post("/users", userInfo);
//           console.log(userRes.data);
//         } catch (err) {
//           console.error("User save error:", err);
//           Swal.fire({
//             icon: "error",
//             title: "User Save Failed",
//             text: err.message || "Failed to save user info.",
//           });
//         }

//         navigate(from);
//       })
//       .catch((error) => {
//         console.error("Google login error:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Google Login Failed",
//           text: error.message || "Unable to login with Google. Try again later.",
//         });
//       });
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white">
//       <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
//         <div className="mb-8 text-center">
//           <h1 className="my-3 text-4xl font-bold">Log In</h1>
//           <p className="text-sm text-gray-400">Sign in to access account</p>
//         </div>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-6 ng-untouched ng-pristine ng-valid"
//         >
//           <div className="space-y-4">
//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="block mb-2 text-sm">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 {...register("email", { required: true })}
//                 placeholder="Enter Your Email Here"
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
//               />
//             </div>
//             {errors.email?.type === "required" && (
//               <p className="text-red-600">Email is required</p>
//             )}

//             {/* Password Field */}
//             <div>
//               <div className="flex justify-between">
//                 <label htmlFor="password" className="text-sm mb-2">
//                   Password
//                 </label>
//               </div>
//               <input
//                 type="password"
//                 autoComplete="current-password"
//                 id="password"
//                 {...register("password", {
//                   required: true,
//                   minLength: 6,
//                   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
//                 })}
//                 placeholder="*******"
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
//               />
//             </div>
//             {errors.password?.type === "required" && (
//               <p className="text-red-600">Password is required</p>
//             )}
//             {errors.password?.type === "minLength" && (
//               <p className="text-red-600">Length must be at least 6 characters</p>
//             )}
//             {errors.password?.type === "pattern" && (
//               <p className="text-red-600">
//                 Must contain at least one uppercase, one lowercase, and one digit
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               className="bg-lime-500 w-full rounded-md py-3 text-white"
//             >
//               Login
//             </button>
//           </div>
//         </form>

//         {/* Forgot Password */}
//         <div className="space-y-1">
//           <button className="text-xs hover:underline hover:text-lime-500 text-gray-400">
//             Forgot password?
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="flex items-center pt-4 space-x-1">
//           <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
//           <p className="px-3 text-sm dark:text-gray-400">
//             Login with social accounts
//           </p>
//           <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
//         </div>

//         {/* Google Login */}
//         <div
//           onClick={handleGoogleLogin}
//           className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
//         >
//           <FcGoogle size={32} />
//           <p>Continue with Google</p>
//         </div>

//         {/* Register Link */}
//         <p className="px-6 text-sm text-center text-gray-400">
//           Don&apos;t have an account yet?{" "}
//           <Link
//             to="/register"
//             className="hover:underline hover:text-lime-500 text-gray-600"
//           >
//             Register
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxios from "../../../hooks/useAxios/useAxios";
import useSocket from "../../../hooks/useSocket";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  const socket = useSocket(); 
  const from = location.state?.from || "/";
  const { login, Googlelogin } = useAuth();

  // -------- Email / Password Login --------
  const onSubmit = async (data) => {
    try {
      // 1️⃣ Firebase login
      const result = await login(data.email, data.password);
      const user = result.user;

      // 2️⃣ Call backend login route to save notification
      const res = await axiosInstance.post("/login", { email: user.email });

      // 3️⃣ Show success alert
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });

      // 4️⃣ Emit socket event if needed
      if (socket) {
        socket.emit("user_activity", res.data.notification);
      }

      navigate(from);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  // -------- Google Login --------
  const handleGoogleLogin = async () => {
    try {
      const result = await Googlelogin();
      const loggedUser = result.user;

      // 1️⃣ Save user in database (if not exists)
      const userInfo = {
        name: loggedUser.displayName,
        photo: loggedUser.photoURL,
        email: loggedUser.email,
        role: "user",
        address: "Dhaka",
        phone: null,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
        premiumTaken: null,
      };

      await axiosInstance.post("/users", userInfo);

      // 2️⃣ Call backend login route
      const res = await axiosInstance.post("/login", { email: loggedUser.email });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Google login successful",
        showConfirmButton: false,
        timer: 1500,
      });

      // 3️⃣ Emit socket event
      if (socket) {
        socket.emit("user_activity", res.data.notification);
      }

      navigate(from);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login to Your Account
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
