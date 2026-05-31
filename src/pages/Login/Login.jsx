import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import axiosPublic from '../../api/axiosInstance';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'motion/react';

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Save/Update user in DB after successful login
  const saveUserToDB = async (user) => {
    try {
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL || '',
      };
      await axiosPublic.post('/users', userInfo);
    } catch (error) {
      console.error('Error saving user to DB:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password);
      await saveUserToDB(result.user);
      toast.success('Logged in successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Failed to login');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      await saveUserToDB(result.user);
      toast.success('Logged in with Google!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Google login failed');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden bg-base-100">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10 p-4"
      >
        <div className="glass-card p-8 md:p-10 rounded-3xl shadow-2xl border border-base-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-serif mb-2">Welcome Back</h1>
            <p className="text-sm text-base-content/60">Sign in to continue to StyleDecor</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="input input-bordered w-full pl-10 bg-base-200/50 focus:border-primary"
                  placeholder="Enter your email"
                />
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
              </div>
              {errors.email && <span className="text-error text-xs mt-1 block">{errors.email.message}</span>}
            </div>

            {/* Password Field */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required' })}
                  className="input input-bordered w-full pl-10 pr-10 bg-base-200/50 focus:border-primary"
                  placeholder="Enter your password"
                />
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-primary transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-error text-xs mt-1 block">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full mt-6 text-base font-semibold shadow-lg shadow-primary/20"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="divider text-xs text-base-content/40 my-6">OR CONTINUE WITH</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full bg-base-100 hover:bg-base-200 border-base-300 hover:border-base-300 text-base-content"
          >
            <FcGoogle size={22} />
            Sign in with Google
          </button>

          <p className="text-center text-sm text-base-content/60 mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
