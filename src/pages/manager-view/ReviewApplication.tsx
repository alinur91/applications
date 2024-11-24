import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApplicationsContext } from "../../hooks/useApplicationsContext";
import { Application, ApplicationStatus } from "../../types/applicationContext";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/ui/Input";
import { useAuthContext } from "../../hooks/useAuthContext";

const ReviewApplication = () => {
  const [application, setApplication] = useState<Application | null>(null);
  const [error, setError] = useState(null);
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
    getApplicationById(id as string)
      .then((application) => {
        setApplication(application);
        if (application) reset(application);
      })
      .catch((e) => setError(e.message));
  }, [getApplicationById, id, reset]);

  const onSubmit: SubmitHandler<Application> = async (data) => {
    const updatedApplication = {
      ...application,
      status: data.status,
      comment: data.comment,
      reviewedBy: loggedInUser?.email,
    };

    updateApplication(application?.id as string, updatedApplication);
    navigate("/manager/listing");
  };

  if (error)
    return (
      <div className="text-center">
        <p className="text-gray-600 mt-4">Submitted application not found!</p>
        <Link
          to="/manager/listing"
          className="text-blue-600 hover:underline font-semibold mt-2 block"
        >
          Go back to Applications List
        </Link>
      </div>
    );

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      {!error && application && (
        <>
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
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
              >
                Update Application
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ReviewApplication;
