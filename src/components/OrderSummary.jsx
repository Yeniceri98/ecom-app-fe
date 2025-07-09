const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
	return (
		<div className="container mx-auto">
			<div className="flex flex-col lg:flex-row gap-6">
				<div className="w-full lg:w-1/2 space-y-6">
					<div className="p-4 border rounded-lg shadow-sm">
						<h2 className="text-2xl font-semibold mb-2">Billing Address</h2>
						<p>
							<strong>Building Name: </strong>
							{address?.buildingName}
						</p>
						<p>
							<strong>Street Name: </strong>
							{address?.streetName}
						</p>
						<p>
							<strong>State: </strong>
							{address?.state}
						</p>
						<p>
							<strong>City: </strong>
							{address?.city}
						</p>
						<p>
							<strong>Country: </strong>
							{address?.country}
						</p>
						<p>
							<strong>Zipcode: </strong>
							{address?.zipcode}
						</p>
					</div>

					<div className="p-4 border rounded-lg shadow-sm">
						<h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
						<p>
							<strong>Payment Method: </strong>
							{paymentMethod}
						</p>
					</div>

					<div className="p-4 border rounded-lg shadow-sm">
						<h2 className="text-2xl font-semibold mb-2">Ordered Items</h2>
						<div className="space-y-10">
							{cart?.map((item) => (
								<div
									key={item.productId}
									className="flex items-center space-x-4">
									<img
										src={`${process.env.REACT_APP_BACKEND_URL}/images/${item.image}`}
										alt={item.productName}
										className="w-16 h-16 object-cover"
									/>
									<div>
										<p className="font-semibold">{item.productName}</p>

										<p className="font-semibold">
											{item.quantity} x ${item.specialPrice}: $
											{item.quantity * item.specialPrice}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="w-full lg:w-1/2">
					<div className="p-4 border rounded-lg shadow-sm sticky top-4">
						<h2 className="text-2xl font-semibold mb-2">Order Summary</h2>

						<div className="space-y-2">
							<div className="flex justify-between">
								<strong>Total Price </strong>
								<span className="ml-auto">${totalPrice}</span>
							</div>
							<div className="flex justify-between">
								<strong>Shipping Fee: </strong>
								<span className="ml-auto">
									{totalPrice < 200 ? (
										'$50'
									) : (
										<>
											<del className="text-gray-500">$50</del>
											<span className="text-green-600 text-sm ml-2">
												(Free shipping over $200!)
											</span>
										</>
									)}
								</span>
							</div>
							<div className="flex justify-between">
								<strong>SubTotal: </strong>
								<span className="ml-auto">
									${totalPrice < 200 ? totalPrice + 50 : totalPrice}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
