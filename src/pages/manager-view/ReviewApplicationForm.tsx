import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApplicationsContext } from "../../hooks/useApplicationsContext";
import { Application, ApplicationStatus } from "../../types/applicationContext";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import { useAuthContext } from "../../hooks/useAuthContext";

const ReviewApplication = () => {
  const [application, setApplication] = useState<Application | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatingLoading, setUpdatingLoading] = useState(false);
  const [getApplicationLoading, setGetApplicationLoading] = useState(false);
  const navigate = useNavigate();
  const { getApplicationById, updateApplication } = useApplicationsContext();
  const { loggedInUser } = useAuthContext();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Application>({
    defaultValues: {
      fullName: application?.fullName,
      email: application?.email,
      description: application?.description,
      file: application?.file,
      status: application?.status,
    },
  });

  useEffect(() => {
    setGetApplicationLoading(true);

    getApplicationById(id as string)
      .then((application) => {
        setApplication(application);
        if (application) reset(application);
      })
      .catch((e) => setError(e.message))
      .finally(() => setGetApplicationLoading(false));
  }, [getApplicationById, id, reset]);

  const onSubmit: SubmitHandler<Application> = async (data) => {
    setUpdatingLoading(true); // Set loading to true when starting the update
    const updatedApplication = {
      ...application,
      status: data.status,
      comment: data.comment,
      reviewedBy: loggedInUser?.email,
    };

    try {
      await updateApplication(application?.id as string, updatedApplication); // Wait for update
      navigate("/manager/listing");
    } catch (updateError) {
      console.error("Error updating application:", updateError);
      setError(
        "An error occurred while updating the application. Please try again."
      );
    } finally {
      setUpdatingLoading(false); // Set loading to false after the operation is complete
    }
  };

  if (getApplicationLoading) {
    return (
      <div className="text-center text-blue-600 text-lg font-medium animate-pulse mt-6">
        Loading application form...
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center">
        <p className="text-red-600 text-lg font-medium">{error}</p>
        <Link
          to="/manager/listing"
          className="text-blue-600 hover:underline font-semibold mt-2 block"
        >
          Go back to Applications List
        </Link>
      </div>
    );

  if (!getApplicationLoading && !error && application)
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Review Application
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            disabled
            label="Full Name"
            name="fullName"
            register={register}
          />
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
              disabled
              id="description"
              {...register("description")}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none cursor-not-allowed bg-gray-100 text-gray-500"
              rows={4}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              File
            </label>
            <input
              disabled
              id="file"
              {...register("file")}
              type="file"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none cursor-not-allowed bg-gray-100"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Comment
            </label>
            <textarea
              id="comment"
              {...register("comment", {
                required: "Comment is required",
                minLength: {
                  value: 2,
                  message: "Comment must be at least 2 characters",
                },
              })}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              rows={4}
              placeholder="Enter your comments here"
            />
            {errors.comment && (
              <p className="text-red-500 text-sm mt-2">
                {errors.comment.message}
              </p>
            )}
          </div>

          <select
            defaultValue={application.status}
            id="status"
            {...register("status")}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          >
            {Object.values(ApplicationStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <div>
            <button
              type="submit"
              disabled={updatingLoading} // Disable button when loading
              className={`w-full py-2 px-4 text-white font-semibold rounded-md transition duration-200 ${
                updatingLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {updatingLoading ? "Updating..." : "Update Application"}
            </button>
          </div>
        </form>
      </div>
    );
};

export default ReviewApplication;
