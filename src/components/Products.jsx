import { FaExclamationTriangle } from 'react-icons/fa';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './Filter';
import useProductFilter from './useProductFilter';
import { getAllCategories } from '../redux/actions/categoryActions';
import { useEffect } from 'react';

const Products = () => {
	// Redux
	const { products } = useSelector((state) => state.products);
	const { categories } = useSelector((state) => state.categories);
	const {
		productLoading,
		categoryLoading,
		productErrorMessage,
		categoryErrorMessage,
	} = useSelector((state) => state.loadingAndErrors);

	// Product
	useProductFilter();

	// Category
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllCategories());
	}, [dispatch]);

	if (productLoading)
		return (
			<div className="flex items-center justify-center gap-3 py-8">
				<div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
				<p className="text-lg text-gray-600">Loading products...</p>
			</div>
		);

	if (productErrorMessage)
		return (
			<div className="flex items-center justify-center gap-2 text-red-600 py-8">
				<FaExclamationTriangle className="text-slate-800 text-3xl" />
				<span className="text-lg">Error occurred: {productErrorMessage}</span>
			</div>
		);

	return (
		<div className="container mx-auto px-4 py-8">
			<Filter categories={categories ? categories : []} />
			{categoryLoading && <div className="mb-6">Loading categories...</div>}
			{categoryErrorMessage && (
				<div className="mb-6 text-red-600">
					Error loading categories: {categoryErrorMessage}
				</div>
			)}
			{products?.length > 0 ? (
				<>
					<h2 className="text-3xl font-bold text-gray-800 mb-6">
						Our Products
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{products.map((product) => (
							<ProductCard key={product.id} {...product} />
						))}
					</div>
				</>
			) : (
				<div className="flex items-center justify-center py-8">
					<p className="text-xl text-red-600">No products found!</p>
				</div>
			)}
		</div>
	);
};

export default Products;
