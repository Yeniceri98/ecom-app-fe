import { MdShoppingCart } from 'react-icons/md';
import { MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Cart = () => {
	return (
		<div className="lg:px-14 sm:px-8 py-10">
			<div className="flex flex-col items-center mb-12">
				<h1 className="text-4xl font-bold flex items-center gap-3">
					<MdShoppingCart size={38} />
					Your Cart
				</h1>
				<p className="text-lg text-gray-600 mt-4">All your selected items</p>
			</div>
			<div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 items-center">
				<div className="md:col-span-2 justify-self-start text-lg lg:ps-4">
					Product
				</div>
				<div className="justify-self-center text-lg">Price</div>
				<div className="justify-self-center text-lg">Quantity</div>
				<div className="justify-self-center text-lg">Total</div>
			</div>

			<div className="border-t-[1.5px] border-slate-200 py-4 grid grid-cols-4 md:grid-cols-5">
				<div className="col-start-4 md:col-start-5 col-span-1 flex text-sm gap-1 flex-col w-full">
					<div className="flex justify-between w-full md:text-lg text-sm font-semibold">
						<span>Subtotal</span>
						<span>$400</span>
					</div>
					<p className="text-slate-500">
						Taxes and shipping calculated at checkout
					</p>
					<Link className="w-full mt-2" to={'/checkout'}>
						<button
							className="font-semibold w-full py-2 px-4 rounded-sm bg-blue-500 text-white flex items-center justify-center gap-2 hover:text-gray-300 transition duation-500"
							onClick={() => {}}>
							<MdShoppingCart size={20} />
							Checkout
						</button>
					</Link>
					<Link className="flex gap-2 items-center mt-2" to={'/products'}>
						<MdArrowBack size={18} />
						<span>Continue Shopping</span>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Cart;

// https://tailwindcss.com/docs/grid-template-columns
