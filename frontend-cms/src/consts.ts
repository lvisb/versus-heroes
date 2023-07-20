export namespace api {
  export const baseUrl = 'http://3.14.15.191:8001/api/v1'
  // import.meta.env.VITE_API_BASE_URL as string;
}

export namespace supabase {
  export const assetsUrl =
    "https://apcuctqgazqqjobpdhax.supabase.co/storage/v1/object/public";

  export const charAssetsUrl = `${assetsUrl}/characters`;
}
