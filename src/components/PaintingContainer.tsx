import { useState, useEffect } from "react";
import makeAPICall, { api_key } from "../api/APIHandler";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Button,
  ImageList,
  ImageListItem,
  CircularProgress,
  ImageListItemBar,
  Tooltip,
} from "@mui/material";

import Painting from "./Painting";

// Simple random number generator for use in the shuffleArt() function
function _randomize(end: number, start: number = 0) {
  return Math.floor(Math.random() * end) + start;
}

export default function PaintingContainer() {
  const [data, setData] = useState<any>([]); // Stores json from API response
  const [page, setPage] = useState<number>(); // Saves the selected page from the API response
  const [artnums, setArtnums] = useState<number[]>([]); // Stores numbers to select art from API
  const [delayed, setDelayed] = useState<boolean>(false); // Used to throttle GET requests

  // Generates random numbers for use with the API within the limits of the API response pages
  // Makes sure there are no repeating numbers
  const shuffleArt = () => {
    setPage(_randomize(500, 1));

    let nums: number[] = [];
    for (let i = 0; i < 3; i++) {
      let random_num = _randomize(20);

      while (nums.includes(random_num)) {
        random_num = _randomize(20);
      }

      nums.push(random_num);
    }

    setArtnums(nums);
  };

  // Shuffle art once on mount and select an initial API response page
  useEffect(shuffleArt, []);

  // Calls the API every time the page var is changed,
  // effectively getting a new API response every time the shuffle button is pressed
  // (unless shuffling results in the same page)
  useEffect(() => {
    if (!delayed) {
      setDelayed(true);

      const fetchData = async () => {
        setData([]); // Existing json data is cleared before making another GET request

        try {
          const api_output = await makeAPICall(
            `https://www.rijksmuseum.nl/api/en/collection?key=${api_key}&ps=20&p=${page}`
          );

          setData(api_output);
        } catch (error) {
          console.error("API error in <PaintingContainer>:", error);
        }
      };

      fetchData();

      setTimeout(() => setDelayed(false), 2500);
    } else {
      console.log("API call made too soon, please wait...");
    }
  }, [page]);

  return (
    <>
      {data && data.artObjects ? (
        <>
          <div className="painting-container">
            <ImageList cols={3}>
              {artnums.map(
                (num) =>
                  /* Some art objects in the API are missing images,
                those are skipped and not displayed */
                  data.artObjects[num].webImage && (
                    <Tooltip title={data.artObjects[num].title}>
                      <ImageListItem key={`listitem-${num}`}>
                        <Painting
                          key={num}
                          painting_src={data.artObjects[num].webImage.url}
                          id={data.artObjects[num].objectNumber}
                        />

                        <ImageListItemBar title={data.artObjects[num].title} />
                      </ImageListItem>
                    </Tooltip>
                  )
              )}
            </ImageList>

            <Button
              onClick={shuffleArt}
              size="large"
              variant="contained"
              color="secondary"
              endIcon={<RefreshIcon />}
              disabled={delayed}
              sx={{ m: 5 }}
            >
              Shuffle
            </Button>
          </div>
        </>
      ) : (
        <>
          <CircularProgress size="5rem" />
        </>
      )}
    </>
  );
}
