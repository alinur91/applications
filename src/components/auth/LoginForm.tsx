import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/authContext";

const LoginForm = () => {
  const { findUserByEmail, setLoggedInUserData } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (userData) => {
    const foundUser = findUserByEmail(userData.email);

    if (foundUser && foundUser.password === userData.password) {
      setLoggedInUserData(foundUser);
      navigate(foundUser.isManager ? "/manager/listing" : "/user/listing");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md bg-white p-6 rounded-md shadow-lg mx-auto"
    >
      <h1 className="text-lg font-bold mb-4">Login</h1>

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        register={register}
        validation={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email format",
          },
        }}
        error={errors.email?.message as string}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        register={register}
        validation={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        }}
        error={errors.password?.message as string}
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
