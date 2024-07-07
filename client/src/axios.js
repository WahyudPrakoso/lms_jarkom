import axios from "axios";

const server = import.meta.env.VITE_SERVER_ADDRESS;
export const makeRequest = axios.create({
  baseURL: server,
  withCredentials: true,
});
