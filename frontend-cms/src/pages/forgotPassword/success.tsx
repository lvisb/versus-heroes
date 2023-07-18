import { Card, CardContent, Container, Link, Typography } from "@mui/material";

export const ForgotPasswordSuccess = () => {
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
          <h1>Password reset email sent successfully</h1>
          <Typography
            maxWidth={500}
            sx={{ mb: 2, textAlign: "center" }}
            color="text.secondary"
          >
            Please check your inbox and follow the instructions to proceed.
          </Typography>
          <Link href="/login">Login</Link>
        </CardContent>
      </Card>
    </Container>
  );
};
