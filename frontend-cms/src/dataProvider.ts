import {
  CreateResponse,
  DataProvider,
  GetListResponse,
  HttpError,
} from "@refinedev/core";
import axios from "axios";
import { TOKEN_KEY } from "./authProvider";
import { api } from "./consts";

const axiosInstance = axios.create({
  baseURL: api.baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

export const charDataProvider: DataProvider = {
  // required methods
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const { data } = await axiosInstance.get("/char/list", {
      params: {
        currentPage: pagination?.current,
        itemsPerPage: pagination?.pageSize,
      },
    });

    return {
      data: data.chars,
      total: data.totalChars,
    };
  },
  create: async ({ resource, variables, meta }) => {
    const response: CreateResponse<any> = { data: {} };

    return Promise.resolve(response);
  },
  // update: ({ resource, id, variables, meta }) => Promise,
  deleteOne: async ({ resource, id, variables, meta }) => {
    const { data } = await axiosInstance.delete(`/char/${id}`);

    return { data };
  },
  getOne: async ({ resource, id, meta }) => {
    const { data } = await axiosInstance.get(`/char/${id}`);

    return { data: data.char };
  },
  // getApiUrl: () => "",
  // // optional methods
  // getMany: ({ resource, ids, meta }) => Promise,
  // createMany: ({ resource, variables, meta }) => Promise,
  // deleteMany: ({ resource, ids, variables, meta }) => Promise,
  // updateMany: ({ resource, ids, variables, meta }) => Promise,
  // custom: ({
  //     url,
  //     method,
  //     filters,
  //     sorters,
  //     payload,
  //     query,
  //     headers,
  //     meta,
  // }) => Promise,
};
