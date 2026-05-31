import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FiDollarSign, FiTrendingUp, FiAward } from 'react-icons/fi';
import { motion } from 'motion/react';

const Earnings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['decorator-bookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorators/assigned/${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <div className="p-8">Loading earnings...</div>;

  // Mock calculation: 20% commission on completed projects
  const completedProjects = bookings.filter(b => b.status === 'completed');
  
  // Since we don't have the exact 'cost' stored in the Booking model directly in our backend 
  // (we only stored serviceId/serviceName in Booking, though we could fetch it), 
  // we will mock a flat rate of $150 per completed project for the visual display.
  const FLAT_RATE_PER_PROJECT = 150;
  
  const totalEarnings = completedProjects.length * FLAT_RATE_PER_PROJECT;
  const pendingEarnings = bookings.filter(b => b.status === 'in-progress' || b.status === 'confirmed').length * FLAT_RATE_PER_PROJECT;

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold font-serif mb-8">My Earnings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-xl bg-primary/20 text-primary"><FiDollarSign size={24}/></div>
              <h3 className="text-sm font-semibold text-base-content/60 uppercase">Total Earned</h3>
            </div>
            <p className="text-4xl font-bold font-serif text-primary">${totalEarnings}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-xl bg-warning/20 text-warning"><FiTrendingUp size={24}/></div>
              <h3 className="text-sm font-semibold text-base-content/60 uppercase">Expected (Pending)</h3>
            </div>
            <p className="text-4xl font-bold font-serif">${pendingEarnings}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-xl bg-success/20 text-success"><FiAward size={24}/></div>
              <h3 className="text-sm font-semibold text-base-content/60 uppercase">Completed Jobs</h3>
            </div>
            <p className="text-4xl font-bold font-serif">{completedProjects.length}</p>
          </motion.div>
        </div>

        <h2 className="text-xl font-bold font-serif mb-4 border-b border-base-300 pb-2">Completed Projects Ledger</h2>
        <div className="glass-card overflow-hidden">
          <table className="table w-full">
            <thead className="bg-base-200/50">
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Completion Date</th>
                <th className="text-right">Earned</th>
              </tr>
            </thead>
            <tbody>
              {completedProjects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 opacity-50">No completed projects yet.</td>
                </tr>
              ) : (
                completedProjects.map(p => (
                  <tr key={p._id} className="hover:bg-base-200/30">
                    <td className="font-semibold">{p.serviceName}</td>
                    <td>{p.userName}</td>
                    <td>{new Date(p.bookingDate).toLocaleDateString()}</td>
                    <td className="text-right font-bold text-success">+${FLAT_RATE_PER_PROJECT}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
