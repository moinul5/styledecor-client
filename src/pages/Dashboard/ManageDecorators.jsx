import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FiTrash2, FiShield, FiUser, FiBriefcase } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';

const ManageDecorators = () => {
  const axiosSecure = useAxiosSecure();
  const [updatingId, setUpdatingId] = useState(null);

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingId(userId);
      await axiosSecure.patch(`/users/role/${userId}`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      refetch();
    } catch (error) {
      toast.error('Failed to update user role');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      setUpdatingId(userId);
      await axiosSecure.delete(`/users/${userId}`);
      toast.success('User deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete user');
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8">
        <div className="h-10 w-48 skeleton-shimmer mb-8"></div>
        <div className="h-[400px] w-full skeleton-shimmer rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-serif mb-8">Manage Users & Decorators</h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead className="bg-base-200/50">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Current Role</th>
                  <th>Assign Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-base-200/30 transition-colors">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                            <img 
                              src={u.photoURL || `https://ui-avatars.com/api/?name=${u.name}&background=d4af37&color=0f0f1a`} 
                              alt={u.name} 
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{u.name}</div>
                          <div className="text-sm opacity-50">{u.phone || 'No phone'}</div>
                        </div>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <div className={`badge badge-sm font-semibold capitalize flex items-center gap-1 ${
                        u.role === 'admin' ? 'badge-secondary' : 
                        u.role === 'decorator' ? 'badge-accent' : 'badge-ghost'
                      }`}>
                        {u.role === 'admin' && <FiShield size={12}/>}
                        {u.role === 'decorator' && <FiBriefcase size={12}/>}
                        {u.role === 'user' && <FiUser size={12}/>}
                        {u.role}
                      </div>
                    </td>
                    <td>
                      <select 
                        className="select select-bordered select-sm bg-base-200 w-32"
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        disabled={updatingId === u._id}
                      >
                        <option value="user">User</option>
                        <option value="decorator">Decorator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDeleteUser(u._id)}
                        disabled={updatingId === u._id || u.role === 'admin'} // prevent self delete roughly
                        className="btn btn-ghost btn-sm text-error hover:bg-error/20"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && (
            <div className="p-10 text-center text-base-content/50">
              No users found.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ManageDecorators;
