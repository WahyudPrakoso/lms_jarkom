import axios from "axios";

const server = import.meta.env.VITE_SERVER_ADDRESS;
export const makeRequest = axios.create({
  baseURL: server,
  withCredentials: true,
});

// export const makeRequest = axios.create({
//   baseURL: 'http://localhost:5000',
//   withCredentials: true,
// });


export const makeRequestUpload = axios.create({
  baseURL: server,
  withCredentials: true,
  headers : {
    "Content-Type" : "multipart/form-data"
  }
});
