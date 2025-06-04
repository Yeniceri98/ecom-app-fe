import { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions/actions';

const Products = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	// Redux
	const { products } = useSelector((state) => state.products);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	if (isLoading)
		return (
			<p className="text-lg text-gray-600 text-center py-8">It is loading...</p>
		);

	if (error)
		return (
			<div className="flex items-center justify-center gap-2 text-red-600 py-8">
				<FaExclamationTriangle className="text-slate-800 text-3xl" />
				<span className="text-lg">Error is occured: {error}</span>
			</div>
		);

	return (
		<div className="container mx-auto px-4 py-8">
			<h2 className="text-3xl font-bold text-gray-800 mb-6">Our Products</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{products &&
					products.map((product) => (
						<ProductCard key={product.id} {...product} />
					))}
			</div>
		</div>
	);
};
export default Products;
