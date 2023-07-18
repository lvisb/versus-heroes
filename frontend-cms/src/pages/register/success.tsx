import { Card, CardContent, Container, Link, Typography } from "@mui/material";

export const RegisterSuccess = () => {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        padding: 20,
      }}
    >
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Confirm your email</h1>
          <Typography
            maxWidth={500}
            sx={{ mb: 2, textAlign: "center" }}
            color="text.secondary"
          >
            To complete the registration process and gain access to the admin
            panel, we ask you to confirm your email address.
          </Typography>
          <Typography
            maxWidth={400}
            variant="body2"
            sx={{ mb: 2, textAlign: "center" }}
            color="text.secondary"
          >
            Once your email is confirmed, you'll have full access to the admin
            panel.
          </Typography>
          <Link href="/login">Login</Link>
        </CardContent>
      </Card>
    </Container>
  );
};
