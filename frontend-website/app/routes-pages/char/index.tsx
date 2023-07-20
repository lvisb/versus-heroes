import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/src/consts";

export const CharDetails = () => {
  const char = useLoaderData().char;

  return (
    <Box
      sx={{
        background: `url(${supabase.charAssetsUrl}/${char.profileImageId.imagePath}) no-repeat`,
        "background-size": "cover",
        "background-position": "center",
        "&::after": {
          content: "''",
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: "rgba(0,0,0,0.6)",
          "backdrop-filter": "blur(33px)",
          "background-blend-mode": "overlay",
          zIndex: 1,
        },
      }}
    >
      <Card
        sx={{
          maxWidth: 512,
          position: "relative",
          zIndex: 2,
          margin: "0 auto",
          top: "50px",
        }}
        elevation={24}
      >
        <CardHeader
          title={char.charName}
          titleTypographyProps={{ textAlign: "center" }}
        />
        <CardMedia
          sx={{ height: 512 }}
          image={`${supabase.charAssetsUrl}/${char.profileImageId.imagePath}`}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {char.charName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {char.summary}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
