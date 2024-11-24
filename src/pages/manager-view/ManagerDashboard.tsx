import { useNavigate } from "react-router-dom";
import { useApplicationsContext } from "../../hooks/useApplicationsContext";
import ApplicationsTable from "../../components/ui/ApplicationsTable ";

const ManagerDashboard = () => {
  const { applications } = useApplicationsContext();
  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/manager/review/${id}`);
  };

  const doSubmissionsExist = applications.length > 0;

  if (!doSubmissionsExist)
    return (
      <p className="text-gray-600 mt-4 text-center">No submissions found!</p>
    );

  return (
    <div className="w-full max-w-7xl bg-white p-6 shadow-md rounded-lg">
      <ApplicationsTable
        applications={applications.slice().reverse()}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default ManagerDashboard;
