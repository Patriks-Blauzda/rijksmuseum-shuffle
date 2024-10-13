import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

// Catches all errors and shows a generic 'return to home' page
export default function ErrorBoundary() {
  return (
    <div className="error-container">
      <h1>Oops!</h1>
      <p>An error has occurred!</p>
      <p>More information can be found in the console.</p>
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
