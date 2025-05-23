// // src/api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api', // Make sure this matches your backend
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;


// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Clean signup API function
export async function signupUser(data) {
  const res = await api.post('/signup', data);
  return res.data;
}

export default api;





