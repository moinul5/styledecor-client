import { Link, useRouteError } from 'react-router';
import { motion } from 'motion/react';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-lg w-full p-10 text-center relative z-10"
      >
        <div className="flex justify-center mb-6 text-warning">
          <FiAlertTriangle size={64} />
        </div>
        
        <h1 className="text-6xl font-bold font-serif mb-4 gradient-text">
          {error?.status === 404 ? '404' : 'Oops!'}
        </h1>
        
        <h2 className="text-2xl font-semibold mb-2 text-base-content/90">
          {error?.status === 404 ? 'Page Not Found' : 'Something went wrong.'}
        </h2>
        
        <p className="text-base-content/60 mb-8 max-w-sm mx-auto">
          {error?.status === 404 
            ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
            : error?.statusText || error?.message || "An unexpected error occurred."}
        </p>

        <Link to="/" className="btn btn-primary px-8 shadow-lg shadow-primary/20">
          <FiHome size={18} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
