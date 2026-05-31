import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';
import useDecorator from '../../hooks/useDecorator';
import { FiMenu, FiX, FiLogOut, FiGrid, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isDecorator] = useDecorator();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logOut();
    setDropdownOpen(false);
  };

  const getDashboardPath = () => {
    if (isAdmin) return '/dashboard/admin';
    if (isDecorator) return '/dashboard/decorator';
    return '/dashboard/profile';
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/coverage-map', label: 'Coverage' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const linkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'text-primary'
        : 'text-base-content/70 hover:text-primary'
    }`;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-base-200/80 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-primary/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-base-100 font-bold text-lg font-serif">S</span>
              </div>
              <div>
                <span className="text-xl font-bold font-serif gradient-text">Style</span>
                <span className="text-xl font-bold font-serif text-base-content">Decor</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-base-300/50 transition-colors duration-300"
                  >
                    <div className="avatar">
                      <div className="w-9 h-9 rounded-full ring-2 ring-primary/30">
                        <img
                          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'U'}&background=d4af37&color=0f0f1a&bold=true`}
                          alt={user.displayName}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-base-content/80 max-w-[120px] truncate">
                      {user.displayName || 'User'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl bg-base-200 border border-base-300 shadow-2xl shadow-black/30 overflow-hidden"
                      >
                        <div className="p-3 border-b border-base-300">
                          <p className="text-sm font-semibold truncate">{user.displayName}</p>
                          <p className="text-xs text-base-content/50 truncate">{user.email}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to={getDashboardPath()}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-base-content/70 hover:bg-base-300 hover:text-base-content transition-colors"
                          >
                            <FiGrid size={16} />
                            Dashboard
                          </Link>
                          <Link
                            to="/dashboard/profile"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-base-content/70 hover:bg-base-300 hover:text-base-content transition-colors"
                          >
                            <FiUser size={16} />
                            My Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-error/70 hover:bg-error/10 hover:text-error transition-colors w-full"
                          >
                            <FiLogOut size={16} />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="btn btn-ghost btn-sm text-base-content/70 hover:text-primary font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary btn-sm px-6 font-medium shadow-lg shadow-primary/20"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden btn btn-ghost btn-sm"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-base-200 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl gradient-gold flex items-center justify-center">
                      <span className="text-base-100 font-bold font-serif">S</span>
                    </div>
                    <span className="text-lg font-bold font-serif gradient-text">StyleDecor</span>
                  </Link>
                  <button onClick={() => setMobileOpen(false)} className="btn btn-ghost btn-sm">
                    <FiX size={20} />
                  </button>
                </div>

                {user && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-base-300/50 mb-6">
                    <div className="avatar">
                      <div className="w-11 h-11 rounded-full ring-2 ring-primary/30">
                        <img
                          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'U'}&background=d4af37&color=0f0f1a&bold=true`}
                          alt={user.displayName}
                        />
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-semibold truncate">{user.displayName}</p>
                      <p className="text-xs text-base-content/50 truncate">{user.email}</p>
                    </div>
                  </div>
                )}

                <nav className="space-y-1 mb-8">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-base-content/70 hover:bg-base-300/50 hover:text-base-content'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>

                {user ? (
                  <div className="space-y-1 pt-6 border-t border-base-300">
                    <Link
                      to={getDashboardPath()}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-base-content/70 hover:bg-base-300/50"
                    >
                      <FiGrid size={16} /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error/70 hover:bg-error/10 w-full"
                    >
                      <FiLogOut size={16} /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 pt-6 border-t border-base-300">
                    <Link to="/login" className="btn btn-outline btn-primary btn-block">
                      Sign In
                    </Link>
                    <Link to="/register" className="btn btn-primary btn-block">
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
