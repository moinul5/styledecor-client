import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import axiosPublic from '../../api/axiosInstance';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiImage, FiPhone } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'motion/react';

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Save/Update user in DB
  const saveUserToDB = async (userInfo) => {
    try {
      await axiosPublic.post('/users', userInfo);
    } catch (error) {
      console.error('Error saving user to DB:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      // Create user in Firebase
      const result = await createUser(data.email, data.password);
      
      // Update Firebase Profile
      await updateUserProfile(data.name, data.photoURL);

      // Save to MongoDB
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: data.photoURL,
        phone: data.phone,
      };
      await saveUserToDB(userInfo);

      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Failed to create account');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL || '',
      };
      await saveUserToDB(userInfo);
      toast.success('Registered with Google!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Google signup failed');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden bg-base-100">
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10 p-4"
      >
        <div className="glass-card p-8 md:p-10 rounded-3xl shadow-2xl border border-base-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-serif mb-2">Create Account</h1>
            <p className="text-sm text-base-content/60">Join StyleDecor to book premium services</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Name Field */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="input input-bordered w-full pl-10 bg-base-200/50 focus:border-primary"
                  placeholder="Full Name"
                />
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
              </div>
              {errors.name && <span className="text-error text-xs mt-1 block">{errors.name.message}</span>}
            </div>

            {/* Email Field */}
            <div>
              <div className="relative">
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="input input-bordered w-full pl-10 bg-base-200/50 focus:border-primary"
                  placeholder="Email Address"
                />
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
              </div>
              {errors.email && <span className="text-error text-xs mt-1 block">{errors.email.message}</span>}
            </div>

            {/* Phone Field */}
            <div>
              <div className="relative">
                <input
                  type="tel"
                  {...register('phone')}
                  className="input input-bordered w-full pl-10 bg-base-200/50 focus:border-primary"
                  placeholder="Phone Number (Optional)"
                />
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
              </div>
            </div>

            {/* Photo URL Field */}
            <div>
              <div className="relative">
                <input
                  type="url"
                  {...register('photoURL')}
                  className="input input-bordered w-full pl-10 bg-base-200/50 focus:border-primary"
                  placeholder="Photo URL (Optional)"
                />
                <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                      message: 'Must contain at least one uppercase letter and one special character'
                    }
                  })}
                  className="input input-bordered w-full pl-10 pr-10 bg-base-200/50 focus:border-primary"
                  placeholder="Password"
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
              {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : 'Sign Up'}
            </button>
          </form>

          <div className="divider text-xs text-base-content/40 my-6">OR CONTINUE WITH</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full bg-base-100 hover:bg-base-200 border-base-300 hover:border-base-300 text-base-content"
          >
            <FcGoogle size={22} />
            Sign up with Google
          </button>

          <p className="text-center text-sm text-base-content/60 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
