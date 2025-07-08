const initialState = {
	cartId: null,
	cart: [],
	totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			const productToAddToCart = action.payload;
			const existingProductInCart = state.cart.find(
				(item) => item.productId === productToAddToCart.productId
			);

			// If added product is already exist in Cart
			if (existingProductInCart) {
				const updatedCart = state.cart.map((item) => {
					if (item.productId === productToAddToCart.productId) {
						return productToAddToCart;
					} else {
						return item;
					}
				});

				return {
					...state,
					cart: updatedCart,
				};
			} else {
				const newCart = [...state.cart, productToAddToCart];
				return {
					...state,
					cart: newCart,
				};
			}
		case 'REMOVE_FROM_CART':
			return {
				...state,
				cart: state.cart.filter(
					(item) => item.productId !== action.payload.productId
				),
			};
		case 'GET_USER_CART':
			return {
				...state,
				cart: action.payload,
				totalPrice: action.totalPrice,
				cartId: action.cartId,
			};
		default:
			return state;
	}
};

export default cartReducer;
