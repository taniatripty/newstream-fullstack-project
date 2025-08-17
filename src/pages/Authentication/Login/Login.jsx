
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxios from "../../../hooks/useAxios/useAxios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  const from = location.state?.from || "/";
  const { login, Googlelogin } = useAuth();

  // Email / Password Login
  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Something went wrong. Please try again.",
        });
      });
  };

  // Google Login
  const handleGoogleLogin = () => {
    Googlelogin()
      .then(async (result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

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
          address:'Dhaka',
          phone:null,
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
          premiumTaken: null,
        };

        try {
          const userRes = await axiosInstance.post("/users", userInfo);
          console.log(userRes.data);
        } catch (err) {
          console.error("User save error:", err);
          Swal.fire({
            icon: "error",
            title: "User Save Failed",
            text: err.message || "Failed to save user info.",
          });
        }

        navigate(from);
      })
      .catch((error) => {
        console.error("Google login error:", error);
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message || "Unable to login with Google. Try again later.",
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">Sign in to access account</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="text-red-600">Email is required</p>
            )}

            {/* Password Field */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                autoComplete="current-password"
                id="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                })}
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Length must be at least 6 characters</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Must contain at least one uppercase, one lowercase, and one digit
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white"
            >
              Login
            </button>
          </div>
        </form>

        {/* Forgot Password */}
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-lime-500 text-gray-400">
            Forgot password?
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>

        {/* Google Login */}
        <div
          onClick={handleGoogleLogin}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        {/* Register Link */}
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/register"
            className="hover:underline hover:text-lime-500 text-gray-600"
          >
            Register
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;

