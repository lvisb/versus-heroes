import { Container, Paper } from "@mui/material";
import type { MetaFunction } from "@remix-run/node";
import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import * as React from "react";
import { CharDetails } from "~/routes-pages/char";
import { QuiltedImageList } from "~/routes-pages/index/gallery";
import { env } from "~/server/env.server";
import { APIFetch } from "~/services/api.service";
import { website } from "~/src/consts";

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = (stuff) => {
  let title: string;

  if (stuff.data?.char)
    title = stuff.data?.char.charName + " | " + website.baseTitle;
  else title = "Char details error | " + website.baseTitle;

  return {
    title: title,
    description: stuff.data?.char.summary || "Error loading char details",
  };
};

export const loader = async (remixArgs: DataFunctionArgs) => {
  const params = remixArgs.params;

  const api = new APIFetch({});

  const response = await api.char(params.url!);

  if (response.data.char.strengths.length < 5)
    response.data.char.strengths = response.data.char.strengths.concat(
      Array(5 - response.data.char.strengths.length).fill("---")
    );

  if (response.data.char.weaknesses.length < 5)
    response.data.char.weaknesses = response.data.char.weaknesses.concat(
      Array(5 - response.data.char.weaknesses.length).fill("---")
    );

  return { ...response.data, env: { ...env() } };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <React.Fragment>
      <CharDetails />
    </React.Fragment>
  );
}
