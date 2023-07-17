import { AuthBindings } from "@refinedev/core";
import axios, { AxiosError } from "axios";
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
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token =
      localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
