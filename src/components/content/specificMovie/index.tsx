import "./style.scss";
import { useEffect, useState } from "react";
import { MovieInfo } from "../../../types";
import { fetchMovieInfoApi } from "../../../api";
import { useDispatch } from "react-redux";
import { setBackgroundImage } from "../../../redux/slices/backgroundImageSlice";
import { useParams } from "react-router-dom";
import { RxDotFilled } from "react-icons/rx";
import AvgRating from "../../avgRating";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import TransferList from "./transferList";

const SpecificMovie = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieInfo>();
  const [saved, setSaved] = useState<boolean>(false);
  const [openedDialog, setOpenedDialog] = useState<boolean>(false);

  useEffect(() => {
    const getMovieInfo = async () => {
      if (movieId) {
        const response = await fetchMovieInfoApi(Number(movieId));
        if (response.status === 200) {
          setMovie(response.data);
        }
      }
    };

    getMovieInfo();
  }, []);

  useEffect(() => {
    if (movie) {
      dispatch(setBackgroundImage(`${process.env.REACT_APP_IMG_URL + movie.backdropPath}`));
    }
    return () => {
      dispatch(setBackgroundImage(undefined));
    };
  }, [movie]);

  const handleSaveMovie = () => {
    setOpenedDialog(false);
    setSaved(true);
  };

  return (
    <>
      {movie && (
        <div className="movie">
          <div className="overview">
            <div className="basic-info">
              <div className="text-button-group">
                <div className="title">{movie.title}</div>
                <div>Original title: {movie.originalTitile || movie.title}</div>
                <div className="quick-info">
                  <div>
                    {new Date(movie.releaseDate).getFullYear()}
                    <RxDotFilled />
                  </div>
                  <div>
                    {movie.runtime} minutes <RxDotFilled />
                  </div>
                </div>
                {movie.voteAverage !== 0 && (
                  <AvgRating ratingNumber={Math.round(movie.voteAverage * 10) / 10} size="72" />
                )}
                {movie.voteCount !== 0 && <p className="vote-count">{movie.voteCount}</p>}
                <Button
                  variant="contained"
                  onClick={() => setOpenedDialog(true)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "small",
                    marginTop: "32px",
                    borderRadius: "20px",
                    color: "white",
                    backgroundColor: "#8685ef",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "#6665b5"
                    }
                  }}>
                  Save to list
                  <div className={`heart-icon ${saved ? "is-active" : ""}`}></div>
                </Button>
              </div>
              <img src={process.env.REACT_APP_IMG_URL + movie.posterPath} />
            </div>
            <div className="synopsis"></div>
          </div>
          <div className="details"></div>
        </div>
      )}
      <Dialog
        open={openedDialog}
        onClose={() => setOpenedDialog(false)}
        sx={{
          "& .MuiPaper-root": { backgroundColor: "black" },
          "& .MuiTypography-root": { color: "white" }
        }}>
        <DialogTitle sx={{ textAlign: "center" }}>
          Choose a list to save {`"${movie?.title}"`} to:
        </DialogTitle>
        <DialogContent sx={{ margin: "32px 16px" }}>
          <TransferList />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSaveMovie}
            sx={{
              fontSize: "small",
              margin: "0 32px 16px 0",
              borderRadius: "20px",
              color: "white",
              maxHeight: "40px",
              height: "40px",
              maxWidth: "80px",
              width: "80px",
              backgroundColor: "#8685ef",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#6665b5"
              }
            }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SpecificMovie;
