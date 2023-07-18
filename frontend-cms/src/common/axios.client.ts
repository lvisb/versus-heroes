import { HttpError } from "@refinedev/core";
import axios from "axios";
import { TOKEN_KEY } from "../authProvider";
import { api } from "../consts";

export const axiosInstance = axios.create({
  baseURL: api.baseUrl,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token =
      localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);
