export const addToCart =
	(data, qty = 1, toast) =>
	async (dispatch, getState) => {
		try {
			// Find the Product
			const { products } = getState().products; // From store.js
			const getProduct = products.find(
				(item) => item.productId === data.productId
			);

			// Check Stock
			const isStockAvailable = getProduct.quantity >= qty;

			if (isStockAvailable) {
				dispatch({
					type: 'ADD_TO_CART',
					payload: { ...data, quantity: qty },
				});
				localStorage.setItem(
					'cartItems',
					JSON.stringify(getState().carts.cart)
				);
				toast.success(`${data?.productName} added to the Cart`);
			} else {
				toast.error(`${data?.productName} is out of stock!`);
			}
		} catch (error) {
			dispatch({
				type: 'ADD_TO_CART_ERROR',
			});
		}
	};
