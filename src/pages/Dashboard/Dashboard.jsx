

import axios from "axios";
import {
  FaChartLine,
  FaFileAlt,
  FaHome,
  FaSignOutAlt,
  FaUserCircle,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { IoNotificationsCircle } from "react-icons/io5";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Logo from "../../components/Logo/Logo";
import useAuth from "../../hooks/useAuth/useAuth";
import useUserRole from "../../hooks/useUserRole/UseUserRole";

const Dashboard = () => {
  const { role } = useUserRole();
  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  // handle logout
  const handleLogout = async () => {
    try {
      await logOut();
      await axios.post(
        "https://newspaper-fullstack-project-server.vercel.app/logout",
        { email: user.email }
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/"); // redirect to home after logout
    } catch (err) {
      console.error("Logout failed:", err);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: err.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for small screens */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>

        {/* Main Content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side border-r border-gray-300">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="w-80 h-full bg-base-200 flex flex-col justify-between">
          {/* Top section */}
          <div>
            <Link to="/">
              <Logo />
            </Link>
            <ul className="menu py-8 text-base-content p-4 space-y-2">
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-gray-200 hover:text-primary"
                    }`
                  }
                >
                  <FaHome className="mr-2" /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/notification"
                  end
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-gray-200 hover:text-primary"
                    }`
                  }
                >
                  <IoNotificationsCircle size={16} className="mr-2" />
                  Real Time Log
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/alluser"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-gray-200 hover:text-primary"
                    }`
                  }
                >
                  <FaUsers className="mr-2" /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addpublisher"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-gray-200 hover:text-primary"
                    }`
                  }
                >
                  <FaUserTie className="mr-2" /> Add Publishers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/allarticles"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-gray-200 hover:text-primary"
                    }`
                  }
                >
                  <FaFileAlt className="mr-2" /> All Articles
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/statistics"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-gray-200 hover:text-primary"
                    }`
                  }
                >
                  <FaChartLine className="mr-2" /> Statistics
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Logout button fixed at bottom */}
          <div className="p-4 border-t border-gray-300 space-y-2">
            <NavLink
              to="/dashboard/myprofile"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-gray-200 hover:text-primary"
                }`
              }
            >
              <FaUserCircle className="mr-2" /> My Profile
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-100 hover:text-red-800 rounded-md transition-all duration-200"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
