import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const NotFound = () => {
  const { signOut } = useAuthContext();

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-md shadow-md">
        <h1 className="text-4xl font-semibold text-blue-600">404</h1>
        <p className="mt-2 text-lg text-gray-700">Page Not Found</p>
        <p className="mt-4 text-gray-500">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6 flex items-center justify-center">
          <div onClick={handleLogout}>
            <Link
              to="/auth/login"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Go to Login
            </Link>
          </div>
          <span className="mx-2">or</span>
          <div onClick={handleLogout}>
            <Link
              to="/auth/register"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
