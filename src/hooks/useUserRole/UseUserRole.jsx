// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../useAuth/useAuth";
// import useAxiosSecure from "../useAuth/useAxiosSecure/useAxiosSecure";

// const useUserRole = () => {
//   const { user, loading: authLoading } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: roleData,
//     isLoading: roleLoading,
//     refetch,
//   } = useQuery({
//     enabled: !!user?.email && !authLoading,
//     queryKey: ["user-role", user?.email],
//     // queryFn: async () => {
//     //   const res = await axiosSecure.get(`/users/${user.email}/role`);
//     //   return res.data?.role;
//     // },
//     queryFn: async () => {
//   const encodedEmail = encodeURIComponent(user.email);
//   const res = await axiosSecure.get(`/users/${encodedEmail}/role`);
//   return res.data?.role;
// },
//   });

//   return { role: roleData, loading: roleLoading, refetch };
// };

// export default useUserRole;
import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAuth/useAxiosSecure/useAxiosSecure";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: roleData,
    isLoading: roleLoading,
    refetch,
    error,
  } = useQuery({
    enabled: !!user?.email && !authLoading,
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const encodedEmail = encodeURIComponent(user.email);
      const res = await axiosSecure.get(`/users/${encodedEmail}/role`);
      return res.data?.role;
    },
  });

  return {
    role: roleData || " user", // default to "normal user" if none
    loading: roleLoading,
    refetch,
    error,
  };
};

export default useUserRole;
