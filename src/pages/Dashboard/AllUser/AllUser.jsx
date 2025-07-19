// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import Swal from "sweetalert2";
// import { FaUserShield } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure/useAxiosSecure";

// const AllUser = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   // Fetch all users
//   const { data: users = [], isLoading } = useQuery({
//     queryKey: ["all-users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users");
//       return res.data;
//     },
//   });

//   // Mutation to make admin
//   const makeAdminMutation = useMutation({
//     mutationFn: async (userId) => {
//       const res = await axiosSecure.patch(`/users/admin/${userId}`);
//       return res.data;
//     },
//     onSuccess: () => {
//       Swal.fire({
//         icon: "success",
//         title: "User promoted to admin!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       queryClient.invalidateQueries(["all-users"]);
//     },
//     onError: () => {
//       Swal.fire({
//         icon: "error",
//         title: "Something went wrong!",
//       });
//     },
//   });

//   const handleMakeAdmin = (userId) => {
//     makeAdminMutation.mutate(userId);
//   };

//   if (isLoading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
//       <div className="overflow-x-auto rounded shadow">
//         <table className="min-w-full table-auto bg-white">
//           <thead className="bg-lime-100 text-left">
//             <tr>
//               <th className="px-4 py-2">#</th>
//               <th className="px-4 py-2">Profile</th>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr
//                 key={user._id}
//                 className="border-b hover:bg-gray-50 transition-all"
//               >
//                 <td className="px-4 py-2">{index + 1}</td>
//                 <td className="px-4 py-2">
//                   <img
//                     src={user.photo}
//                     alt="profile"
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                 </td>
//                 <td className="px-4 py-2">{user.name}</td>
//                 <td className="px-4 py-2">{user.email}</td>
//                 <td className="px-4 py-2">
//                   {user.role === "admin" ? (
//                     <span className="text-green-600 font-semibold flex items-center gap-1">
//                       <FaUserShield /> Admin
//                     </span>
//                   ) : (
//                     <button
//                       onClick={() => handleMakeAdmin(user._id)}
//                       className="bg-lime-500 hover:bg-lime-600 text-white px-3 py-1 rounded"
//                     >
//                       Make Admin
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllUser;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserShield } from "react-icons/fa";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure/useAxiosSecure";

const USERS_PER_PAGE = 10;

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  // Fetch users with pagination
  const { data, isLoading } = useQuery({
    queryKey: ["all-users", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?page=${page}&limit=${USERS_PER_PAGE}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = data?.users || [];
  const totalUsers = data?.total || 0;
  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

  // Mutation to make admin
  const makeAdminMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/users/admin/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "User promoted to admin!",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["all-users"]);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    },
  });

  const handleMakeAdmin = (userId) => {
    makeAdminMutation.mutate(userId);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-lime-100 text-left">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Profile</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-50 transition-all">
                <td className="px-4 py-2">{(page - 1) * USERS_PER_PAGE + index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={user.photo}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold flex items-center gap-1">
                      <FaUserShield /> Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-lime-500 hover:bg-lime-600 text-white px-3 py-1 rounded"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">{page} / {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUser;
