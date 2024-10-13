import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

// 404 handler whenever an incorrect URL is visited
export default function NotFound() {
  return (
    <div className="error-container">
      <h1>404: Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="error"
        startIcon={<HomeIcon />}
      >
        Return
      </Button>
    </div>
  );
}
