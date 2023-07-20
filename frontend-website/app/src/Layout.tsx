import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AppBar } from "./components/app-bar";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        sx={{
          paddingX: "0 !important",
        }}
      >
        <AppBar />
        <Box sx={{ marginTop: '64px' }}>{children}</Box>
      </Container>
    </ThemeProvider>
  );
}
