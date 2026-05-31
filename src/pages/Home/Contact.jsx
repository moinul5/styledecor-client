import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import CoverageMap from '../../components/shared/CoverageMap';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    // In a real app, send to backend or email service like EmailJS
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network
    toast.success('Message sent successfully! We will get back to you soon.');
    reset();
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-base-100">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-serif mb-4"
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h1>
          <p className="text-base-content/60 max-w-2xl mx-auto">
            Have a question about our services or want to discuss a custom event? 
            Reach out to our team and we'll help bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold font-serif mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label"><span className="label-text font-medium">First Name</span></label>
                  <input 
                    type="text" 
                    {...register('firstName', { required: 'First name is required' })} 
                    className="input input-bordered w-full bg-base-200/50 focus:border-primary" 
                    placeholder="John"
                  />
                  {errors.firstName && <span className="text-error text-xs mt-1">{errors.firstName.message}</span>}
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Last Name</span></label>
                  <input 
                    type="text" 
                    {...register('lastName', { required: 'Last name is required' })} 
                    className="input input-bordered w-full bg-base-200/50 focus:border-primary" 
                    placeholder="Doe"
                  />
                  {errors.lastName && <span className="text-error text-xs mt-1">{errors.lastName.message}</span>}
                </div>
              </div>

              <div>
                <label className="label"><span className="label-text font-medium">Email Address</span></label>
                <input 
                  type="email" 
                  {...register('email', { required: 'Email is required' })} 
                  className="input input-bordered w-full bg-base-200/50 focus:border-primary" 
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
              </div>

              <div>
                <label className="label"><span className="label-text font-medium">Subject</span></label>
                <input 
                  type="text" 
                  {...register('subject', { required: 'Subject is required' })} 
                  className="input input-bordered w-full bg-base-200/50 focus:border-primary" 
                  placeholder="How can we help?"
                />
                {errors.subject && <span className="text-error text-xs mt-1">{errors.subject.message}</span>}
              </div>

              <div>
                <label className="label"><span className="label-text font-medium">Message</span></label>
                <textarea 
                  {...register('message', { required: 'Message is required' })} 
                  className="textarea textarea-bordered w-full bg-base-200/50 focus:border-primary h-32" 
                  placeholder="Tell us about your event..."
                />
                {errors.message && <span className="text-error text-xs mt-1">{errors.message.message}</span>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary w-full shadow-lg shadow-primary/20"
              >
                {isSubmitting ? <span className="loading loading-spinner"></span> : <><FiSend /> Send Message</>}
              </button>
            </form>
          </motion.div>

          {/* Map and Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-card p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/20 text-primary shrink-0"><FiMapPin size={24}/></div>
                <div>
                  <h3 className="font-bold mb-1">Our Studio</h3>
                  <p className="text-sm text-base-content/60">123 Style Avenue<br/>New York, NY 10001</p>
                </div>
              </div>
              <div className="glass-card p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary/20 text-secondary shrink-0"><FiMail size={24}/></div>
                <div>
                  <h3 className="font-bold mb-1">Email Us</h3>
                  <p className="text-sm text-base-content/60">hello@styledecor.com<br/>support@styledecor.com</p>
                </div>
              </div>
              <div className="glass-card p-6 flex items-start gap-4 sm:col-span-2">
                <div className="p-3 rounded-xl bg-accent/20 text-accent shrink-0"><FiPhone size={24}/></div>
                <div>
                  <h3 className="font-bold mb-1">Call Us</h3>
                  <p className="text-sm text-base-content/60">+1 (555) 123-4567 — Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>
            </div>

            {/* Coverage Map */}
            <div>
              <h3 className="text-xl font-bold font-serif mb-4">Our Service Areas</h3>
              <CoverageMap />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
