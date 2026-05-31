import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FiMail, FiPhone, FiStar, FiAward, FiEdit2 } from 'react-icons/fi';
import { motion } from 'motion/react';

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser, isLoading, refetch } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="skeleton-shimmer h-64 w-full rounded-2xl mb-8"></div>
        <div className="skeleton-shimmer h-8 w-1/3 mb-4"></div>
        <div className="skeleton-shimmer h-4 w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-serif mb-8">My Profile</h1>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card overflow-hidden"
        >
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-primary/40 to-secondary/40 relative">
            <div className="absolute inset-0 bg-base-100/30 backdrop-blur-sm" />
          </div>

          {/* Content */}
          <div className="px-6 sm:px-10 pb-10 relative">
            {/* Avatar */}
            <div className="flex justify-between items-start -mt-16 mb-6">
              <div className="w-32 h-32 rounded-full ring-4 ring-base-100 overflow-hidden bg-base-200">
                <img
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=d4af37&color=0f0f1a&bold=true`}
                  alt={user?.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="btn btn-primary btn-sm px-6">
                <FiEdit2 size={14} /> Edit Profile
              </button>
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold font-serif">{user?.displayName}</h2>
                <span className={`badge ${dbUser?.role === 'admin' ? 'badge-secondary' : dbUser?.role === 'decorator' ? 'badge-accent' : 'badge-primary'} badge-sm`}>
                  {dbUser?.role || 'user'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-base-content/50 border-b border-base-300 pb-2">Contact Information</h3>
                  
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-base-200/50">
                    <div className="w-10 h-10 rounded-lg bg-base-300 flex items-center justify-center text-primary shrink-0">
                      <FiMail size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-base-content/50 font-medium">Email Address</p>
                      <p className="text-sm font-semibold truncate">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-xl bg-base-200/50">
                    <div className="w-10 h-10 rounded-lg bg-base-300 flex items-center justify-center text-primary shrink-0">
                      <FiPhone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-base-content/50 font-medium">Phone Number</p>
                      <p className="text-sm font-semibold">{dbUser?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-base-content/50 border-b border-base-300 pb-2">Account Details</h3>
                  
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-base-200/50">
                    <div className="w-10 h-10 rounded-lg bg-base-300 flex items-center justify-center text-primary shrink-0">
                      <FiAward size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-base-content/50 font-medium">Member Since</p>
                      <p className="text-sm font-semibold">
                        {dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>

                  {dbUser?.role === 'decorator' && (
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-base-200/50">
                      <div className="w-10 h-10 rounded-lg bg-base-300 flex items-center justify-center text-primary shrink-0">
                        <FiStar size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-base-content/50 font-medium">Specialty</p>
                        <p className="text-sm font-semibold">{dbUser?.specialty || 'General Decoration'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
