import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../reducers/productsReducer';
import loadingAndErrorsReducer from '../reducers/loadingAndErrorsReducer';

const store = configureStore({
	reducer: {
		products: productsReducer,
		loadingAndErrors: loadingAndErrorsReducer,
	},
	preloadedState: {},
});

export default store;
