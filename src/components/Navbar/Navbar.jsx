

// import { Link, NavLink } from "react-router";
// import Swal from "sweetalert2";
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { FiBell } from "react-icons/fi";
// import useAuth from "../../hooks/useAuth/useAuth";
// import useUserRole from "../../hooks/useUserRole/UseUserRole";
// import Logo from "../Logo/Logo";
// import axios from "axios";

// // Connect to backend Socket.IO
// const socket = io("http://localhost:5000"); // Update to your backend URL

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const { role } = useUserRole();

//   const [notifications, setNotifications] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   // -----------------------------
//   // Fetch existing notifications on mount
//   // -----------------------------
//   useEffect(() => {
//     if (user) {
//       axios
//         .get("http://localhost:5000/admin/notifications")
//         .then((res) => setNotifications(res.data))
//         .catch((err) => console.error("Fetch notifications error:", err));
//     }
//   }, [user]);

//   // -----------------------------
//   // Listen for realtime notifications from backend
//   // -----------------------------
//   useEffect(() => {
//     socket.on("user_activity", (notification) => {
//       setNotifications((prev) => [notification, ...prev]);

//       Swal.fire({
//         position: "top-end",
//         icon: "info",
//         title: `${notification.name} ${notification.type}`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     });

//     socket.on("user_registered", (notification) => {
//       setNotifications((prev) => [notification, ...prev]);

//       Swal.fire({
//         position: "top-end",
//         icon: "info",
//         title: `${notification.name} registered!`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     });

//     return () => {
//       socket.off("user_activity");
//       socket.off("user_registered");
//     };
//   }, []);

//   // -----------------------------
//   // Logout handler
//   // -----------------------------
//   const handleLogout = async () => {
//     if (!user) return;

//     try {
//       // 1️⃣ Firebase logout
//       await logOut();

//       // 2️⃣ Notify backend to store logout
//       const res = await axios.post("http://localhost:5000/logout", { email: user.email });

//       // 3️⃣ Emit socket event (backend already emits, optional)
//       // socket.emit("user_activity", res.data.notification);

//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Logged out successfully",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     } catch (err) {
//       console.error("Logout failed:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Logout Failed",
//         text: err.message || "Something went wrong. Please try again.",
//       });
//     }
//   };

//   const links = (
//     <>
//       <li>
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
//           }
//         >
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/aboutus"
//           className={({ isActive }) =>
//             isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
//           }
//         >
//           About Us
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/allarticle"
//           className={({ isActive }) =>
//             isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
//           }
//         >
//           All Articles
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/subscriptionplan"
//           className={({ isActive }) =>
//             isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
//           }
//         >
//           Subscription Plan
//         </NavLink>
//       </li>
//       {user && (
//         <>
//           <li>
//             <NavLink
//               to="/addarticle"
//               className={({ isActive }) =>
//                 isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
//               }
//             >
//               Add Articles
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/myarticle"
//               className={({ isActive }) =>
//                 isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
//               }
//             >
//               My Articles
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/subscription"
//               className={({ isActive }) =>
//                 isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
//               }
//             >
//               Subscription
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/myprofile"
//               className={({ isActive }) =>
//                 isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
//               }
//             >
//               My Profile
//             </NavLink>
//           </li>
//         </>
//       )}

//       {user && role === "premium user" && (
//         <li>
//           <NavLink
//             to="/premium"
//             className={({ isActive }) =>
//               isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
//             }
//           >
//             Premium Articles
//           </NavLink>
//         </li>
//       )}

//       {user && role === "admin" && (
//         <li>
//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               isActive ? "text-indigo-600 font-semibold underline" : "hover:text-indigo-500"
//             }
//           >
//             Dashboard
//           </NavLink>
//         </li>
//       )}
//     </>
//   );

//   return (
//     <div className="shadow-md navbar bg-gray-900 text-white sticky top-0 z-50">
//       <div className="navbar container mx-auto">
//         {/* Left - Logo + Mobile menu */}
//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h12M4 18h16" />
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-10 mt-3 w-52 p-1 shadow"
//             >
//               {links}
//             </ul>
//           </div>
//           <Logo />
//         </div>

//         {/* Center - Desktop Menu */}
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal gap-2 px-1">{links}</ul>
//         </div>

