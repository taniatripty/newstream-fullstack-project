// import React from 'react';
// import { FaBuilding, FaFileAlt, FaFileMedicalAlt, FaHome, FaNewspaper, FaUserCircle, FaUsers, FaUserShield, FaUserTie, FaUserTimes } from 'react-icons/fa';
// import { NavLink, Outlet } from 'react-router';
// import useUserRole from '../../hooks/useUserRole/UseUserRole';
// import ArticlePieChart from './ArticlePieChart/ArticlePieChart';
// import ArticleCharts from './ArticleCharts/ArticleCharts';

// const Dashboard = () => {
//  const { role, loading } = useUserRole();
//  console.log(role)


//     return (
//         <div className="drawer lg:drawer-open">
//   <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//   <div className="drawer-content flex flex-col ">
//     {/* Page content here */}
//     <div className="navbar bg-base-300 w-full lg:hidden">
//       <div className="flex-none lg:hidden">
//         <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             className="inline-block h-6 w-6 stroke-current"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             ></path>
//           </svg>
//         </label>
//       </div>
//       <div className="mx-2 flex-1 px-2">Navbar Title</div>
     
//     </div>
//     {/* Page content here */}
   
//    <Outlet></Outlet>
   
//   </div>
//   <div className="drawer-side">
//     <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
//     <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
//       {/* Sidebar content here */}
//      <li>
//           <NavLink to="/dashboard" className="flex items-center text-gray-700 hover:text-lime-500">
//             <FaHome className="inline-block mr-2" />
//             Dashboard Home
//           </NavLink>
//         </li>
        
//         <li>
//           <NavLink to="/dashboard/myprofile" className="flex items-center text-gray-700 hover:text-lime-500">
//             <FaUserCircle className="inline-block mr-2" />
//             My Profile
//           </NavLink>
//         </li>
//          <li>
//         <NavLink
//           to="/dashboard/alluser"
//           className="flex items-center text-gray-700 hover:text-lime-500"
//         >
//           <FaUsers className="inline-block mr-2" />
//           All Users
//         </NavLink>
//       </li>

//       {/* All Publishers */}
//       <li>
//         <NavLink
//           to="/dashboard/addpublisher"
//           className="flex items-center text-gray-700 hover:text-lime-500"
//         >
//           <FaUserTie className="inline-block mr-2" />
//           Add Publishers
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/dashboard/allpublisher"
//           className="flex items-center text-gray-700 hover:text-lime-500"
//         >
//           <FaUserTimes className="inline-block mr-2" />
//           All Publishers
//         </NavLink>
//       </li>

//       {/* All Articles */}
//       <li>
//         <NavLink
//           to="/dashboard/allarticles"
//           className="flex items-center text-gray-700 hover:text-lime-500"
//         >
//           <FaFileAlt className="inline-block mr-2" />
//           All Articles
//         </NavLink>
//       </li>
//       <li>
//   <NavLink
//     to="/dashboard/make-admin"
//     className="flex items-center text-gray-700 hover:text-lime-500"
//   >
//     <FaUserShield className="inline-block mr-2" />
//     Make Admin
//   </NavLink>
// </li>
//     </ul>
//   </div>
 
// </div>
//     );
// };

// export default Dashboard;
import React from "react";
import { NavLink, Outlet } from "react-router";
import useUserRole from "../../hooks/useUserRole/UseUserRole";
import { FaHome, FaUsers, FaFileAlt, FaUserCircle, FaUserShield, FaUserTie, FaUserTimes } from "react-icons/fa";

const Dashboard = () => {
  const { role, loading } = useUserRole();

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
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <NavLink
              to="/dashboard"
              end
              className="flex items-center text-gray-700 hover:text-lime-500"
            >
              <FaHome className="inline-block mr-2" />
              Dashboard Home
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
          <li>
            <NavLink
              to="/dashboard/make-admin"
              className="flex items-center text-gray-700 hover:text-lime-500"
            >
              <FaUserShield className="inline-block mr-2" />
              Make Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
