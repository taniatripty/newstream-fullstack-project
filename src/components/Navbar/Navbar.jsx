import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth/useAuth";
import useUserRole from "../../hooks/useUserRole/UseUserRole";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role } = useUserRole();
  const handleLogout = () => {
    logOut()
      .then(() =>{
Swal.fire({
  position: "top-end",
  icon: "success",
  title: "logOut successful",
  showConfirmButton: false,
  timer: 1500
});
      })
         
      .catch((error) => console.error(error));
  };

  const links = (
    <>
      <li>
        <NavLink to='/'
          className={({ isActive }) =>
            isActive ? "text-indigo-700 underline" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='aboutus'
          className={({ isActive }) =>
            isActive ? "text-indigo-700 underline" : ""
          }
        >
         About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addarticle"
          className={({ isActive }) =>
            isActive ? "text-indigo-700 underline" : ""
          }
        >
          Add Articles
        </NavLink>
      </li>
      <li>
        <NavLink to='/allarticle'
          className={({ isActive }) =>
            isActive ? "text-indigo-700 underline" : ""
          }
        >
          All Articles
        </NavLink>
      </li>
     {
      user && role=='premium user'&&(
        <>
         <li>
        <NavLink to='/premium'
          className={({ isActive }) =>
            isActive ? "text-indigo-700 underline" : ""
          }
        >
          Premium Articles
        </NavLink>
      </li>
        </>
      )
     }
      <li>
        <NavLink to='/myarticle'
          className={({ isActive }) =>
            isActive ? "text-indigo-700 underline" : ""
          }
        >
         My Articles
        </NavLink>
      </li>
      {user && role == "admin" && (
        <>
          <li>
            <NavLink to='/dashboard'
              className={({ isActive }) =>
                isActive ? "text-indigo-700 underline" : ""
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to='/subscription'
          className={({ isActive }) =>
            isActive ? "text-indigo-700 underline" : ""
          }
        >
          Subscription
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">newspaper</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user && user.displayName}
        {user && (
          <img className="w-12 rounded-4xl mr-4" src={user.photoURL} alt="" />
        )}
          {user ? (
            <button onClick={handleLogout} className="btn btn-sm">
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-sm">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
