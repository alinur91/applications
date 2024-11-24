import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/authContext";

const RegisterForm = () => {
  const { registerAccount, isEmailRegistered, setLoggedInUserData } =
    useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (userData) => {
    if (isEmailRegistered(userData.email)) {
      alert("User already exists in the database!");
    } else {
      registerAccount(userData);
      setLoggedInUserData(userData);
      navigate(userData.isManager ? "/manager/listing" : "/user/listing");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md bg-white p-6 rounded-md shadow-lg mx-auto"
    >
      <h1 className="text-lg font-bold mb-4">Register</h1>

      <Input
        label="Full Name"
        name="fullName"
        placeholder="Enter your full name"
        register={register}
        validation={{
          required: "Full Name is required",
          minLength: {
            value: 3,
            message: "Full Name must be at least 3 characters long",
          },
        }}
        error={errors.fullName?.message}
      />

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
        error={errors.email?.message}
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
        error={errors.password?.message}
      />
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" {...register("isManager")} className="mr-2" />
          Are you a manager?
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
