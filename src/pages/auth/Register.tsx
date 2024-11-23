import { Link } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";

const Register = () => {
  return (
    <>
      <h2 className="text-xl font-bold text-center mb-4">Create an Account</h2>
      <RegisterForm />
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </>
  );
};

export default Register;
