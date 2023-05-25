import "./style.scss";
import { FC, useEffect, useState } from "react";
import { Movie } from "../../../types";
import { fetchMoviesForCategory } from "../../../api";
import { IconType } from "react-icons/lib";
import { IoIosArrowDown } from "react-icons/io";
import { Dialog, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import BrowseMoviesCategory from "../../browseMoviesCategory";
import { TiArrowLeftThick } from "react-icons/ti";
import MovieItem from "./movieItem";

type Props = {
  category: string;
  categoryTitle: string;
  categoryIcon: IconType;
  period?: number;
};

const MovieCategories: FC<Props> = (props) => {
  const [movies, setMovies] = useState<Movie[]>();
  const [openedDialog, setOpenedDialog] = useState<boolean>(false);

  useEffect(() => {
    const getMovies = async () => {
      const responseMovies = await fetchMoviesForCategory(props.category, 1, 1, 6, props.period);
      if (responseMovies && responseMovies.data) {
        setMovies(responseMovies.data.movies);
      }
    };
    getMovies();
  }, []);

  return (
    <>
      {movies && (
        <div className="movie-category">
          <div className="movie-category-title">
            {props.categoryTitle} <props.categoryIcon />
          </div>
          <div className="movie-category-movies">
            <Grid
              container
              sx={{ "& .MuiGrid-item": { display: "flex", justifyContent: "center" } }}>
              {movies.map((movie) => {
                return (
                  <Grid item key={movie.id} xl={4} lg={6} md={12}>
                    <MovieItem movie={movie} />
                  </Grid>
                );
              })}
            </Grid>
          </div>
          <div className="footer" onClick={() => setOpenedDialog(true)}>
            <div className="show-more">Show more</div>
            <IoIosArrowDown />
          </div>
        </div>
      )}
      <Dialog
        open={openedDialog}
        onClose={() => setOpenedDialog(false)}
        fullScreen
        sx={{
          width: "80%",
          height: "90%",
          top: "5%",
          left: "10%",
          "& .MuiPaper-root": { backgroundColor: "black", borderRadius: "30px" },
          "& .MuiTypography-root": { color: "white", fontWeight: "bold" }
        }}>
        <DialogTitle
          sx={{
            textAlign: "center",
            margin: "16px 0"
          }}>
          <IconButton
            onClick={() => setOpenedDialog(false)}
            sx={{
              position: "absolute",
              left: "64px",
              color: "#8685ef",
              transition: "transform 0.3s",
              "&:hover": {
                backgroundColor: "rgba(53, 52, 94, 0.5)",
                transform: "scale(1.1)"
              }
            }}>
            <TiArrowLeftThick fontSize="xx-large" />
          </IconButton>
          {props.categoryTitle}
        </DialogTitle>
        <DialogContent
          sx={{
            margin: "32px 16px",
            "::-webkit-scrollbar": {
              width: "8px"
            },

            "::-webkit-scrollbar-track": {
              background: "grey",
              borderRadius: "20px"
            },

            "::-webkit-scrollbar-thumb": {
              background: "white",
              borderRadius: "20px"
            },

            "::-webkit-scrollbar-thumb:hover": {
              background: "grey"
            }
          }}>
          <BrowseMoviesCategory categoryName={props.category} period={props.period} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MovieCategories;
