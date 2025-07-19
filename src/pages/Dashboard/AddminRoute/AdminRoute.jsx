


import useAuth from "../../../hooks/useAuth/useAuth";
import useUserRole from "../../../hooks/useUserRole/UseUserRole";
import Forbidden from "../../../components/Error/Forbidden";

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  

  if (authLoading || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-lime-500 text-xl"></span>
      </div>
    );
  }

  if (user && role === "admin") {
    return children;
  }

  return <Forbidden></Forbidden>
};

export default AdminRoute;
