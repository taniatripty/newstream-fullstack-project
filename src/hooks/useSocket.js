
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000"); // backend URL
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return socketRef.current;
};

export default useSocket;
