import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
	baseURL: `${BASE_URL}/api`,
});

export default api;
