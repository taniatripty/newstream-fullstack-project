
import { FaBan } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-4 text-center">
      <FaBan className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-700 mb-2">403 Forbidden</h1>
      <p className="text-gray-500 mb-6">
        You don't have permission to access this page.
      </p>
      <Link
        to="/"
        className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-md"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Forbidden;
