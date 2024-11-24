import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

const LoggedinLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackArrow =
    location.pathname.includes("/user/submit") ||
    location.pathname.includes("/manager/review");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      {showBackArrow && (
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 flex items-center space-x-2 px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span>Go Back</span>
        </button>
      )}
      <main className="flex flex-1 justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default LoggedinLayout;
