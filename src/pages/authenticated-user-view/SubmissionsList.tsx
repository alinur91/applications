import { useApplicationsContext } from "../../hooks/useApplicationsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ApplicationStatus } from "../../types/applicationContext";

const SubmissionsList = () => {
  const { applications } = useApplicationsContext();
  const { loggedInUser } = useAuthContext();

  const statusClassMap: Record<ApplicationStatus, string> = {
    [ApplicationStatus.Pending]: "text-yellow-600",
    [ApplicationStatus.Approved]: "text-green-600",
    [ApplicationStatus.Rejected]: "text-red-600",
  };

  const filteredApplications = applications.filter(
    (application) => application.submittedUsersEmail === loggedInUser?.email
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Your Submissions
      </h1>

      {filteredApplications.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left text-gray-600 font-medium">
                  Full Name
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">
                  Description
                </th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-700">
                    {application.fullName}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {application.email}
                  </td>
                  <td className="px-4 py-2 text-gray-700 truncate max-w-xs">
                    {application.description}
                  </td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      statusClassMap[application.status]
                    }`}
                  >
                    {application.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 mt-4 text-center">
          No submissions found. Start by submitting an application!
        </p>
      )}
    </div>
  );
};

export default SubmissionsList;
