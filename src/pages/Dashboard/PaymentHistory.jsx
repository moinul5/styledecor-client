import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'motion/react';
import { FiDollarSign, FiCalendar, FiCheckCircle, FiFileText } from 'react-icons/fi';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ['payment-history', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold font-serif mb-8">Payment History</h1>
        <div className="space-y-4">
          {[1, 2, 3].map(n => (
            <div key={n} className="h-24 skeleton-shimmer rounded-xl w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 md:p-8 text-center text-error">
        <p>Failed to load payment history. Please try again later.</p>
      </div>
    );
  }

  const handleViewReceipt = (payment) => {
    // In a real app, this might open a modal or generate a PDF.
    // For now, we use a simple alert or toast (mock behavior).
    alert(`Receipt for Transaction: ${payment.transactionId}\nAmount: $${payment.amount}\nService: ${payment.bookingId?.serviceName || 'N/A'}\nDate: ${new Date(payment.paidAt).toLocaleDateString()}`);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold font-serif mb-8">Payment History</h1>

        {payments.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6 text-base-content/20">
              <FiDollarSign size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">No payments yet</h3>
            <p className="text-base-content/60 mb-6">You haven't made any payments for decoration services.</p>
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-base-200/50">
                  <tr>
                    <th>Transaction Details</th>
                    <th>Service / Booking</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th className="text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, idx) => (
                    <motion.tr 
                      key={payment._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-base-200/30"
                    >
                      <td>
                        <div className="font-mono text-xs font-semibold text-primary mb-1">
                          {payment.transactionId}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-base-content/60">
                          <FiCalendar /> {new Date(payment.paidAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <div className="font-bold">{payment.bookingId?.serviceName || 'Service N/A'}</div>
                        <div className="text-xs opacity-60 capitalize">Event: {new Date(payment.bookingId?.bookingDate).toLocaleDateString()}</div>
                      </td>
                      <td className="font-serif font-bold text-lg">
                        ${payment.amount}
                      </td>
                      <td>
                        <div className="badge badge-success badge-sm font-semibold flex gap-1 items-center">
                          <FiCheckCircle size={12}/> Paid
                        </div>
                      </td>
                      <td className="text-right">
                        <button 
                          onClick={() => handleViewReceipt(payment)}
                          className="btn btn-ghost btn-sm text-info hover:bg-info/20"
                          title="View Receipt"
                        >
                          <FiFileText size={16} /> <span className="hidden sm:inline">Receipt</span>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
