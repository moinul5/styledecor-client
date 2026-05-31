import { Outlet, NavLink, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import useDecorator from '../hooks/useDecorator';
import {
  FiHome,
  FiGrid,
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiBarChart2,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiClipboard,
  FiClock,
  FiTrendingUp,
} from 'react-icons/fi';
import { useState } from 'react';

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isDecorator] = useDecorator();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  // Build menu items based on role
  const getMenuItems = () => {
    if (isAdmin) {
      return [
        { path: '/dashboard/admin', label: 'Dashboard', icon: <FiHome /> },
        { path: '/dashboard/manage-services', label: 'Manage Services', icon: <FiGrid /> },
        { path: '/dashboard/manage-bookings', label: 'Manage Bookings', icon: <FiCalendar /> },
        { path: '/dashboard/manage-decorators', label: 'Manage Decorators', icon: <FiUsers /> },
        { path: '/dashboard/analytics', label: 'Analytics', icon: <FiBarChart2 /> },
      ];
    }
    if (isDecorator) {
      return [
        { path: '/dashboard/decorator', label: 'Dashboard', icon: <FiHome /> },
        { path: '/dashboard/assigned-projects', label: 'Assigned Projects', icon: <FiClipboard /> },
        { path: '/dashboard/todays-schedule', label: "Today's Schedule", icon: <FiClock /> },
        { path: '/dashboard/earnings', label: 'Earnings', icon: <FiTrendingUp /> },
      ];
    }
    // Regular user
    return [
      { path: '/dashboard/profile', label: 'My Profile', icon: <FiUser /> },
      { path: '/dashboard/my-bookings', label: 'My Bookings', icon: <FiCalendar /> },
      { path: '/dashboard/payment-history', label: 'Payment History', icon: <FiDollarSign /> },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen flex bg-base-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-base-200 border-r border-base-300 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-base-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold gradient-text font-serif">StyleDecor</h2>
              <button
                className="btn btn-ghost btn-sm lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <FiX size={20} />
              </button>
            </div>
            {/* User info */}
            <div className="mt-4 flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'U'}&background=d4af37&color=0f0f1a`}
                    alt={user?.displayName}
                  />
                </div>
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold truncate">{user?.displayName || 'User'}</p>
                <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary border-l-4 border-primary'
                      : 'text-base-content/70 hover:bg-base-300 hover:text-base-content'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-base-300 space-y-2">
            <NavLink
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-base-content/70 hover:bg-base-300 hover:text-base-content transition-all duration-200"
            >
              <FiHome className="text-lg" />
              <span className="text-sm font-medium">Back to Home</span>
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-error/70 hover:bg-error/10 hover:text-error transition-all duration-200 w-full"
            >
              <FiLogOut className="text-lg" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-base-200/80 backdrop-blur-md border-b border-base-300 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              className="btn btn-ghost btn-sm lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={20} />
            </button>
            <div className="flex items-center gap-4 ml-auto">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user?.displayName}</p>
                <p className="text-xs text-base-content/50">
                  {isAdmin ? 'Administrator' : isDecorator ? 'Decorator' : 'Member'}
                </p>
              </div>
              <div className="avatar">
                <div className="w-9 rounded-full">
                  <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'U'}&background=d4af37&color=0f0f1a`}
                    alt={user?.displayName}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          className="flex-1 p-4 md:p-6 lg:p-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
