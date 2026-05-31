import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'motion/react';
import { FiCalendar, FiMapPin, FiClock, FiCheckCircle, FiDollarSign } from 'react-icons/fi';
import { Link } from 'react-router';

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ['bookings', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/user/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold font-serif mb-8">My Bookings</h1>
        <div className="space-y-4">
          {[1, 2, 3].map(n => (
            <div key={n} className="h-32 skeleton-shimmer rounded-xl w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 md:p-8 text-center text-error">
        <p>Failed to load your bookings. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold font-serif mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6 text-base-content/20">
              <FiCalendar size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">No bookings yet</h3>
            <p className="text-base-content/60 mb-6">You haven't booked any decoration services yet.</p>
            <Link to="/services" className="btn btn-primary">Browse Services</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking, idx) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 border-l-4 overflow-hidden relative"
                style={{
                  borderLeftColor: 
                    booking.status === 'pending' ? '#facc15' :
                    booking.status === 'confirmed' ? '#38bdf8' :
                    booking.status === 'in-progress' ? '#a855f7' :
                    booking.status === 'completed' ? '#4ade80' : '#ef4444'
                }}
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  
                  {/* Info Section */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold font-serif">{booking.serviceName}</h3>
                      <div className={`badge badge-sm font-semibold capitalize ${
                        booking.status === 'pending' ? 'badge-warning' :
                        booking.status === 'confirmed' ? 'badge-info' :
                        booking.status === 'in-progress' ? 'badge-primary' :
                        booking.status === 'completed' ? 'badge-success' : 'badge-error'
                      }`}>
                        {booking.status}
                      </div>
                      <div className={`badge badge-sm font-semibold capitalize ${
                        booking.paymentStatus === 'paid' ? 'badge-success' : 'badge-ghost'
                      }`}>
                        {booking.paymentStatus}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-base-content/70">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-primary shrink-0" />
                        <span>Date: <span className="font-medium text-base-content">{new Date(booking.bookingDate).toLocaleDateString()}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-primary shrink-0" />
                        <span className="truncate">Location: <span className="font-medium text-base-content">{booking.location}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="text-primary shrink-0" />
                        <span>Mode: <span className="font-medium text-base-content capitalize">{booking.serviceMode}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCheckCircle className="text-primary shrink-0" />
                        <span>Decorator: <span className="font-medium text-base-content">{booking.decoratorAssigned || 'Pending Assignment'}</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Action/Price Section */}
                  <div className="flex flex-col justify-between items-start md:items-end md:pl-6 md:border-l border-base-300">
                    <p className="text-xs text-base-content/40 mb-2 md:mb-0">
                      Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                    
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-4 mt-auto">
                      {booking.paymentStatus === 'unpaid' && booking.status !== 'cancelled' ? (
                        <Link to={`/booking/${booking.serviceId}`} className="btn btn-primary btn-sm px-6 shadow-md shadow-primary/20">
                          <FiDollarSign /> Pay Now
                        </Link>
                      ) : (
                        <button className="btn btn-outline btn-sm px-6" disabled>
                          Receipt
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
