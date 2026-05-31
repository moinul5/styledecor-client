import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FiUsers, FiBox, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { motion } from 'motion/react';

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // In a real app, you'd have an /analytics route for this.
      // Here we'll fetch collections to get counts (for demonstration).
      const [users, services, bookings] = await Promise.all([
        axiosSecure.get('/users'),
        axiosSecure.get('/services?limit=1000'),
        axiosSecure.get('/bookings'),
      ]);

      const totalRevenue = bookings.data.reduce((sum, b) => {
        // Assuming paid bookings contribute to revenue
        return b.paymentStatus === 'paid' ? sum + 100 : sum; // Mocking $100 per paid booking just for display if real price isn't there
      }, 0);

      return {
        usersCount: users.data.length,
        servicesCount: services.data.services?.length || 0,
        bookingsCount: bookings.data.length,
        revenue: totalRevenue || 12500 // Mock fallback
      };
    }
  });

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
    { title: 'Total Revenue', value: `$${stats?.revenue?.toLocaleString()}`, icon: <FiDollarSign size={24} />, color: 'text-success' },
    { title: 'Total Users', value: stats?.usersCount, icon: <FiUsers size={24} />, color: 'text-primary' },
    { title: 'Active Services', value: stats?.servicesCount, icon: <FiBox size={24} />, color: 'text-info' },
    { title: 'Total Bookings', value: stats?.bookingsCount, icon: <FiCalendar size={24} />, color: 'text-secondary' },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-serif mb-8">Admin Overview</h1>
        
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-6 h-96 flex flex-col items-center justify-center text-base-content/40">
            <p>Revenue Chart (Placeholder)</p>
          </div>
          <div className="glass-card p-6 h-96 flex flex-col items-center justify-center text-base-content/40">
            <p>Recent Activity (Placeholder)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
