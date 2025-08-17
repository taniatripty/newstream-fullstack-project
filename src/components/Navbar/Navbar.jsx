// import { Link, NavLink } from "react-router";
// import Swal from "sweetalert2";
// import useAuth from "../../hooks/useAuth/useAuth";
// import useUserRole from "../../hooks/useUserRole/UseUserRole";
// import Logo from "../Logo/Logo";

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const { role } = useUserRole();
//   const handleLogout = () => {
//     logOut()
//       .then(() => {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "logOut successful",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       })

//       .catch((error) => console.error(error));
//   };

//   const links = (
//     <>
//       <li>
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive ? "text-indigo-700 underline" : ""
//           }
//         >
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="aboutus"
//           className={({ isActive }) =>
//             isActive ? "text-indigo-700 underline" : ""
//           }
//         >
//           About Us
//         </NavLink>
//       </li>
//       {user && (
//         <>
//           <li>
//             <NavLink
//               to="/addarticle"
//               className={({ isActive }) =>
//                 isActive ? "text-indigo-700 underline" : ""
//               }
//             >
//               Add Articles
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/allarticle"
//               className={({ isActive }) =>
//                 isActive ? "text-indigo-700 underline" : ""
//               }
//             >
//               All Articles
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/myarticle"
//               className={({ isActive }) =>
//                 isActive ? "text-indigo-700 underline" : ""
//               }
//             >
//               My Articles
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/subscription"
//               className={({ isActive }) =>
//                 isActive ? "text-indigo-700 underline" : ""
//               }
//             >
//               Subscription
//             </NavLink>
//           </li>
//            <li>
//             <NavLink
//               to="/myprofile"
//               className={({ isActive }) =>
//                 isActive ? "text-indigo-700 underline" : ""
//               }
//             >
//               My Profile
//             </NavLink>
//           </li>
//         </>
//       )}

//       {user && role == "premium user" && (
//         <>
//           <li>
//             <NavLink
//               to="/premium"
//               className={({ isActive }) =>
//                 isActive ? "text-indigo-700 underline" : ""
//               }
//             >
//               Premium Articles
//             </NavLink>
//           </li>
//         </>
//       )}
//       {user && role == "admin" && (
//         <>
//           <li>
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 isActive ? "text-indigo-700 underline" : ""
//               }
//             >
//               Dashboard
//             </NavLink>
//           </li>
//         </>
//       )}
//     </>
//   );
//   return (
//     <div>
//       <div className="navbar bg-base-100 shadow-sm">
//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {" "}
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16"
//                 />{" "}
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//             >
//               {links}
//             </ul>
//           </div>
//           <Logo></Logo>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">{links}</ul>
//         </div>
//         <div className="navbar-end">
//           {user && user.displayName}
//           {user && (
//             <img className="w-10 h-10  rounded-full mr-4" src={user.photoURL} alt="" />
//           )}
//           {user ? (
//             <button onClick={handleLogout} className="btn btn-sm">
//               Logout
//             </button>
//           ) : (
//             <div className="flex gap-2">
//               <Link to="/login">
//                 <button className="btn btn-sm">Login</button>
//               </Link>
//               <Link to="/register">
//                 <button className="btn btn-sm">Register</button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import { Link, NavLink } from "react-router"; // ✅ FIXED
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth";
import useUserRole from "../../hooks/useUserRole/UseUserRole";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role } = useUserRole();

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.error(error));
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutus"
          className={({ isActive }) =>
            isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
            <NavLink
              to="/allarticle"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
              }
            >
              All Articles
            </NavLink>
          </li>
 <li>
            <NavLink
              to="/subscriptionplan"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
              }
            >
              Subscription Plan
            </NavLink>
          </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/addarticle"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
              }
            >
              Add Articles
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/myarticle"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
              }
            >
              My Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/subscription"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
              }
            >
              Subscription
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myprofile"
              className={({ isActive }) =>
                isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
              }
            >
              My Profile
            </NavLink>
          </li>
        </>
      )}

      {user && role === "premium user" && (
        <li>
          <NavLink
            to="/premium"
            className={({ isActive }) =>
              isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
            }
          >
            Premium Articles
          </NavLink>
        </li>
      )}

      {user && role === "admin" && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="shadow-md navbar bg-gray-900 text-white sticky top-0 z-50 ">
      <div className="navbar container mx-auto">
        {/* Left - Logo + Mobile menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h12M4 18h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>

        {/* Center - Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">{links}</ul>
        </div>

        {/* Right - User */}
        <div className="navbar-end flex items-center gap-3">
          {user && (
            <>
              <span className="text-sm font-medium">{user.displayName}</span>
              <img
                className="w-10 h-10 rounded-full border"
                src={user.photoURL}
                alt="User"
              />
            </>
          )}
          {user ? (
            <button onClick={handleLogout} className="btn btn-sm btn-outline btn-primary">
              Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <button className="btn btn-sm btn-primary">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-sm btn-outline">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

