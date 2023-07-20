export type Env = {
  API_BASE_URL: string;
  NODE_ENV: string;
};

let _env: Env;

export const env = (): Env => {
  if (!_env) {
    _env = {
      NODE_ENV: process.env.NODE_ENV,
      API_BASE_URL: process.env.API_BASE_URL!,
    };
  }
  return _env;
};
