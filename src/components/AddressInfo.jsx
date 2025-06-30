import { DialogPanel, Dialog, DialogBackdrop } from '@headlessui/react';
import { Skeleton } from '@mui/material';
import { useState } from 'react';
import { FaAddressBook, FaTimes } from 'react-icons/fa';
import AddAddressForm from './AddAddressForm';
import { useSelector } from 'react-redux';

const AddressInfo = () => {
	const isAddressExist = false;
	const { addressLoading } = useSelector((state) => state.loadingAndErrors);

	const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState('');

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
						<div className="space-y-4 pt-4">
							<p>Address List</p>
						</div>
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

			<Dialog
				open={isAddressModalOpen}
				onClose={() => setIsAddressModalOpen(false)}
				className="relative z-5">
				<DialogBackdrop className="fixed inset-0 bg-black/30" />
				<div className="fixed inset-0 flex w-screen items-center justify-center p-4 mt-24">
					<DialogPanel className="max-w-lg space-y-4 border bg-white p-12 relative">
						<div className="absolute top-4 right-4">
							<button onClick={() => setIsAddressModalOpen(false)}>
								<FaTimes />
							</button>
						</div>
						<div className="flex justify-center">
							<AddAddressForm
								address={selectedAddress}
								setIsAddressModalOpen={setIsAddressModalOpen}
							/>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</div>
	);
};

export default AddressInfo;

// https://mui.com/material-ui/react-skeleton/
// https://headlessui.com/react/dialog
