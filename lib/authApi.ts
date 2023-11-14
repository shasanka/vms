import axios from 'axios';
const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`;
export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';