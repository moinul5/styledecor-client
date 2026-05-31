import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axiosPublic from '../../api/axiosInstance';
import useAuth from '../../hooks/useAuth';
import CheckoutForm from '../../components/shared/CheckoutForm';
import { FiCalendar, FiMapPin, FiMonitor, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'motion/react';

// Use environment variable for Stripe key, with fallback for safety if not configured
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder_key_replace_me';
const stripePromise = loadStripe(stripeKey);

const Booking = () => {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Booking Form State
  const [bookingDate, setBookingDate] = useState('');
  const [location, setLocation] = useState('');
  const [serviceMode, setServiceMode] = useState('on-site');
  const [isFormValid, setIsFormValid] = useState(false);

  // Fetch Service Details
  const { data: service, isLoading } = useQuery({
    queryKey: ['service', serviceId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/services/${serviceId}`);
      return res.data;
    },
  });

  // Validate form to enable payment
  useEffect(() => {
    if (bookingDate && location) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [bookingDate, location]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Prepared Booking Payload to pass to CheckoutForm
  const bookingPayload = {
    userEmail: user?.email,
    userName: user?.displayName,
    serviceId: service?._id,
    serviceName: service?.service_name,
    bookingDate,
    location,
    serviceMode,
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-base-100 relative">
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/10 to-transparent" />
      
      <div className="container-custom relative z-10 max-w-5xl">
        <button 
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm mb-6 -ml-3 text-base-content/70 hover:text-primary"
        >
          <FiArrowLeft size={16} /> Back
        </button>

        <h1 className="text-3xl md:text-4xl font-bold font-serif mb-8">
          Complete Your <span className="gradient-text">Booking</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column: Form Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6 border-b border-base-300 pb-2">Event Details</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2"><FiCalendar /> Event Date</span>
                  </label>
                  <input 
                    type="date" 
                    className="input input-bordered w-full bg-base-200/50 focus:border-primary"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2"><FiMapPin /> Event Location (Address)</span>
                  </label>
                  <input 
                    type="text" 
                    className="input input-bordered w-full bg-base-200/50 focus:border-primary"
                    placeholder="Full street address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2"><FiMonitor /> Service Mode</span>
                  </label>
                  <select 
                    className="select select-bordered w-full bg-base-200/50 focus:border-primary"
                    value={serviceMode}
                    onChange={(e) => setServiceMode(e.target.value)}
                  >
                    <option value="on-site">On-Site (Physical Setup)</option>
                    <option value="virtual">Virtual (Consultation & Design)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 bg-base-200/30">
              <h3 className="font-bold mb-2">Important Information</h3>
              <ul className="text-sm text-base-content/60 space-y-2 list-disc pl-5">
                <li>Your booking is confirmed immediately after payment.</li>
                <li>A decorator will be assigned within 24 hours.</li>
                <li>Cancellations up to 7 days prior are fully refundable.</li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Order Summary & Payment */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="glass-card p-6 md:p-8 sticky top-28">
              <h2 className="text-xl font-bold mb-6 border-b border-base-300 pb-2">Order Summary</h2>
              
              <div className="flex gap-4 mb-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                  <img src={service?.image} alt={service?.service_name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight mb-1">{service?.service_name}</h3>
                  <p className="text-xs text-primary font-semibold uppercase">{service?.category}</p>
                </div>
              </div>

              <div className="space-y-3 border-b border-base-300 pb-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-base-content/60">Base Price</span>
                  <span className="font-medium">${service?.cost}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-base-content/60">Service Mode</span>
                  <span className="font-medium capitalize">{serviceMode}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-base-content/60">Taxes & Fees</span>
                  <span className="font-medium">Included</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-lg">Total Due</span>
                <span className="text-3xl font-bold gradient-text font-serif">${service?.cost}</span>
              </div>

              {/* Stripe Payment Area */}
              {!isFormValid ? (
                <div className="alert alert-warning text-sm rounded-xl py-3 border-none bg-warning/10 text-warning-content flex flex-col items-start gap-1">
                  <span className="font-semibold">Almost there!</span>
                  <span>Please fill in the event date and location to proceed with payment.</span>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-sm mb-4 uppercase tracking-wider text-base-content/50">Payment Details</h3>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm service={service} bookingDetails={bookingPayload} />
                  </Elements>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
