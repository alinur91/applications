import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <>
      <LoginForm />
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
    </>
  );
};

export default Login;
