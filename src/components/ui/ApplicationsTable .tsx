import { useAuthContext } from "../../hooks/useAuthContext";
import { Application, ApplicationStatus } from "../../types/applicationContext";

const ApplicationsTable = ({
  applications,
  onRowClick,
  additionalColumns = [],
}: {
  applications: Application[];
  onRowClick?: (id: string) => void;
  additionalColumns?: {
    header: string;
    render: (app: Application) => React.ReactNode;
  }[];
}) => {
  const { isManager } = useAuthContext();

  const statusClassMap: Record<ApplicationStatus, string> = {
    [ApplicationStatus.Pending]: "text-yellow-600",
    [ApplicationStatus.Approved]: "text-green-600",
    [ApplicationStatus.Rejected]: "text-red-600",
  };

  return (
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
              File
            </th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">
              Comments
            </th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">
              Reviewed by
            </th>
            {/* Add extra columns */}
            {additionalColumns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-2 text-left text-gray-600 font-medium"
              >
                {col.header}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-gray-600 font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr
              key={application.id}
              className={`border-b hover:bg-gray-50 ${
                isManager ? "cursor-pointer" : "cursor-auto"
              }`}
              onClick={() => onRowClick?.(application.id)}
            >
              <td className="px-4 py-2 text-gray-700">
                {application.fullName}
              </td>
              <td className="px-4 py-2 text-gray-700">{application.email}</td>
              <td className="px-4 py-2 text-gray-700 truncate max-w-xs">
                {application.description}
              </td>
              <td className="px-4 py-2 text-gray-700">
                {application.file as string}
              </td>
              <td className="px-4 py-2 text-gray-700">
                {application.comment || "Not Reviewed Yet"}
              </td>
              <td className="px-4 py-2 text-gray-700">
                {application.reviewedBy || "Not Reviewed Yet"}
              </td>
              {additionalColumns.map((col, idx) => (
                <td key={idx} className="px-4 py-2 text-gray-700">
                  {col.render(application)}
                </td>
              ))}
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
  );
};
export default ApplicationsTable;
