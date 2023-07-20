import { Container, Paper } from "@mui/material";
import { DataFunctionArgs, json } from "@remix-run/server-runtime";
import * as React from "react";
import type { MetaFunction } from "remix";
import { CharDetails } from "~/routes-pages/char";
import { QuiltedImageList } from "~/routes-pages/index/gallery";
import { APIFetch } from "~/services/api.service";

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export const loader = async (remixArgs: DataFunctionArgs) => {
  const params = remixArgs.params;

  const api = new APIFetch({});

  const response = await api.char(params.url!);

  return response.data;
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <React.Fragment>
      <CharDetails />
    </React.Fragment>
  );
}
