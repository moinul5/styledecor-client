import { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const CheckoutForm = ({ service, bookingDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  // 1. Fetch Client Secret when component mounts
  useEffect(() => {
    if (service?.cost > 0) {
      axiosSecure
        .post('/payments/create-payment-intent', { price: service.cost })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.error('Error fetching client secret', err));
    }
  }, [service.cost, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    setProcessing(true);
    setError('');

    // 2. Validate card details
    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      setProcessing(false);
      return;
    }

    // 3. Confirm Payment on Stripe
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'anonymous',
          email: user?.email || 'anonymous',
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      try {
        // 4. Save Booking to Database First
        const bookingRes = await axiosSecure.post('/bookings', bookingDetails);
        const bookingId = bookingRes.data.insertedId;

        // 5. Save Payment Info to Database (Updates booking to 'confirmed' & 'paid')
        const paymentInfo = {
          bookingId: bookingId,
          transactionId: paymentIntent.id,
          amount: service.cost,
          paidBy: user.email,
        };

        await axiosSecure.post('/payments', paymentInfo);
        
        toast.success(`Payment successful! TXN ID: ${paymentIntent.id}`);
        setProcessing(false);
        navigate('/dashboard/my-bookings');
      } catch (err) {
        console.error('Error saving booking or payment:', err);
        setError('Payment succeeded but failed to save booking in database. Please contact support.');
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-base-200/50 p-4 rounded-xl border border-base-300">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#e0e0e0',
                '::placeholder': {
                  color: '#888888',
                },
                iconColor: '#d4af37',
              },
              invalid: {
                color: '#ef4444',
                iconColor: '#ef4444',
              },
            },
          }}
        />
      </div>

      {error && <p className="text-error text-sm mt-2">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-primary w-full shadow-lg shadow-primary/20 mt-4"
      >
        {processing ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          `Pay $${service.cost}`
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
