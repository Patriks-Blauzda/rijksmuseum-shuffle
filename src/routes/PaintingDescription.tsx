import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, CircularProgress } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import makeAPICall, { api_key } from "../api/APIHandler";

export default function PaintingDescription() {
  const id = window.location.pathname.replace("/painting/", ""); // Gets object ID from the URL
  const [data, setData] = useState<any>([]); // Stores json from API response

  // Makes a single GET request on mount
  useEffect(() => {
    const fetchData = async () => {
      setData([]);

      try {
        const api_output = await makeAPICall(
          `https://www.rijksmuseum.nl/api/en/collection/${id}?key=${api_key}`
        );

        setData(api_output.artObject);
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="spacer" />
      {data && data.webImage ? (
        <div>
          <img className="painting-big" src={data.webImage.url} />

          <div className="description-container">
            <h1 className="painting-title">{data.title}</h1>
            <p className="painting-label">{data.scLabelLine}</p>

            {/* Some objects are missing english descriptions, usually stored in
            plaqueDescriptionEnglish, shows alternative text if there is no 
            english description found */}
            {data.plaqueDescriptionEnglish ? (
              <p className="painting-description">
                {data.plaqueDescriptionEnglish}
              </p>
            ) : (
              <p className="painting-description-missing">
                No description found
              </p>
            )}
          </div>

          <Button
            component={Link}
            to="/"
            variant="contained"
            color="secondary"
            startIcon={<NavigateBeforeIcon />}
          >
            Return
          </Button>
        </div>
      ) : (
        <>
          <CircularProgress />
          <p>Loading...</p>
          <p className="loading-text">
            Not loading? <Link to="/">Click here</Link> to return to the home
            page.
          </p>
        </>
      )}
    </>
  );
}
