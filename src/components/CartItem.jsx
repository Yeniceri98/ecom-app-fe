import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import {
	decreaseCartQuantity,
	increaseCartQuantity,
	removeFromCart,
} from '../redux/actions/cartActions';
import { useDispatch } from 'react-redux';

const CartItem = ({
	productId,
	productName,
	image,
	description,
	quantity,
	price,
	discount,
	specialPrice,
}) => {
	const [currentQuantity, setCurrentQuantity] = useState(quantity);
	const dispatch = useDispatch();

	const handleQuantityDecrease = (cartItems) => {
		if (currentQuantity > 1) {
			const newQuantity = currentQuantity - 1;
			setCurrentQuantity(newQuantity);
			dispatch(decreaseCartQuantity(cartItems, newQuantity));
		}
	};

	const handleQuantityIncrease = (cartItems) => {
		console.log('cartItems', cartItems);
		dispatch(
			increaseCartQuantity(
				cartItems,
				toast,
				currentQuantity,
				setCurrentQuantity
			)
		);
	};

	const removeItemFromCart = (cartItems) => {
		dispatch(removeFromCart(cartItems, toast));
	};

	return (
		<div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-8 items-center border border-purple-300 py-4 px-1">
			<div className="md:col-span-2 justify-self-start flex flex-col gap-4">
				<div className="flex md:flex-row flex-col lg:gap-8 md:gap-6 gap-0">
					<h1 className="lg:text-[18px] text-md font-semibold px-2">
						{productName}
					</h1>
				</div>
				<div className="md:w-36 sm:w-24 w-12 mt-2">
					<img
						src={image}
						alt={productName}
						className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"
					/>
				</div>
				<div className="flex items-start gap-5 my-2 mx-2">
					<button
						className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-500 text-rose-600 rounded-md hover:bg-red-100 duration-200"
						onClick={() =>
							removeItemFromCart({
								image,
								productName,
								description,
								specialPrice,
								price,
								productId,
								quantity,
							})
						}>
						<FaRegTrashAlt size={16} className="mr-2" />
						Remove
					</button>
				</div>
			</div>
			<div className="justify-self-center lg:text-[18px] font-semibold">
				<p className="text-gray-600">${specialPrice}</p>
			</div>
			<div className="justify-self-center">
				<div className="flex items-center gap-2">
					<button
						className="px-2 py-1 border rounded-md"
						onClick={() =>
							handleQuantityDecrease({
								productId,
								productName,
								image,
								description,
								quantity,
								price,
								discount,
								specialPrice,
							})
						}>
						-
					</button>
					<span>{currentQuantity}</span>
					<button
						className="px-2 py-1 border rounded-md"
						onClick={() =>
							handleQuantityIncrease({
								productId,
								productName,
								image,
								description,
								quantity,
								price,
								discount,
								specialPrice,
							})
						}>
						+
					</button>
				</div>
			</div>
			<div className="justify-self-center lg:text-[18px] font-semibold">
				<p className="text-gray-600">{specialPrice * currentQuantity}</p>
			</div>
		</div>
	);
};

export default CartItem;
