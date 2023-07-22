import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/src/consts";
import { Stars } from "./components/stars";
import GppBadIcon from "@mui/icons-material/GppBad";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

export const CharDetails = () => {
  const char = useLoaderData().char;

  return (
    <Box
      sx={{
        background: `url(${supabase.charAssetsUrl}/${char.profileImageId.imagePath}) no-repeat`,
        "backgroundSize": "cover",
        "backgroundPosition": "center",
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
          "backdropFilter": "blur(33px)",
          "backgroundBlendMode": "overlay",
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2, padding: "20px 0" }}>
        <Typography gutterBottom variant="h3" textAlign="center">
          {char.charName}
        </Typography>
        <Card
          sx={{
            maxWidth: 512,
            margin: "20px auto 0",
          }}
          elevation={24}
        >
          <CardMedia
            sx={{ height: 512 }}
            image={`${supabase.charAssetsUrl}/${char.profileImageId.imagePath}`}
            title={char.charName}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {char.summary}
            </Typography>
          </CardContent>
        </Card>

        <Container maxWidth="lg" sx={{}}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h5"
                fontWeight="bold"
                textAlign="center"
              >
                Also known as
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Stack
                direction="row"
                spacing={2}
                flexWrap="wrap"
                useFlexGap={true}
                gap={2}
                justifyContent="center"
              >
                {char.alsoKnownAs.map((title: string, index: number) => (
                  <Chip key={index} label={title} />
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} marginTop={5}>
              <Typography
                gutterBottom
                variant="h5"
                fontWeight="bold"
                textAlign="center"
              >
                Attributes
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Stack
                direction="row"
                flexWrap="wrap"
                useFlexGap={true}
                gap={2}
                justifyContent="space-evenly"
              >
                {Object.keys(char.attributes).map(
                  (key: string, index: number) => {
                    return (
                      <Stars
                        key={index}
                        label={key.toUpperCase()}
                        count={char.attributes[key]}
                      />
                    );
                  }
                )}
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} md={6} marginTop={5}>
              <Typography
                gutterBottom
                variant="h5"
                fontWeight="bold"
                textAlign="left"
              >
                Strenghts
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} marginTop={5}>
              <Typography
                gutterBottom
                variant="h5"
                fontWeight="bold"
                textAlign="right"
              >
                Weaknesses
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <List
                dense={true}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                }}
              >
                {char.strengths.map((value: string, index: number) => (
                  <ListItem
                    key={index}
                    sx={{
                      "& .MuiListItemSecondaryAction-root": {
                        top: "57%",
                      },
                      borderRadius: "10px",
                    }}
                  >
                    <ListItemIcon>
                      <HealthAndSafetyIcon
                        fontSize="large"
                        sx={{ fill: "#a7c957" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={value}
                      sx={{
                        textAlign: "left",
                        marginLeft: "10px",
                        "& .MuiTypography-root": {
                          fontSize: "1.2rem",
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <List
                dense={true}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                }}
              >
                {char.weaknesses.map((value: string, index: number) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <GppBadIcon fontSize="large" sx={{ fill: "#f4a259" }} />
                    }
                    sx={{
                      "& .MuiListItemSecondaryAction-root": {
                        top: "57%",
                      },
                      borderRadius: "10px",
                    }}
                  >
                    <ListItemText
                      primary={value}
                      sx={{
                        textAlign: "right",
                        marginRight: "10px",
                        "& .MuiTypography-root": {
                          fontSize: "1.2rem",
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} marginTop={5}>
              <Typography
                gutterBottom
                variant="h5"
                fontWeight="bold"
                textAlign="center"
              >
                History
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {char.history
                .split("\n\n")
                .map((chunk: string, index: number) => (
                  <Typography
                    key={index}
                    gutterBottom
                    textAlign="justify"
                    fontSize="1.2rem"
                    paddingY={0.5}
                  >
                    {chunk}
                  </Typography>
                ))}
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={2}>
                {char?.images.map((image: any) => (
                  <Card key={image.imageId} sx={{ maxWidth: 368 }}>
                    <CardMedia
                      component="img"
                      image={`${supabase.charAssetsUrl}/${image.imagePath}`}
                    />
                  </Card>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
