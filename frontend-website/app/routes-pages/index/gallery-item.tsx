import { ImageListItem } from "@mui/material";

export type GalleryItemProps = {
  img: string;
  rows?: number;
  cols?: number;
  title: string;
};

export const GalleryItem = ({
  img,
  rows = 1,
  cols = 1,
  title,
}: GalleryItemProps) => {
  return (
    <ImageListItem
      key={img}
      cols={cols}
      rows={rows}
      sx={{
        border: "solid 0px #00ed83",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          "z-index": 99998,
          transform: "scale(1.02)",
          border: "20px rgba(0,0,0,0.5) solid",
        },
      }}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    >
      <img src={img} srcSet={img} alt={title} loading="lazy" />
    </ImageListItem>
  );
};
