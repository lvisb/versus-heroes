import { Container, Paper } from "@mui/material";
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/server-runtime";
import * as React from "react";
import { QuiltedImageList } from "~/routes-pages/index/gallery";
import { env } from "~/server/env.server";
import { APIFetch } from "~/services/api.service";

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Supaheroes | AI powered heroes and villains",
    description:
      "Welcome to the incredible world of fantasy and superpowers! Here, with the help of AI, you will revisit the history of the most iconic heroes and villains from movies, games, and comics.",
  };
};

export const loader = async () => {
  const api = new APIFetch({});

  const response = await api.chars();

  return { ...response.data, env: { ...env() } };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <React.Fragment>
      <QuiltedImageList />
    </React.Fragment>
  );
}
