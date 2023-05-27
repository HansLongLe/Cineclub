import "./style.scss";
import { Grid, Pagination } from "@mui/material";
import MovieItem from "../content/home/movieItem";
import { Movie } from "../../types";
import { FC, useEffect, useState } from "react";
import { fetchMoviesForCategoryApi } from "../../api";

type Props = {
  categoryName?: string;
  period?: number;
};

const BrowseMoviesCategory: FC<Props> = (props) => {
  const [movies, setMovies] = useState<Movie[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>();

  useEffect(() => {
    const getMovies = async () => {
      if (props.categoryName) {
        const responseMovies = await fetchMoviesForCategoryApi(
          props.categoryName,
          currentPage,
          1,
          20,
          props.period
        );
        if (responseMovies && responseMovies.data) {
          setMovies(responseMovies.data.movies);
          setMaxPages(responseMovies.data.numberOfPages);
        }
      }
    };
    getMovies();
  }, []);

  const changePage = async (page: number) => {
    if (props.categoryName) {
      const responseMovies = await fetchMoviesForCategoryApi(
        props.categoryName,
        page,
        1,
        20,
        props.period
      );
      if (responseMovies && responseMovies.data) {
        setMovies(responseMovies.data.movies);
      }
    }
    setCurrentPage(page);
  };

  return (
    <div className="movies">
      <div className="movies-container">
        {movies && (
          <Grid container sx={{ "& .MuiGrid-item": { display: "flex", justifyContent: "center" } }}>
            {movies.map((movie) => {
              return (
                <Grid item key={movie.id} xl={4} lg={6} md={12}>
                  <MovieItem movie={movie} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
      <div className="footer-pagination">
        <Pagination
          count={maxPages}
          page={currentPage}
          onChange={(_event, page) => changePage(page)}
          color="secondary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#fff",
              "&.Mui-selected": {
                backgroundColor: "#8685ef"
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default BrowseMoviesCategory;
