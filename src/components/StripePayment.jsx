import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import PaymentForm from './PaymentForm';
import { createPaymentIntent } from '../redux/actions/stripeActions';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
	const dispatch = useDispatch();

	const { clientSecret } = useSelector((state) => state.auth);
	const { totalPrice } = useSelector((state) => state.carts);
	const { stripeLoading, stripeErrorMessage } = useSelector(
		(state) => state.loadingAndErrors
	);

	useEffect(() => {
		if (!clientSecret) {
			dispatch(createPaymentIntent(totalPrice, toast));
		}
	}, [clientSecret, dispatch, totalPrice]);

	return (
		<>
			{stripeLoading ? (
				<div className="flex items-center justify-center p-4">
					<div className="text-lg text-gray-600 animate-pulse">
						Loading payment system...
					</div>
				</div>
			) : stripeErrorMessage ? (
				<div className="p-4 text-center text-red-600 bg-red-100 rounded-lg">
					{stripeErrorMessage}
				</div>
			) : (
				clientSecret && (
					<Elements stripe={stripePromise} options={{ clientSecret }}>
						<PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
					</Elements>
				)
			)}
		</>
	);
};

export default StripePayment;
