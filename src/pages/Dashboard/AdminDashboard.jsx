import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FiUsers, FiBox, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { motion } from 'motion/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';

const COLORS = ['#d4af37', '#0f0f1a', '#facc15', '#38bdf8', '#a855f7', '#4ade80'];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading: loadingStats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/analytics/stats');
      return res.data;
    }
  });

  const { data: demandData = [], isLoading: loadingDemand } = useQuery({
    queryKey: ['admin-demand'],
    queryFn: async () => {
      const res = await axiosSecure.get('/analytics/service-demand');
      return res.data;
    }
  });

  const { data: revenueData = [], isLoading: loadingRevenue } = useQuery({
    queryKey: ['admin-revenue'],
    queryFn: async () => {
      const res = await axiosSecure.get('/analytics/revenue');
      return res.data;
    }
  });

  if (loadingStats || loadingDemand || loadingRevenue) {
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold font-serif mb-8">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[1, 2, 3, 4].map(n => <div key={n} className="h-32 skeleton-shimmer rounded-xl"></div>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 skeleton-shimmer rounded-xl"></div>
          <div className="h-96 skeleton-shimmer rounded-xl"></div>
        </div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Revenue', value: `$${stats?.totalRevenue?.toLocaleString() || 0}`, icon: <FiDollarSign size={24} />, color: 'text-success' },
    { title: 'Total Users', value: stats?.usersCount || 0, icon: <FiUsers size={24} />, color: 'text-primary' },
    { title: 'Active Services', value: stats?.servicesCount || 0, icon: <FiBox size={24} />, color: 'text-info' },
    { title: 'Total Bookings', value: stats?.bookingsCount || 0, icon: <FiCalendar size={24} />, color: 'text-secondary' },
  ];

  // Mock data for Bookings over time (since backend endpoint wasn't explicitly defined for this array)
  const bookingsOverTime = [
    { name: 'Jan', bookings: 12 },
    { name: 'Feb', bookings: 19 },
    { name: 'Mar', bookings: 15 },
    { name: 'Apr', bookings: 22 },
    { name: 'May', bookings: 28 },
    { name: 'Jun', bookings: 25 },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto">
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 h-[400px] flex flex-col"
          >
            <h3 className="font-bold mb-6 border-b border-base-300 pb-2">Revenue Overview</h3>
            <div className="flex-1 w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
                  <XAxis dataKey="name" stroke="#a6adbb" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a6adbb" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <RechartsTooltip 
                    cursor={{fill: '#ffffff0d'}}
                    contentStyle={{ backgroundColor: '#0f0f1a', border: '1px solid #1a1a2e', borderRadius: '8px' }}
                    itemStyle={{ color: '#d4af37' }}
                  />
                  <Bar dataKey="revenue" fill="#d4af37" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Service Demand Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 h-[400px] flex flex-col"
          >
            <h3 className="font-bold mb-6 border-b border-base-300 pb-2">Service Category Demand</h3>
            <div className="flex-1 w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demandData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={5}
                  >
                    {demandData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f0f1a', border: '1px solid #1a1a2e', borderRadius: '8px' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Bookings Trend Chart */}
        <div className="mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 h-[400px] flex flex-col"
          >
            <h3 className="font-bold mb-6 border-b border-base-300 pb-2">Bookings Trend (Last 6 Months)</h3>
            <div className="flex-1 w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bookingsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
                  <XAxis dataKey="name" stroke="#a6adbb" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a6adbb" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f0f1a', border: '1px solid #1a1a2e', borderRadius: '8px' }}
                    itemStyle={{ color: '#38bdf8' }}
                  />
                  <Line type="monotone" dataKey="bookings" stroke="#38bdf8" strokeWidth={3} dot={{ r: 6, fill: '#38bdf8' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
