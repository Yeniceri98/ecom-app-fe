import { SlBasket } from 'react-icons/sl';

const CartEmpty = () => {
	return (
		<div className="flex flex-col items-center justify-center h-[400px] gap-6">
			<SlBasket size={64} className="text-gray-400" />
			<h2 className="text-2xl font-semibold text-gray-600">
				Your cart is empty
			</h2>
			<p className="text-gray-500">
				Add some items to your cart to continue shopping
			</p>
		</div>
	);
};

export default CartEmpty;
