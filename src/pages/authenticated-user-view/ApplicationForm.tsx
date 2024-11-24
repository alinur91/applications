import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../components/ui/Input";
import { Application, ApplicationStatus } from "../../types/applicationContext";
import { useApplicationsContext } from "../../hooks/useApplicationsContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const ApplicationForm = () => {
  const { submitNewApplication } = useApplicationsContext();
  const { loggedInUser } = useAuthContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Application>({
    defaultValues: {
      fullName: loggedInUser?.fullName,
      email: loggedInUser?.email,
    },
  });

  const onSubmit: SubmitHandler<Application> = async (data) => {
    let file = "";
    // Ensure file is a FileList and extract the first file's name
    if (data.file instanceof FileList && data.file[0]) {
      file = data.file[0].name;
    }

    const newApplication = {
      ...data,
      status: ApplicationStatus.Pending,
      file,
    };
    submitNewApplication(newApplication);
    navigate("/user/listing");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Submit Application
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input disabled label="Full Name" name="fullName" register={register} />

        <Input
          disabled
          label="Email"
          name="email"
          type="email"
          register={register}
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
