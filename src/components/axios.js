import axios from 'axios';

var axiosInstance = axios.create ( {
  baseURL: 'https://pyxiedash.os3test.it',
  crossdomain: true,
  withCredentials: true
} );

export default axiosInstance;