import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useDecorator from '../hooks/useDecorator';

const DecoratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isDecorator, isDecoratorLoading] = useDecorator();
  const location = useLocation();

  if (loading || isDecoratorLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (user && isDecorator) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default DecoratorRoute;
