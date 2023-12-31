import { CreateResponse, DataProvider } from "@refinedev/core";
import { axiosInstance } from "./common/axios.client";
import { api } from "./consts";

export const charDataProvider: DataProvider = {
  // required methods
  getApiUrl: () => api.baseUrl,
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
    const { data } = await axiosInstance.post(`/char`, variables);

    return { data };
  },
  update: async ({ resource, id, variables, meta }) => {
    const { data } = await axiosInstance.put(`/char/${id}`, variables);

    return { data };
  },
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
