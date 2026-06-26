import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message ?? error.message;

    const errorMap = {
      400: `Bad Request: ${message}`,
      401: 'Unauthorized. Please log in.',
      403: 'Forbidden. You do not have access.',
      404: 'Resource not found.',
      500: 'Internal Server Error. Please try again later.',
    };

    const friendlyMessage = errorMap[status] ?? `Unexpected error: ${message}`;

    return Promise.reject({
      status,
      message: friendlyMessage,
      original: error,
    });
  },
);

const getAllProducts = () => apiClient.get('/products');
const getProductById = (id) => apiClient.get(`/products/${id}`);
const getAllCategories = () => apiClient.get('/products/categories');
const getProductsByCategory = (category) => apiClient.get(`/products/category/${category}`);

export { getAllProducts, getProductById, getAllCategories, getProductsByCategory };

export default apiClient;
