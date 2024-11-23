import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import managerAvatar from "../../images/avatar.jpg";
import userAvatar from "../../images/avatar2.jpg";

const Header = () => {
  const { setLoggedInUserData, loggedInUser } = useAuthContext();
  const location = useLocation();

  const handleSignout = () => {
    setLoggedInUserData(null);
  };

  const showFillOutFormBtn =
    !loggedInUser?.isManager && !location.pathname.includes("/submit");

  const linkToHome = loggedInUser?.isManager
    ? "/manager/listing"
    : "/user/listing";

  const imageSrc = loggedInUser?.isManager ? managerAvatar : userAvatar;
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <Link to={linkToHome} className="flex items-center space-x-4">
          <img
            className="h-12 w-12 rounded-full border-2 border-white"
            src={imageSrc}
            alt="User Avatar"
          />
          <span className="font-semibold text-lg">
            Welcome, {loggedInUser?.fullName || "User"}
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          {showFillOutFormBtn && (
            <Link
              to="/user/submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Fill out a Form
            </Link>
          )}
          <button
            onClick={handleSignout}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
