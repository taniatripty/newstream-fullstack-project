// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://newspaper-fullstack-project-server.vercel.app", {
  withCredentials: true,
});

export default socket;
