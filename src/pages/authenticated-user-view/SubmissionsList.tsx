import { Link } from "react-router-dom";
import { useApplicationsContext } from "../../hooks/useApplicationsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import ApplicationsTable from "../../components/ui/ApplicationsTable ";

const SubmissionsList = () => {
  const { applications } = useApplicationsContext();
  const { loggedInUser } = useAuthContext();

  const loggedInUsersApplications = applications
    .filter((application) => application.email === loggedInUser?.email)
    .reverse();

  const doUsersSubmissionsExist = loggedInUsersApplications.length > 0;

  if (!doUsersSubmissionsExist)
    return (
      <div className="text-gray-600 mt-4 text-center">
        <p>No submissions found. Start by submitting an application!</p>
        <Link
          to="/user/submit"
          className="text-blue-600 hover:underline font-semibold mt-2 block"
        >
          Submit an Application
        </Link>
      </div>
    );

  return (
    <div className="w-full max-w-7xl bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Your Submissions
      </h1>
      <ApplicationsTable applications={loggedInUsersApplications} />
    </div>
  );
};

export default SubmissionsList;
