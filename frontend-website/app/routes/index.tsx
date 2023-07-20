import { Container, Paper } from "@mui/material";
import { json } from "@remix-run/server-runtime";
import * as React from "react";
import type { MetaFunction } from "remix";
import { QuiltedImageList } from "~/routes-pages/index/gallery";
import { APIFetch } from "~/services/api.service";

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export const loader = async () => {
  const api = new APIFetch({});

  const response = await api.chars();

  return response.data;
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <React.Fragment>
      <QuiltedImageList />
    </React.Fragment>
  );
}
