import { Container, Paper } from "@mui/material";
import * as React from "react";
import type { MetaFunction } from "remix";
import { QuiltedImageList } from "~/routes-pages/index/gallery";

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <React.Fragment>
      <QuiltedImageList />
    </React.Fragment>
  );
}
