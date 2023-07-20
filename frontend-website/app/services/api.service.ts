import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { env } from "~/server/env.server";

export type APIFetchConfig = {
  token?: string;
  defaultEndpoint?: string;
  baseURL?: string;
};

export class APIFetch {
  protected request: AxiosInstance;
  protected defaultEndpoint?: string;
  protected baseURL?: string;

  constructor({
    baseURL = `${env().API_BASE_URL}/website`,
    defaultEndpoint,
  }: APIFetchConfig) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: defaultEndpoint ? baseURL + defaultEndpoint : baseURL,
      headers: {},
    };

    this.request = axios.create(axiosConfig);
    this.baseURL = baseURL;
    this.defaultEndpoint = defaultEndpoint;
  }

  get endpoint(): string {
    return this.defaultEndpoint || "";
  }

  char(slug: string): Promise<AxiosResponse<any>> {
    return this.request.get(`/char/${slug}`);
  }

  chars(): Promise<AxiosResponse<any>> {
    return this.request.get(`/chars`);
  }
}
