import axios from 'axios';
// eslint-disable-next-line no-process-env
// export const env = process.env.REACT_APP_ENVIRONMENT;
// export const backendUrl = process.env.REACT_APP_BACKEND_API as string;

export const BackendInstance = axios.create({
  baseURL: `http://localhost:8000/api/`,

  withCredentials: true
});

export const config = {
  headers: {
    'Content-Type': ' application/json ' // application/x-www.form-urlencoded
  },
  credentials:'includes'
};
