export namespace api {
  export const baseUrl = import.meta.env.VITE_API_BASE_URL as string;
}

export namespace supabase {
  export const assetsUrl = import.meta.env.VITE_SUPABASE_ASSETS_URL as string;

  export const charAssetsUrl = `${assetsUrl}/characters`;
}
