import { ImageListItem } from "@mui/material";
import { useNavigate } from "@remix-run/react";

export type GalleryItemProps = {
  img: string;
  rows?: number;
  cols?: number;
  title: string;
  url: string;
  suppressHydrationWarning?: boolean
};

export const GalleryItem = ({
  img,
  rows = 1,
  cols = 1,
  title,
  url,
}: GalleryItemProps) => {
  const navigate = useNavigate();

  return (
    <ImageListItem
      key={img}
      cols={cols}
      rows={rows}
      sx={{
        cursor: "pointer",
        border: "solid 0px #00ed83",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          "z-index": 99998,
          transform: "scale(1.02)",
          border: "20px rgba(0,0,0,0.5) solid",
        },
        "&:hover::after": {
          opacity: 1,
          transitionDelay: "0.2s",
        },
        "&::after": {
          content: `'${title.replace(/'/g, "\\'")}'`,
          position: "absolute",
          width: "100%",
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 10px",
          transition: "all 0.3s ease-out",
          textAlign: "center",
          opacity: 0,
          fontSize: "13px",
          bottom: 0,
        },
      }}
      onClick={() => {
        navigate(`/char/${url}`);
      }}
    >
      <img src={img} srcSet={img} alt={title} loading="lazy" />
    </ImageListItem>
  );
};
