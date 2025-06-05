import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../reducers/productsReducer';
import errorReducer from '../reducers/errorReducer';

const store = configureStore({
	reducer: {
		products: productsReducer,
		errors: errorReducer,
	},
	preloadedState: {},
});

export default store;
