import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = ['Wedding', 'Home Interior', 'Corporate', 'Birthday', 'Festival', 'Outdoor'];

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm();

  const { data: servicesData, isLoading, refetch } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const res = await axiosSecure.get('/services?limit=1000');
      return res.data;
    }
  });

  const services = servicesData?.services || [];

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setValue('service_name', service.service_name);
      setValue('category', service.category);
      setValue('cost', service.cost);
      setValue('image', service.image);
      setValue('description', service.description);
    } else {
      setEditingService(null);
      reset();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      if (editingService) {
        await axiosSecure.patch(`/services/${editingService._id}`, data);
        toast.success('Service updated successfully');
      } else {
        await axiosSecure.post('/services', data);
        toast.success('Service added successfully');
      }
      refetch();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save service');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await axiosSecure.delete(`/services/${id}`);
      toast.success('Service deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  if (isLoading) return <div className="p-8">Loading services...</div>;

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold font-serif">Manage Services</h1>
          <button onClick={() => handleOpenModal()} className="btn btn-primary shadow-lg shadow-primary/20">
            <FiPlus size={18} /> Add New Service
          </button>
        </div>

        {/* Services Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-base-200/50">
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s._id} className="hover:bg-base-200/30">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={s.image} alt={s.service_name} className="object-cover" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{s.service_name}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge badge-ghost badge-sm">{s.category}</span></td>
                    <td className="font-semibold text-primary">${s.cost}</td>
                    <td className="text-right space-x-2">
                      <button onClick={() => handleOpenModal(s)} className="btn btn-ghost btn-sm text-info hover:bg-info/20">
                        <FiEdit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(s._id)} className="btn btn-ghost btn-sm text-error hover:bg-error/20">
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleCloseModal}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-2xl relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-base-100/90 backdrop-blur-md p-6 border-b border-base-300 flex justify-between items-center z-20">
                <h3 className="text-xl font-bold font-serif">{editingService ? 'Edit Service' : 'Add New Service'}</h3>
                <button onClick={handleCloseModal} className="btn btn-ghost btn-sm btn-circle"><FiX size={20}/></button>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label"><span className="label-text font-medium">Service Name</span></label>
                    <input type="text" {...register('service_name', { required: true })} className="input input-bordered w-full bg-base-200/50 focus:border-primary" />
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">Category</span></label>
                    <select {...register('category', { required: true })} className="select select-bordered w-full bg-base-200/50 focus:border-primary">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">Cost ($)</span></label>
                    <input type="number" {...register('cost', { required: true, valueAsNumber: true })} className="input input-bordered w-full bg-base-200/50 focus:border-primary" />
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">Image URL</span></label>
                    <input type="url" {...register('image', { required: true })} className="input input-bordered w-full bg-base-200/50 focus:border-primary" />
                  </div>
                </div>
                
                <div>
                  <label className="label"><span className="label-text font-medium">Description</span></label>
                  <textarea {...register('description', { required: true })} className="textarea textarea-bordered w-full bg-base-200/50 focus:border-primary h-24" />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={handleCloseModal} className="btn btn-ghost">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : 'Save Service'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageServices;
