import { Skeleton } from '@mui/material';
import { FaAddressBook } from 'react-icons/fa';

const AddressInfo = () => {
	const isAddressExist = true;
	const isLoading = false;

	return (
		<div className="pt-4">
			{isAddressExist ? (
				<div className="relative p-6 rounded-lg max-w-md mx-auto">
					<h1 className="text-center font-bold text-2xl">Select Address</h1>

					{isLoading ? (
						<div className="space-y-4 mt-2">
							<Skeleton variant="text" width="80%" height={24} />
							<Skeleton variant="text" width="60%" height={24} />
							<Skeleton variant="rectangular" width="100%" height={60} />
							<Skeleton variant="text" width="40%" height={24} />
						</div>
					) : (
						<div className="space-y-4 pt-4">
							<p>Address List</p>
						</div>
					)}
				</div>
			) : (
				<div className="text-center p-6 rounded-lg max-w-md mx-auto">
					<FaAddressBook className="mx-auto text-4xl text-gray-600 mb-4" />
					<h2 className="text-xl font-semibold text-gray-600 mb-2">
						No Address Found
					</h2>
					<p className="text-gray-500">
						Please add a delivery address to continue
					</p>
				</div>
			)}
		</div>
	);
};

export default AddressInfo;

// https://mui.com/material-ui/react-skeleton/
