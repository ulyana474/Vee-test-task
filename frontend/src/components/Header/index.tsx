import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AppBar } from "@mui/material";

function Header() {
  return (
    <Box>
      <AppBar position="static" className="appBar">
        <Toolbar
          className="toolbar"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6">Vee</Typography>
          <Box>
            <Button color="inherit">Social media</Button>
            <Button color="inherit">Grants</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
