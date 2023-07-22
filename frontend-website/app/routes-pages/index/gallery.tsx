import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { GalleryItem, GalleryItemProps } from "./gallery-item";
import { useLoaderData } from "@remix-run/react";
import type { Env } from "~/server/env.server";
import { supabase } from "~/src/consts";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}`,
    srcSet: `${image}`,
  };
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const gridDesign = [
  // line 1-2
  { cols: 2, rows: 2 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 1 },
  { rows: 2, cols: 1 },
  { rows: 2, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },

  // 3-4
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 2, cols: 1 },
  { rows: 2, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 2, cols: 2 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
  { rows: 1, cols: 1 },
];

export const QuiltedImageList = () => {
  const loaderData = useLoaderData();
  const env = loaderData.env as Env;
  const chars = loaderData.chars;
  const { breakpoints } = useTheme();

  const isSmall = useMediaQuery((theme) => breakpoints.down("md"));
  const isMedium = useMediaQuery((theme) => breakpoints.between("sm", "md"));
  const isLarge = useMediaQuery((theme) => breakpoints.up("md"));

  let cols = 2;

  if (isMedium) cols = 4;
  if (isLarge) cols = 8;

  return (
    <ImageList sx={{}} variant="quilted" cols={cols} rowHeight={250}>
      {chars.map((char: any, index: number) => {
        const currDesign = gridDesign[index % gridDesign.length];

        return (
          <GalleryItem
            key={index}
            url={char.charNameSlug}
            title={char.charName}
            img={`${env.SUPABASE_ASSETS_URL}/${supabase.charAssetsUrl}/${char.profileImageId.imagePath}`}
            cols={currDesign.cols}
            rows={currDesign.rows}
            suppressHydrationWarning
          />
        );
      })}
    </ImageList>
  );
};
