import { Route, Routes } from "react-router-dom";
import SubmissionsList from "./pages/authenticated-user-view/SubmissionsList";
import ApplicationForm from "./pages/authenticated-user-view/ApplicationForm";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ReviewApplication from "./pages/manager-view/ReviewApplication";
import ManagerDashboard from "./pages/manager-view/ManagerDashboard";
import CheckAuth from "./components/common/CheckAuth";
import LoggedinLayout from "./components/common/LoggedinLayout";
import NotFound from "./pages/not-found/NotFound";
import AuthLayout from "./components/common/AuthLayout";

const App = () => (
  <Routes>
    <Route
      path="/auth"
      element={
        <CheckAuth>
          <AuthLayout />
        </CheckAuth>
      }
    >
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
    <Route
      path="/user"
      element={
        <CheckAuth>
          <LoggedinLayout />
        </CheckAuth>
      }
    >
      <Route index element={<SubmissionsList />} />
      <Route path="listing" element={<SubmissionsList />} />
      <Route path="submit" element={<ApplicationForm />} />
    </Route>
    <Route
      path="/manager"
      element={
        <CheckAuth>
          <LoggedinLayout />
        </CheckAuth>
      }
    >
      <Route index element={<ManagerDashboard />} />
      <Route path="listing" element={<ManagerDashboard />} />
      <Route path="review/:id" element={<ReviewApplication />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
