import { Alert, AlertTitle } from '@mui/material';

const PaypalPayment = () => {
	return (
		<div className="flex justify-center items-center">
			<Alert variant="filled" severity="warning" style={{ maxWidth: '400px' }}>
				<AlertTitle>Paypal Unavailable</AlertTitle>
				Paypal payment is currently unavailable. Please use another payment
				method...
			</Alert>
		</div>
	);
};

export default PaypalPayment;
