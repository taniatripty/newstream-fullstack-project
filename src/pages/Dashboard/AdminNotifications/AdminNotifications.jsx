import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../../../hooks/useAuth/useAuth";


const socket = io("http://localhost:5000"); // backend URL

const AdminNotifications = () => {
  const { user, role } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    

    // Fetch all past notifications
    fetch("http://localhost:5000/admin/notifications")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));

    // Listen to real-time notifications
    socket.on("user_registered", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    socket.on("user_activity", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    return () => {
      socket.off("user_registered");
      socket.off("user_activity");
    };
  }, [user, role]);

  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Notifications</h2>
      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notif, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 capitalize">{notif.type}</td>
                  <td className="border px-4 py-2">{notif.email || "-"}</td>
                  <td className="border px-4 py-2">{notif.name || "-"}</td>
                  <td className="border px-4 py-2">
                    {new Date(notif.time).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
