import { Link } from 'react-router';
import { motion } from 'motion/react';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <motion.div
        className="text-center p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-bold gradient-text font-serif mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-base-content/60 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-lg px-8">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
