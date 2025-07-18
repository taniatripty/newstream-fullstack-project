import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: `https://newspaper-fullstack-project-server.vercel.app`,
  });
  return axiosSecure;
};

//

export default useAxiosSecure;
