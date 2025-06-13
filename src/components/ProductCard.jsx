import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import ProductViewModal from './ProductViewModal';
import truncateTexts from './utils/truncateTexts';

const ProductCard = ({
	productId,
	productName,
	image,
	description,
	quantity,
	price,
	discount,
	specialPrice,
}) => {
	const [openProductViewModal, setOpenProductViewModal] = useState(false);
	const [selectedViewProduct, setSelectedViewProduct] = useState('');
	const isAvailable = quantity && Number(quantity) > 0;

	const handleProductView = (product) => {
		setSelectedViewProduct(product);
		setOpenProductViewModal(true);
	};

	return (
		<div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300 flex flex-col h-full">
			<div
				onClick={() =>
					handleProductView({
						productId,
						productName,
						image,
						description,
						quantity,
						price,
						discount,
						specialPrice,
					})
				}
				className="w-full h-3/5 overflow-hidden aspect-auto">
				<img
					className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105 object-cover object-center"
					src={image}
					alt={productName}
				/>
			</div>
			<div className="p-4">
				<h2
					onClick={() =>
						handleProductView({
							productId,
							productName,
							image,
							description,
							quantity,
							price,
							discount,
							specialPrice,
						})
					}
					className="text-lg font-semibold mb-2 cursor-pointer">
					{productName}
				</h2>
			</div>
			<div className="min-h-20 max-h-20">
				<p className="text-gray-600 text-md p-4">
					{truncateTexts(description)}
				</p>
			</div>

			<div className="mt-auto p-4">
				<div className="flex justify-between items-center">
					{discount ? (
						<>
							<div className="flex flex-row">
								<span className="text-gray-500 line-through mb-1 p-1">
									${price.toFixed(2)}
								</span>
								<span className="text-xl font-bold text-indigo-600 p-1">
									${specialPrice.toFixed(2)}
								</span>
							</div>
							<span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
								{discount}% OFF
							</span>
						</>
					) : (
						<span className="text-xl font-medium text-gray-800 p-1">
							${price.toFixed(2)}
						</span>
					)}
					<button
						disabled={!isAvailable}
						onClick={() => {}}
						className={`bg-blue-500 m-1 ${
							isAvailable
								? ' opacity-100 hover:bg-blue-600 text-white p-2 px-3 rounded-lg flex items-center'
								: 'opacity-50 text-white p-2 px-3 rounded-lg flex items-center'
						} `}>
						<FaShoppingCart className="mr-2" />
						{isAvailable ? 'Add to Cart' : 'Stock Out'}
					</button>
				</div>
			</div>
			<ProductViewModal
				isOpen={openProductViewModal}
				setIsOpen={setOpenProductViewModal}
				product={selectedViewProduct}
				isAvailable={isAvailable}
			/>
		</div>
	);
};

export default ProductCard;
