import { Alert, AlertTitle } from '@mui/material';

const StripePayment = () => {
	return (
		<div className="flex justify-center items-center">
			<Alert variant="filled" severity="warning" style={{ maxWidth: '400px' }}>
				<AlertTitle>Stripe Unavailable</AlertTitle>
				Stripe payment is currently unavailable. Please use another payment
				method...
			</Alert>
		</div>
	);
};

export default StripePayment;
