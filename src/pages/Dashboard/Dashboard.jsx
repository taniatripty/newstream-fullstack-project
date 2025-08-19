
import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import useUserRole from "../../hooks/useUserRole/UseUserRole";
import { FaHome, FaUsers, FaFileAlt, FaUserCircle, FaUserShield, FaUserTie, FaUserTimes } from "react-icons/fa";
import Logo from "../../components/Logo/Logo";
import { IoNotificationsCircle } from "react-icons/io5";

const Dashboard = () => {
  const { role, loading } = useUserRole();
  console.log(role)

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
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
          <div className="mx-2 flex-1 px-2">Navbar Title</div>
        </div>

        {/* Main content changes based on route */}
        <Outlet />
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
       <Link to='/'> <Logo></Logo></Link>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <NavLink
              to="/dashboard"
              end
              className="flex items-center text-gray-700 hover:text-lime-500"
            >
              <FaHome className="inline-block mr-2" />
              Dashboard
            </NavLink>
          </li>
           <li>
            <NavLink
              to="/dashboard/notification"
              end
              className="flex items-center text-gray-700 hover:text-lime-500"
            >
              <IoNotificationsCircle size={16} className="inline-block mr-2" />
              notification
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/myprofile"
              className="flex items-center text-gray-700 hover:text-lime-500"
            >
              <FaUserCircle className="inline-block mr-2" />
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/alluser"
              className="flex items-center text-gray-700 hover:text-lime-500"
            >
              <FaUsers className="inline-block mr-2" />
              All Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/addpublisher"
              className="flex items-center text-gray-700 hover:text-lime-500"
            >
              <FaUserTie className="inline-block mr-2" />
              Add Publishers
            </NavLink>
          </li>
         
          <li>
            <NavLink
              to="/dashboard/allarticles"
              className="flex items-center text-gray-700 hover:text-lime-500"
            >
              <FaFileAlt className="inline-block mr-2" />
              All Articles
            </NavLink>
          </li>
         
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
