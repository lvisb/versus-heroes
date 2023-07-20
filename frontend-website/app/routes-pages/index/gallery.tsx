import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { GalleryItem, GalleryItemProps } from "./gallery-item";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}`,
    srcSet: `${image}`,
  };
}
export const QuiltedImageList = () => {
  const { breakpoints } = useTheme();

  const isSmall = useMediaQuery((theme) => breakpoints.down("md"));
  const isMedium = useMediaQuery((theme) => breakpoints.between("sm", "md"));
  const isLarge = useMediaQuery((theme) => breakpoints.up("md"));

  let cols = 2;

  if (isMedium) cols = 4;
  if (isLarge) cols = 6;

  return (
    <ImageList sx={{}} variant="quilted" cols={cols} rowHeight={250}>
      {itemData.map((item: GalleryItemProps, index: number) => (
        <GalleryItem key={index} {...item} />
      ))}
    </ImageList>
  );
};

const itemData: GalleryItemProps[] = [
  {
    title: "Honey",
    img: "https://apcuctqgazqqjobpdhax.supabase.co/storage/v1/object/public/characters/dexter-morgan-QTdxrZ.jpg",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://apcuctqgazqqjobpdhax.supabase.co/storage/v1/object/public/characters/fred-krueger-38MTFp.jpg",
    title: "Burger",
  },
  {
    img: "https://apcuctqgazqqjobpdhax.supabase.co/storage/v1/object/public/characters/hannibal-lecter-PaFLOS.jpg?t=2023-07-19T23%3A42%3A17.577Z",
    title: "Camera",
  },
  {
    img: "https://apcuctqgazqqjobpdhax.supabase.co/storage/v1/object/public/characters/john-locke-r8dwXm.jpg?t=2023-07-19T23%3A42%3A46.951Z",
    title: "Hats",
    cols: 2,
  },
  {
    img: "https://apcuctqgazqqjobpdhax.supabase.co/storage/v1/object/public/characters/pennywise-the-dancing-clown-XHQwt_.jpg",
    title: "Honey",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://apcuctqgazqqjobpdhax.supabase.co/storage/v1/object/public/characters/pennywise-the-dancing-clown-mQgTyD.jpg",
    title: "Basketball",
  },
  {
    img: "https://apcuctqgazqqjobpdhax.supabase.co/storage/v1/object/public/characters/2023-07-19/queen-cersei-lannister-Ri3puF.jpg?t=2023-07-19T23%3A43%3A18.165Z",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://apcuctqgazqqjobpdhax.supabase.co/storage/v1/object/public/characters/john-locke-r8dwXm.jpg?t=2023-07-19T23%3A42%3A46.951Z",
    title: "Coffee",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    cols: 2,
  },
];
