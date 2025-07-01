import { Skeleton } from '@mui/material';
import { useState } from 'react';
import { FaAddressBook } from 'react-icons/fa';
import AddAddressForm from './AddAddressForm';
import { useSelector } from 'react-redux';
import AddressList from './AddressList';
import AddressInfoModal from './AddressInfoModal';

const AddressInfo = ({ address }) => {
	const isAddressExist = address?.length > 0;
	const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState('');

	const { addressLoading } = useSelector((state) => state.loadingAndErrors);

	const addNewAddressHandler = () => {
		setSelectedAddress(''); // clearing purpose
		setIsAddressModalOpen(true);
	};

	return (
		<div className="pt-4">
			{isAddressExist ? (
				<div className="relative p-6 rounded-lg max-w-md mx-auto">
					<h1 className="text-center font-bold text-2xl">Select Address</h1>

					{addressLoading ? (
						<div className="space-y-4 mt-2">
							<Skeleton variant="text" width="80%" height={24} />
							<Skeleton variant="text" width="60%" height={24} />
							<Skeleton variant="rectangular" width="100%" height={60} />
							<Skeleton variant="text" width="40%" height={24} />
						</div>
					) : (
						<>
							<div className="space-y-4 pt-4">
								<AddressList
									address={address}
									setSelectedAddress={setSelectedAddress}
									setIsAddressModalOpen={setIsAddressModalOpen}
								/>
							</div>
							{address.length > 0 && (
								<div className="flex items-center justify-center mt-4">
									<button
										className="py-2 px-4 bg-blue-600 text-white"
										onClick={addNewAddressHandler}>
										Add More Address
									</button>
								</div>
							)}
						</>
					)}
				</div>
			) : !isAddressModalOpen ? (
				<div className="text-center p-6 rounded-lg max-w-md mx-auto">
					<FaAddressBook className="mx-auto text-4xl text-gray-600 mb-4" />
					<h2 className="text-xl font-semibold text-gray-600 mb-2">
						No Address Found
					</h2>
					<p className="text-gray-500">
						Please add a delivery address to continue
					</p>
					<button
						className="px-4 py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-400 transition-all duration-300"
						onClick={addNewAddressHandler}>
						Add Address
					</button>
				</div>
			) : null}

			<AddressInfoModal
				open={isAddressModalOpen}
				setOpen={setIsAddressModalOpen}>
				<AddAddressForm
					address={selectedAddress}
					setIsAddressModalOpen={setIsAddressModalOpen}
				/>
			</AddressInfoModal>
		</div>
	);
};

export default AddressInfo;

// https://mui.com/material-ui/react-skeleton/
// https://headlessui.com/react/dialog