//         {/* Right - User + Notifications */}
//         <div className="navbar-end flex items-center gap-2">
//           {user && (
//             <div className="relative cursor-pointer">
//               <div onClick={() => setShowDropdown((prev) => !prev)}>
//                 <FiBell size={22} className="text-white hover:text-indigo-400" />
//                 {notifications.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold text-white px-1.5 py-0.5 rounded-full">
//                     {notifications.length}
//                   </span>
//                 )}
//               </div>

//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg overflow-hidden z-50">
//                   {notifications.length > 0 ? (
//                     notifications.map((n, index) => (
//                       <div key={index} className="px-4 py-2 border-b hover:bg-gray-100">
//                         <p className="font-semibold">{n.name}</p>
//                         <p className="text-xs text-gray-500">{n.email}</p>
//                         <p className="text-xs text-gray-400">{new Date(n.time).toLocaleTimeString()}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="px-4 py-2">No notifications</div>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}

//           {user && (
//             <>
//               <span className="text-sm font-medium">{user.displayName}</span>
//               <img className="w-8 h-8 rounded-full border" src={user.photoURL} alt="User" />
//             </>
//           )}

//           {user ? (
//             <button onClick={handleLogout} className="btn btn-sm btn-outline btn-primary">
//               Logout
//             </button>
//           ) : (
//             <div className="flex gap-2">
//               <Link to="/login">
//                 <button className="btn btn-sm btn-primary">Login</button>
//               </Link>
//               <Link to="/register">
//                 <button className="btn btn-sm btn-outline">Register</button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FiBell } from "react-icons/fi";
import useAuth from "../../hooks/useAuth/useAuth";
import useUserRole from "../../hooks/useUserRole/UseUserRole";
import Logo from "../Logo/Logo";
import axios from "axios";

// Connect to backend Socket.IO
const socket = io("http://localhost:5000"); // Update to your backend URL

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role } = useUserRole();

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch existing notifications on mount
  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5000/admin/notifications")
        .then((res) => setNotifications(res.data))
        .catch((err) => console.error("Fetch notifications error:", err));
    }
  }, [user]);

  // Listen for realtime notifications
  useEffect(() => {
    socket.on("user_activity", (notification) => {
      setNotifications((prev) => [notification, ...prev]);

      Swal.fire({
        position: "top-end",
        icon: "info",
        title: `${notification.name} ${notification.type}`,
        showConfirmButton: false,
        timer: 2000,
      });
    });

    socket.on("user_registered", (notification) => {
      setNotifications((prev) => [notification, ...prev]);

      Swal.fire({
        position: "top-end",
        icon: "info",
        title: `${notification.name} registered!`,
        showConfirmButton: false,
        timer: 2000,
      });
    });

    return () => {
      socket.off("user_activity");
      socket.off("user_registered");
    };
  }, []);

  // Logout handler
  const handleLogout = async () => {
    if (!user) return;

    try {
      await logOut();
      await axios.post("http://localhost:5000/logout", { email: user.email });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error("Logout failed:", err);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: err.message || "Something went wrong. Please try again.",
      });
    }
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
    <div className="shadow-md navbar bg-gray-900 text-white sticky top-0 z-50">
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
              className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-10 mt-3 w-52 p-1 shadow"
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

        {/* Right - User + Notifications */}
        <div className="navbar-end flex items-center gap-2">
          {user && (
            <div className="relative cursor-pointer">
              <div onClick={() => setShowDropdown((prev) => !prev)}>
                <FiBell size={22} className="text-white hover:text-indigo-400" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold text-white px-1.5 py-0.5 rounded-full">
                  {role === "admin"
                    ? notifications.length
                    : notifications.filter((n) => n.email === user.email).length}
                </span>
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg overflow-hidden z-50">
                  {(role === "admin"
                    ? notifications
                    : notifications.filter((n) => n.email === user.email)
                  ).map((n, index) => (
                    <div key={index} className="px-4 py-2 border-b hover:bg-gray-100">
                      <p className="font-semibold">{n.name}</p>
                      <p className="text-xs text-gray-500">{n.email}</p>
                      <p className="text-xs text-gray-400">{new Date(n.time).toLocaleTimeString()}</p>
                    </div>
                  ))}

                  {((role === "admin" && notifications.length === 0) ||
                    (role !== "admin" &&
                      notifications.filter((n) => n.email === user.email).length === 0)) && (
                    <div className="px-4 py-2">No notifications</div>
                  )}
                </div>
              )}
            </div>
          )}

          {user && (
            <>
              <span className="text-sm font-medium">{user.displayName}</span>
              <img className="w-8 h-8 rounded-full border" src={user.photoURL} alt="User" />
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

