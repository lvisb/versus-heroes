import { Card, CardContent, Container, Link, Typography } from "@mui/material";

export const Home = () => {
  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Welcome!</h1>
        <Typography
          maxWidth={400}
          sx={{ mb: 2, textAlign: "center" }}
          color="text.secondary"
          variant="h5"
        >
          Welcome to the incredible world of fantasy and superpowers!
        </Typography>

        <Typography maxWidth={500} textAlign="justify" paddingBottom={2}>
          Here, with the help of AI, you will revisit the history of the most
          iconic heroes and villains from movies, games, and comics. Through
          this system, you can type the name of the character you want to know
          more about, and a narrative-trained AI will generate character details
          that can be edited later on! Have fun!
        </Typography>
      </CardContent>
    </Card>
  );
};
