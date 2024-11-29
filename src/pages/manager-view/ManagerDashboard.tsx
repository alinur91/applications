import { useApplicationsContext } from "../../hooks/useApplicationsContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ApplicationsView from "../../components/common/ApplicationsView ";

const ManagerDashboard = () => {
  const { applications, isLoading, isError, getApplications } =
    useApplicationsContext();
  const navigate = useNavigate();

  useEffect(() => {
    getApplications();
  }, [getApplications]);

  const handleRowClick = (id: string) => {
    navigate(`/manager/review/${id}`);
  };

  return (
    <ApplicationsView
      title="All Submissions"
      applications={applications.slice().reverse()}
      isLoading={isLoading}
      isError={isError}
      emptyState={
        <p className="text-gray-800 text-lg">No submissions found.</p>
      }
      onRowClick={handleRowClick}
    />
  );
};

export default ManagerDashboard;
