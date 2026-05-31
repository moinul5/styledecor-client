import { useParams, Link, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../../api/axiosInstance';
import { motion } from 'motion/react';
import { FiStar, FiArrowLeft, FiCheckCircle, FiClock, FiMapPin, FiShield } from 'react-icons/fi';
import ServiceCard from '../../components/cards/ServiceCard';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: service, isLoading, isError } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/services/${id}`);
      return res.data;
    },
  });

  // Fetch some related services (same category)
  const { data: relatedData } = useQuery({
    queryKey: ['services', 'related', service?.category],
    enabled: !!service?.category,
    queryFn: async () => {
      const res = await axiosPublic.get(`/services?category=${service.category}&limit=3`);
      return res.data;
    },
  });
  
  const relatedServices = relatedData?.services?.filter(s => s._id !== id).slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 container-custom">
        <div className="h-96 skeleton-shimmer rounded-2xl mb-10 w-full"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-12 skeleton-shimmer rounded w-3/4"></div>
            <div className="h-4 skeleton-shimmer rounded w-full"></div>
            <div className="h-4 skeleton-shimmer rounded w-5/6"></div>
          </div>
          <div className="h-64 skeleton-shimmer rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-4">Service not found</h2>
          <button onClick={() => navigate('/services')} className="btn btn-primary">
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 pb-20">
      {/* Hero Image Section */}
      <section className="relative h-[40vh] min-h-[400px] w-full">
        <img 
          src={service.image} 
          alt={service.service_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/50 to-transparent" />
        
        <div className="absolute top-24 left-4 md:left-10 z-10">
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-circle btn-sm bg-base-200/50 backdrop-blur-md border-0 hover:bg-primary/80 transition-colors"
          >
            <FiArrowLeft size={18} />
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary uppercase tracking-wider">
                  {service.category}
                </span>
                <div className="flex items-center gap-1 text-sm font-semibold">
                  <FiStar className="text-yellow-400 fill-yellow-400" />
                  <span>{service.rating} Rating</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">{service.service_name}</h1>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-base-content/80 leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </div>
            </motion.div>

            {/* Features/Highlights (Mocked for visual enhancement) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-12 pt-10 border-t border-base-300 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="flex gap-4">
                <div className="mt-1 shrink-0 text-primary"><FiCheckCircle size={20} /></div>
                <div>
                  <h4 className="font-bold text-base-content">Premium Quality</h4>
                  <p className="text-sm text-base-content/60">We use only the highest grade materials for all setups.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 shrink-0 text-primary"><FiClock size={20} /></div>
                <div>
                  <h4 className="font-bold text-base-content">Punctual Setup</h4>
                  <p className="text-sm text-base-content/60">Guaranteed readiness before your event starts.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 shrink-0 text-primary"><FiMapPin size={20} /></div>
                <div>
                  <h4 className="font-bold text-base-content">Site Cleanup</h4>
                  <p className="text-sm text-base-content/60">Post-event dismantling and cleaning included.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 shrink-0 text-primary"><FiShield size={20} /></div>
                <div>
                  <h4 className="font-bold text-base-content">Satisfaction Guarantee</h4>
                  <p className="text-sm text-base-content/60">Full refund if the service doesn't meet expectations.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Booking Card) */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 md:p-8 sticky top-28"
            >
              <div className="text-center mb-6 border-b border-base-300 pb-6">
                <p className="text-sm text-base-content/50 uppercase tracking-widest font-semibold mb-2">Package Price</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold gradient-text font-serif">${service.cost}</span>
                  <span className="text-base-content/50">/ {service.unit}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 text-sm text-base-content/70">
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-primary" /> Dedicated Decorator Assigned
                </li>
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-primary" /> Initial Design Consultation
                </li>
                <li className="flex items-center gap-3">
                  <FiCheckCircle className="text-primary" /> All Materials Included
                </li>
              </ul>
              
              <Link 
                to={`/booking/${service._id}`}
                className="btn btn-primary btn-block btn-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                Book This Service
              </Link>
              
              <p className="text-xs text-center text-base-content/40 mt-4">
                Payment secured via Stripe. You won't be charged until confirmed.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mt-24">
            <h3 className="text-3xl font-bold font-serif mb-8 text-center">
              You Might Also <span className="gradient-text">Like</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((rs, idx) => (
                <ServiceCard key={rs._id} service={rs} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
