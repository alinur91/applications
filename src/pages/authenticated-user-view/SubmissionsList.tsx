import ApplicationsView from "../../components/common/ApplicationsView ";
import { useApplicationsContext } from "../../hooks/useApplicationsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SubmissionList = () => {
  const { applications, isLoading, isError, getApplications } =
    useApplicationsContext();
  const { loggedInUser } = useAuthContext();
  
  useEffect(() => {
    getApplications();
  }, [getApplications]);

  const loggedInUsersApplications = applications
    .filter((application) => application.email === loggedInUser?.email)
    .reverse();

  return (
    <ApplicationsView
      title="Your Submissions"
      applications={loggedInUsersApplications}
      isLoading={isLoading}
      isError={isError}
      emptyState={
        <>
          <p className="text-gray-800 text-lg">
            No submissions found. Start by submitting an application!
          </p>
          <Link
            to="/user/submit"
            className="text-blue-600 hover:underline font-semibold mt-4 inline-block"
          >
            Submit an Application
          </Link>
        </>
      }
    />
  );
};

export default SubmissionList;
