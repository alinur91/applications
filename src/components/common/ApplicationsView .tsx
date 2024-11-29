import { Application } from "../../types/applicationContext";
import ApplicationsTable from "../ui/ApplicationsTable ";

const ApplicationsView = ({
  title,
  applications,
  isLoading,
  isError,
  emptyState,
  onRowClick,
}: {
  title: string;
  applications: Application[];
  isLoading: boolean;
  isError: Error | null;
  emptyState: React.ReactNode;
  onRowClick?: (id: string) => void;
}) => {
  if (isLoading) {
    return (
      <div className="text-center text-blue-600 text-lg font-medium animate-pulse mt-6">
        Loading submissions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 text-lg font-medium mt-6">
        {isError.message || "An error occurred. Please try again later."}
      </div>
    );
  }

  if (applications.length === 0) {
    return <div className="text-center text-gray-600 mt-6">{emptyState}</div>;
  }

  return (
    <div className="w-full max-w-7xl bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h1>
      <ApplicationsTable applications={applications} onRowClick={onRowClick} />
    </div>
  );
};

export default ApplicationsView;
