import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'motion/react';
import { FiClock, FiMapPin, FiUser, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router';

const TodaysSchedule = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['decorator-bookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorators/assigned/${user.email}`);
      return res.data;
    }
  });

  const todayStr = new Date().toDateString();
  const todaysBookings = bookings.filter(b => new Date(b.bookingDate).toDateString() === todayStr);

  if (isLoading) return <div className="p-8">Loading schedule...</div>;

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-serif">Today's Schedule</h1>
          <span className="badge badge-primary">{todayStr}</span>
        </div>

        {todaysBookings.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <FiAlertCircle className="mx-auto text-4xl text-base-content/20 mb-4" />
            <h3 className="text-xl font-bold mb-2">Clear Schedule</h3>
            <p className="text-base-content/60 text-sm mb-6">You have no events scheduled for today. Enjoy your day or catch up on planning!</p>
            <Link to="/dashboard/assigned-projects" className="btn btn-outline btn-primary">
              View All Upcoming Projects
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {todaysBookings.map((b, idx) => (
              <motion.div
                key={b._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 flex flex-col md:flex-row gap-6 items-center"
              >
                {/* Timeline dot style */}
                <div className="hidden md:flex flex-col items-center justify-center shrink-0 w-16 border-r border-base-300 pr-6">
                  <span className="text-2xl font-bold text-primary">Now</span>
                  <span className="text-xs text-base-content/50 uppercase tracking-widest">{b.status}</span>
                </div>
                
                <div className="flex-1 w-full space-y-3">
                  <h3 className="text-xl font-bold font-serif text-primary">{b.serviceName}</h3>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-base-content/70">
                    <span className="flex items-center gap-2"><FiUser className="text-primary"/> {b.userName}</span>
                    <span className="flex items-center gap-2"><FiMapPin className="text-primary"/> {b.location}</span>
                    <span className="flex items-center gap-2"><FiClock className="text-primary"/> {b.serviceMode}</span>
                  </div>
                </div>
                
                <div className="shrink-0 w-full md:w-auto">
                  <Link to="/dashboard/assigned-projects" className="btn btn-primary btn-block md:btn-wide">
                    Manage Project
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaysSchedule;
