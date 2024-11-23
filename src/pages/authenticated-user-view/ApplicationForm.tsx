import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../components/ui/Input";

type FormData = {
  fullName: string;
  email: string;
  description: string;
  file: FileList;
};

const ApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle file submission
    const file = data.file?.[0];
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("description", data.description);
    if (file) {
      formData.append("file", file);
    }

    // Simulate API submission
    console.log("Form submitted", {
      fullName: data.fullName,
      email: data.email,
      description: data.description,
      file,
    });

    alert("Application submitted successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Submit Application
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Provide a brief description"
            {...register("description", {
              required: "Description is required",
            })}
            className={`mt-2 block w-full px-4 py-2 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none`}
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-2">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            Upload File
          </label>
          <input
            id="file"
            type="file"
            {...register("file", { required: "File is required" })}
            className={`mt-2 block w-full px-4 py-2 border ${
              errors.file ? "border-red-500" : "border-gray-300"
            } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none`}
          />
          {errors.file && (
            <p className="text-red-500 text-sm mt-2">{errors.file.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;
