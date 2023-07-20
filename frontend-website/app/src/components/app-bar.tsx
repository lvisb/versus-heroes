import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LogoIcon from "~/src/assets/supaheroes-icon.png";
import Logo from "~/src/assets/supaheroes-logo.png";
import { Stack, alpha } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "remix";

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  backdropFilter: "blur(8px)",
  backgroundColor: alpha("#000", 0.8), // Define a transparência do AppBar
}));

export const AppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar
        position="fixed"
        sx={{
          zIndex: 99999,
          borderBottom: "2px #00ed83 solid",
        }}
      >
        <Toolbar sx={{ margin: "0 auto" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Link to="/">
              <img
                src={LogoIcon}
                style={{ height: "50px" }}
                alt="Superhero icons created by Freepik - Flaticon / flaticon.com/free-icons/superhero"
              />

              <img src={Logo} alt="Supaheroes" style={{ height: "40px" }} />
            </Link>
          </Stack>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};
