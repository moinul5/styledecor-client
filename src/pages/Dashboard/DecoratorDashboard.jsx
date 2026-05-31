import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FiCalendar, FiCheckCircle, FiClock, FiDollarSign } from 'react-icons/fi';
import { motion } from 'motion/react';

const DecoratorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['decorator-bookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorators/assigned/${user.email}`);
      return res.data;
    }
  });

  const today = new Date().toDateString();

  const stats = {
    totalAssigned: bookings.length,
    completed: bookings.filter(b => b.status === 'completed').length,
    pending: bookings.filter(b => b.status === 'confirmed' || b.status === 'in-progress').length,
    todaysEvents: bookings.filter(b => new Date(b.bookingDate).toDateString() === today).length,
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold font-serif mb-8">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(n => <div key={n} className="h-32 skeleton-shimmer rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Projects', value: stats.totalAssigned, icon: <FiCalendar size={24} />, color: 'text-primary' },
    { title: 'Completed', value: stats.completed, icon: <FiCheckCircle size={24} />, color: 'text-success' },
    { title: 'In Progress/Pending', value: stats.pending, icon: <FiClock size={24} />, color: 'text-warning' },
    { title: "Today's Events", value: stats.todaysEvents, icon: <FiDollarSign size={24} />, color: 'text-secondary' }, // Just using dollar sign for visually distinct icon
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-serif mb-8">Decorator Overview</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-base-content/60">{stat.title}</h3>
                <div className={`p-3 rounded-xl bg-base-200 ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-3xl font-bold font-serif">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-6 h-96 flex flex-col items-center justify-center text-base-content/40">
          <p>Recent Project Photos / Portfolio View (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
};

export default DecoratorDashboard;
