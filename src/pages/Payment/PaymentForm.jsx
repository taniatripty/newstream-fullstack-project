

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import useAuth from '../../hooks/useAuth/useAuth';
import useAxiosSecure from '../../hooks/useAuth/useAxiosSecure/useAxiosSecure';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState('');
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false); // 👈 ADD THIS

  useEffect(() => {
    if (location.state) {
      const { price, duration } = location.state;
      setAmount(price);
      setDuration(duration);
      const amountInCents = price * 100;

      axiosSecure
        .post('/create-payment-intent', { amount: amountInCents })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [location.state, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret || processing) return;

    setProcessing(true); // 👈 DISABLE BUTTON WHILE PROCESSING

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        const transactionId = result.paymentIntent.id;

        // Calculate premiumTaken expiration
        const now = new Date();
        let premiumTaken;
        if (duration === 1) {
          premiumTaken = new Date(now.getTime() + 1 * 60000); // 1 minute
        } else {
          premiumTaken = new Date(now.getTime() + duration * 24 * 60 * 60 * 1000); // days
        }

        const paymentData = {
          email: user.email,
          amount,
          duration,
          transactionId,
          premiumTaken,
        };

        try {
          const res = await axiosSecure.patch('/users/premium', paymentData);
          console.log(res.data)

          if (res.data?.modifiedCount > 0 || res.data?.success) {
            await Swal.fire({
              icon: 'success',
              title: 'Payment Successful!',
              html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
              confirmButtonText: 'Start Reading',
            });

            navigate('/');
          } else {
            setError('Subscription update failed.');
          }
        } catch (err) {
          setError('Subscription update failed.');
          console.log(err)
        }
      }
      setProcessing(false); // ✅ RE-ENABLE button
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded" />
        <button
          type="submit"
          className="btn btn-primary text-black w-full"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? 'Processing...' : `Pay $${amount}`}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
