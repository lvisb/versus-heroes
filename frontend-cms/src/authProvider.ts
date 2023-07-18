import { AuthBindings } from "@refinedev/core";
import axios, { AxiosError } from "axios";
import { axiosInstance } from "./common/axios.client";
import { api } from "./consts";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthBindings = {
  login: async ({ email, password, remember }) => {
    let error: unknown;

    if (email && password) {
      try {
        const response = await axios.post(`${api.baseUrl}/auth/sign-in`, {
          email,
          password,
        });

        if (remember) localStorage.setItem(TOKEN_KEY, response.data.token);
        else sessionStorage.setItem(TOKEN_KEY, response.data.token);

        return {
          success: true,
          redirectTo: "/",
        };
      } catch (err) {
        error = err;
      }
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message:
          error instanceof AxiosError
            ? error.response?.data.message
            : (error as Error).message,
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token =
      localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

    if (!token) return { authenticated: false };

    try {
      await axiosInstance.post(`${api.baseUrl}/auth/validate-token`);

      return {
        authenticated: true,
      };
    } catch (err) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    try {
      const { data } = await axiosInstance.post(
        `${api.baseUrl}/auth/validate-token`
      );

      return data.user;
    } catch (err) {
      return null;
    }
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
