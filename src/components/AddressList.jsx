import {
	FaBuilding,
	FaCity,
	FaEdit,
	FaStreetView,
	FaTrash,
} from 'react-icons/fa';
import { TbBuildingEstate, TbMapPinCode } from 'react-icons/tb';
import { GiWorld } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserCheckoutAddress } from '../redux/actions/addressActions';

const AddressList = ({
	address,
	setSelectedAddress,
	setIsAddressModalOpen,
}) => {
	const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const handleAddressSelection = (address) => {
		dispatch(selectUserCheckoutAddress(address));
	};

	const updateAddressHandler = (address) => {
		setSelectedAddress(address);
		setIsAddressModalOpen(true);
	};

	const deleteAddressHandler = (address) => {
		setSelectedAddress(address);
	};

	return (
		<div className="flex flex-col gap-4 p-4">
			{address.map((addr) => (
				<div
					key={addr.addressId}
					className={`bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 ${
						selectedUserCheckoutAddress?.addressId === addr.addressId
							? 'bg-blue-50 border-2 border-blue-500'
							: ''
					}`}
					onClick={() => handleAddressSelection(addr)}>
					<div className="text-gray-600 mb-1 flex items-center gap-2">
						<FaBuilding /> {addr.buildingName}
					</div>
					<div className="text-gray-600 mb-1 flex items-center gap-2">
						<FaStreetView /> {addr.streetName}
					</div>
					{addr.state && (
						<div className="text-gray-600 mb-1 flex items-center gap-2">
							<TbBuildingEstate /> {`${addr.state}`}
						</div>
					)}
					<div className="text-gray-600 mb-1 flex items-center gap-2">
						<FaCity /> {addr.city}
					</div>
					<div className="text-gray-600 mb-1 flex items-center gap-2">
						<GiWorld />
						{addr.country}
					</div>
					<div className="text-gray-600 mb-1 flex items-center gap-2">
						<TbMapPinCode /> {addr.zipcode}
					</div>
					<div className="flex justify-end gap-4 mt-4">
						<button
							className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
							onClick={() => updateAddressHandler(addr)}>
							<FaEdit className="w-5 h-5" />
							Update
						</button>
						<button
							className="flex items-center gap-2 text-red-600 hover:text-red-800"
							onClick={() => deleteAddressHandler(addr)}>
							<FaTrash className="w-5 h-5" />
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AddressList;
