import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // should be set in .env
  withCredentials: true,
});

export default instance;
