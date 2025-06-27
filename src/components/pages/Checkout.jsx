import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';

const Checkout = () => {
	const steps = ['Address', 'Payment Method', 'Order Summary', 'Payment'];

	const [activeStep, setActiveStep] = useState(0);

	return (
		<Box sx={{ width: '100%', py: 4 }}>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	);
};

export default Checkout;

// https://mui.com/material-ui/react-stepper/
