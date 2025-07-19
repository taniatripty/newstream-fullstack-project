import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: `https://newspaper-fullstack-project-server.vercel.app`,
  });
  return axiosInstance;
};

export default useAxios;
