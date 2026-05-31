import { Navigate } from 'react-router';

// The Analytics charts have been integrated directly into the AdminDashboard for a better UX.
// We redirect this route to the Admin Dashboard to prevent dead links.
const Analytics = () => {
  return <Navigate to="/dashboard/admin" replace />;
};

export default Analytics;
