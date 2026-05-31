import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';
import { FiCheck, FiX } from 'react-icons/fi';

const STATUS_OPTIONS = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [editingId, setEditingId] = useState(null);
  
  // States for the edit form
  const [editStatus, setEditStatus] = useState('');
  const [editDecorator, setEditDecorator] = useState('');

  // Fetch all bookings
  const { data: bookings = [], isLoading: loadingBookings, refetch } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings');
      return res.data;
    }
  });

  // Fetch all users to filter decorators
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ['admin-users-decorators'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const decorators = users.filter(u => u.role === 'decorator');

  const startEditing = (booking) => {
    setEditingId(booking._id);
    setEditStatus(booking.status);
    setEditDecorator(booking.decoratorAssigned || '');
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveBooking = async (id) => {
    try {
      await axiosSecure.patch(`/bookings/status/${id}`, {
        status: editStatus,
        decoratorAssigned: editDecorator
      });
      toast.success('Booking updated successfully');
      refetch();
      setEditingId(null);
    } catch (error) {
      toast.error('Failed to update booking');
    }
  };

  if (loadingBookings || loadingUsers) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-bold font-serif mb-8">Manage All Bookings</h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full whitespace-nowrap">
              <thead className="bg-base-200/50">
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Date & Location</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Assigned Decorator</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => {
                  const isEditing = editingId === b._id;

                  return (
                    <tr key={b._id} className="hover:bg-base-200/30">
                      <td>
                        <div className="font-bold">{b.userName}</div>
                        <div className="text-xs opacity-60">{b.userEmail}</div>
                      </td>
                      <td>
                        <div className="font-semibold">{b.serviceName}</div>
                        <div className="text-xs opacity-60 capitalize">{b.serviceMode}</div>
                      </td>
                      <td>
                        <div>{new Date(b.bookingDate).toLocaleDateString()}</div>
                        <div className="text-xs opacity-60 max-w-[150px] truncate" title={b.location}>{b.location}</div>
                      </td>
                      <td>
                        {isEditing ? (
                          <select 
                            className="select select-bordered select-sm bg-base-200 w-32"
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                          >
                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        ) : (
                          <div className={`badge badge-sm font-semibold capitalize ${
                            b.status === 'pending' ? 'badge-warning' :
                            b.status === 'confirmed' ? 'badge-info' :
                            b.status === 'in-progress' ? 'badge-primary' :
                            b.status === 'completed' ? 'badge-success' : 'badge-error'
                          }`}>
                            {b.status}
                          </div>
                        )}
                      </td>
                      <td>
                        <div className={`badge badge-sm font-semibold capitalize ${b.paymentStatus === 'paid' ? 'badge-success' : 'badge-ghost'}`}>
                          {b.paymentStatus}
                        </div>
                      </td>
                      <td>
                        {isEditing ? (
                          <select 
                            className="select select-bordered select-sm bg-base-200 w-40"
                            value={editDecorator}
                            onChange={(e) => setEditDecorator(e.target.value)}
                          >
                            <option value="">-- Unassigned --</option>
                            {decorators.map(d => (
                              <option key={d._id} value={d.name}>{d.name}</option>
                            ))}
                          </select>
                        ) : (
                          <span className={b.decoratorAssigned ? 'font-medium' : 'opacity-50 italic text-sm'}>
                            {b.decoratorAssigned || 'Unassigned'}
                          </span>
                        )}
                      </td>
                      <td className="text-right">
                        {isEditing ? (
                          <div className="flex justify-end gap-2">
                            <button onClick={() => saveBooking(b._id)} className="btn btn-sm btn-circle btn-success text-white">
                              <FiCheck size={16} />
                            </button>
                            <button onClick={cancelEditing} className="btn btn-sm btn-circle btn-ghost text-error">
                              <FiX size={16} />
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => startEditing(b)} className="btn btn-sm btn-outline btn-primary">
                            Edit Status
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="p-10 text-center opacity-50">No bookings found.</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageBookings;
