import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://www.brainyquote.com/'
});

export default axiosInstance;
