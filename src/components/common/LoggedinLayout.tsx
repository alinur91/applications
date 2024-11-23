import { Outlet } from "react-router-dom";
import Header from "./Header";

const LoggedinLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex flex-1 justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default LoggedinLayout;
