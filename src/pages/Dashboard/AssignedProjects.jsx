import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';
import { FiMapPin, FiCalendar, FiClock, FiUser, FiCheckCircle } from 'react-icons/fi';

const STATUS_OPTIONS = ['confirmed', 'in-progress', 'completed'];

const AssignedProjects = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [updatingId, setUpdatingId] = useState(null);

  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ['decorator-bookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorators/assigned/${user.email}`);
      return res.data;
    }
  });

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      setUpdatingId(bookingId);
      await axiosSecure.patch(`/decorators/project-status/${bookingId}`, { status: newStatus });
      toast.success(`Project status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) return <div className="p-8">Loading projects...</div>;

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-serif mb-8">Assigned Projects</h1>

        {bookings.length === 0 ? (
          <div className="glass-card p-12 text-center text-base-content/50">
            No projects assigned to you currently.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bookings.map((b, idx) => (
              <motion.div
                key={b._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 border-l-4"
                style={{
                  borderLeftColor: 
                    b.status === 'confirmed' ? '#38bdf8' :
                    b.status === 'in-progress' ? '#a855f7' :
                    b.status === 'completed' ? '#4ade80' : '#facc15'
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-serif mb-1">{b.serviceName}</h3>
                    <span className={`badge badge-sm font-semibold capitalize ${
                      b.status === 'confirmed' ? 'badge-info' :
                      b.status === 'in-progress' ? 'badge-primary' :
                      b.status === 'completed' ? 'badge-success' : 'badge-warning'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                  
                  {/* Status Updater */}
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-semibold text-base-content/50 uppercase mb-1">Update Status</span>
                    <select 
                      className="select select-bordered select-sm bg-base-200"
                      value={b.status}
                      onChange={(e) => handleStatusUpdate(b._id, e.target.value)}
                      disabled={updatingId === b._id || b.status === 'cancelled'}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-base-content/70 mt-6 bg-base-200/30 p-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    <FiUser className="text-primary shrink-0" />
                    <span className="truncate">Client: <span className="font-medium text-base-content">{b.userName}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-primary shrink-0" />
                    <span>Date: <span className="font-medium text-base-content">{new Date(b.bookingDate).toLocaleDateString()}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-primary shrink-0" />
                    <span className="truncate">Location: <span className="font-medium text-base-content">{b.location}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-primary shrink-0" />
                    <span>Mode: <span className="font-medium text-base-content capitalize">{b.serviceMode}</span></span>
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

export default AssignedProjects;
