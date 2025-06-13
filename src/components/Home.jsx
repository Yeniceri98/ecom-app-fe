import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import useProductFilter from '../hooks/useProductFilter';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
	const productsState = useSelector((state) => state.products);
	useProductFilter();

	// Guard against null products
	const products = productsState?.products || [];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<div className="bg-indigo-700 text-white py-16">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Welcome to Our Store
					</h1>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Discover amazing products at unbeatable prices. Shop now and enjoy
						exclusive deals!
					</p>
					<Link
						to="/products"
						className="bg-white text-indigo-700 hover:bg-indigo-100 font-bold py-3 px-6 rounded-lg transition duration-300">
						Browse All Products
					</Link>
				</div>
			</div>

			{/* Featured Products Section */}
			<div className="container mx-auto py-12 px-4">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-3xl font-bold text-gray-800">
						Featured Products
					</h2>
					<Link
						to="/products"
						className="text-indigo-600 hover:text-indigo-800 font-medium">
						View All →
					</Link>
				</div>

				{products.length > 0 ? (
					<Swiper
						modules={[Navigation, Pagination, Autoplay]}
						spaceBetween={20}
						slidesPerView={1}
						grabCursor="true"
						scrollbar={{ draggable: true }}
						navigation
						pagination={{ clickable: true }}
						autoplay={{ delay: 10000, disableOnInteraction: false }}
						breakpoints={{
							// when window width is >= 640px
							640: {
								slidesPerView: 2,
							},
							// when window width is >= 768px
							768: {
								slidesPerView: 3,
							},
							// when window width is >= 1024px
							1024: {
								slidesPerView: 4,
							},
						}}
						className="product-swiper">
						{products.map((product) => (
							<SwiperSlide key={product.productId} className="pb-12">
								<div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transform transition-transform hover:scale-[1.02] hover:shadow-lg">
									<div className="aspect-[4/3] overflow-hidden relative">
										<img
											src={product.image}
											alt={product.productName}
											className="w-full h-full object-cover object-center transition-transform hover:scale-105"
										/>
										{product.discount && (
											<div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
												{product.discount}% OFF
											</div>
										)}
									</div>
									<div className="p-4 flex flex-col flex-grow">
										<h3 className="text-lg font-semibold mb-2 line-clamp-1">
											{product.productName}
										</h3>
										<p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
											{product.description}
										</p>
										{product.discount ? (
											<>
												<div className="flex flex-row items-center">
													<span className="text-gray-500 line-through mb-1 p-1">
														${product.price.toFixed(2)}
													</span>
													<span className="text-xl font-bold text-indigo-600 p-1">
														${product.specialPrice.toFixed(2)}
													</span>
												</div>
											</>
										) : (
											<span className="text-xl font-medium text-gray-800 p-1">
												${product.price.toFixed(2)}
											</span>
										)}
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<div className="text-center py-12 bg-gray-50 rounded-lg">
						<p className="text-gray-500">
							No products available. Please check back later.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
