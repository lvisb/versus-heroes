import { AuthBindings, useParsed } from "@refinedev/core";
import { AuthActionResponse } from "@refinedev/core/dist/interfaces";
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
      const { data } = await axiosInstance.get(
        `${api.baseUrl}/me`
      );

      return data.user;
    } catch (err) {
      return null
    }
  },
  register: async ({ email, password }: any) => {
    try {
      await axios.post(`${api.baseUrl}/sign-up`, {
        email,
        password,
      });
    } catch (err) {
      let errorMessage = "";
      let statusCode = 0;

      if (err instanceof AxiosError) {
        if (err.response?.data.errors)
          errorMessage = err.response.data.errors
            .map((error: any) => error.message)
            .join(" / ");
        else errorMessage = err.response?.data.message;
      } else errorMessage = (err as Error).message;

      statusCode = (err as any).response?.status || 500;

      return {
        success: false,
        error: {
          message: errorMessage,
          statusCode,
        },
      };
    }

    return {
      success: true,
      redirectTo: "/register/success",
    };
  },
  forgotPassword: async ({ email }: any) => {
    try {
      await axios.post(`${api.baseUrl}/auth/forgot-password`, { email });
    } catch (err) {
      let errorMessage = "";
      let statusCode = 0;

      if (err instanceof AxiosError) {
        if (err.response?.data.errors)
          errorMessage = err.response.data.errors
            .map((error: any) => error.message)
            .join(" / ");
        else errorMessage = err.response?.data.message;
      } else errorMessage = (err as Error).message;

      statusCode = (err as any).response?.status || 500;

      return {
        success: false,
        error: {
          message: errorMessage,
          statusCode,
        },
      };
    }

    return {
      success: true,
      redirectTo: "/forgot-password/success",
    };
  },

  updatePassword: async ({ password, confirmPassword }: any) => {
    const accessToken = new URL(
      location.href.replace("#", "?")
    ).searchParams.get("access_token");

    if (!accessToken)
      return {
        success: false,
        error: {
          message: "Invalid token",
          statusCode: 400,
        },
      };

    try {
      await axios.post(
        `${api.baseUrl}/auth/reset-password`,
        {
          password,
          passwordConfirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (err) {
      let errorMessage = "";
      let statusCode = 0;

      if (err instanceof AxiosError) {
        if (err.response?.data.errors)
          errorMessage = err.response.data.errors[0].message;
        else errorMessage = err.response?.data.message;
      } else errorMessage = (err as Error).message;

      statusCode = (err as any).response?.status || 500;

      return {
        success: false,
        error: {
          message: errorMessage,
          statusCode,
        },
      };
    }

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
