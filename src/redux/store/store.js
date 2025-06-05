import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../reducers/productsReducer';

const store = configureStore({
	reducer: {
		products: productsReducer,
	},
	preloadedState: {},
});

export default store;
