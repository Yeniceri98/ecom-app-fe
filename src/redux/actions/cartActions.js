import api from '../../api/api';

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

export const decreaseCartQuantity =
	(data, newQuantity) => (dispatch, getState) => {
		dispatch({
			type: 'ADD_TO_CART',
			payload: { ...data, quantity: newQuantity },
		});
		localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
	};

export const increaseCartQuantity =
	(data, toast, currentQuantity, setCurrentQuantity) =>
	(dispatch, getState) => {
		try {
			const state = getState();
			const productsState = state.products;

			// Case 1: Products data is not available - proceed without inventory check
			if (
				!productsState ||
				!productsState.products ||
				!Array.isArray(productsState.products) ||
				productsState.products.length === 0
			) {
				console.log('Products data not available for inventory check');

				// Still allow increasing the quantity in the cart
				const newQuantity = currentQuantity + 1;
				setCurrentQuantity(newQuantity);

				dispatch({
					type: 'ADD_TO_CART',
					payload: { ...data, quantity: newQuantity },
				});
				localStorage.setItem(
					'cartItems',
					JSON.stringify(getState().carts.cart)
				);
				return;
			}

			// Case 2: Products data is available - perform inventory check
			const { products } = productsState;
			const getProduct = products.find(
				(item) => item.productId === data.productId
			);

			// If product not found in products array
			if (!getProduct) {
				console.log(
					`Product with ID ${data.productId} not found in products array`
				);

				// Still allow increasing the quantity in the cart
				const newQuantity = currentQuantity + 1;
				setCurrentQuantity(newQuantity);

				dispatch({
					type: 'ADD_TO_CART',
					payload: { ...data, quantity: newQuantity },
				});
				localStorage.setItem(
					'cartItems',
					JSON.stringify(getState().carts.cart)
				);
				return;
			}

			// Check if requested quantity is available in inventory
			const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

			if (isQuantityExist) {
				const newQuantity = currentQuantity + 1;
				setCurrentQuantity(newQuantity);

				dispatch({
					type: 'ADD_TO_CART',
					payload: { ...data, quantity: newQuantity },
				});
				localStorage.setItem(
					'cartItems',
					JSON.stringify(getState().carts.cart)
				);
			} else {
				toast.error('Quantity Reached to Limit');
			}
		} catch (error) {
			console.error('Error increasing cart quantity:', error);
			toast.error('Failed to update quantity');

			// Even in case of error, we can still try to increase the quantity
			const newQuantity = currentQuantity + 1;
			setCurrentQuantity(newQuantity);

			dispatch({
				type: 'ADD_TO_CART',
				payload: { ...data, quantity: newQuantity },
			});
			localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
		}
	};

export const removeFromCart = (data, toast) => (dispatch, getState) => {
	dispatch({ type: 'REMOVE_FROM_CART', payload: data });
	toast.success(`${data.productName} removed from cart`);
	localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
};

export const createOrUpdateCartWithItems =
	(sendCartItems) => async (dispatch) => {
		try {
			dispatch({
				type: 'CART_REQUEST',
			});
			await api.post('/carts/create', sendCartItems);
			await dispatch(getCartOfUser());
		} catch (error) {
			dispatch({
				type: 'CART_REQUEST_ERROR',
				payload:
					error?.response?.data?.message ||
					'Failed to create & update cart items',
			});
		}
	};

export const getCartOfUser = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: 'CART_REQUEST',
		});
		const { data } = await api.get('/carts/user/cart');
		dispatch({
			type: 'GET_USER_CART',
			payload: data.products,
			totalPrice: data.totalPrice,
			cartId: data.cartId,
		});
		localStorage.setItem('cartItems', JSON.stringify(getState().carts.cart));
		dispatch({
			type: 'CART_REQUEST_SUCCESS',
		});
	} catch (error) {
		dispatch({
			type: 'CART_REQUEST_ERROR',
			payload:
				error?.response?.data?.message ||
				'Failed to create & update cart items',
		});
	}
};
