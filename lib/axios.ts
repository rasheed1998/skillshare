import axios from "axios";

// Optional cleanup: REMOVE interceptor if not using Authorization header
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export default instance;
