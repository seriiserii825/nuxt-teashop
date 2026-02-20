export const API_URL = {
  root: (url = '') => `${url ? url : ''}`,
  auth: (url = '') => API_URL.root(`/auth${url}`),
  users: (url = '') => API_URL.root(`/users${url}`),
  products: (url = '') => API_URL.root(`/products${url}`),
  stores: (url = '') => API_URL.root(`/stores${url}`),
  colors: (url = '') => API_URL.root(`/colors${url}`),
  categories: (url = '') => API_URL.root(`/categories${url}`),
  files: (url = '') => API_URL.root(`/files${url}`),
  reviews: (url = '') => API_URL.root(`/reviews${url}`),
  orders: (url = '') => API_URL.root(`/orders${url}`),
  statistics: (url = '') => API_URL.root(`/statistics${url}`),
  cart: (url = '') => API_URL.root(`/cart${url}`),
}
