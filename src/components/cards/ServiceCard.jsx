import { Link } from 'react-router';
import { FiStar } from 'react-icons/fi';
import { motion } from 'motion/react';

const ServiceCard = ({ service, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card overflow-hidden group cursor-pointer flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden shrink-0">
        <img
          src={service.image}
          alt={service.service_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100/90 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/90 text-primary-content">
            {service.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-base-100/80 backdrop-blur-sm text-xs font-semibold">
          <FiStar className="text-yellow-400 fill-yellow-400" size={12} />
          {service.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <h3 className="text-xl font-bold font-serif mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {service.service_name}
        </h3>
        <p className="text-sm text-base-content/60 mb-6 line-clamp-2 grow">
          {service.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-bold gradient-text">${service.cost}</span>
            <span className="text-xs text-base-content/40 ml-1">/ {service.unit}</span>
          </div>
          <Link
            to={`/services/${service._id}`}
            className="btn btn-primary btn-sm px-5 shadow-md shadow-primary/20"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
