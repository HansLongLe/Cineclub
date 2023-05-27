import "./style.scss";
import { Grid, Pagination } from "@mui/material";
import LeftSidebar, { LeftSidebarRef } from "../../leftSidebar";
import MovieItem from "../home/movieItem";
import { useEffect, useRef, useState } from "react";
import { Movie } from "../../../types";
import { fetchFilteredMovies, fetchMoviesByKeywords } from "../../../api";
import { useLocation, useParams } from "react-router-dom";

const BrowseMovies = () => {
  const { keyword } = useParams();
  const location = useLocation();
  const ref = useRef<LeftSidebarRef>(null);

  const [movies, setMovies] = useState<Movie[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPages, setMaxPages] = useState<number>();

  useEffect(() => {
    const getMovies = async () => {
      if (keyword === undefined) {
        const response = await fetchFilteredMovies(currentPage, 1, 20);
        if (response.status === 200) {
          setMovies(response.data.movies);
          setMaxPages(response.data.numberOfPages);
        }
      } else {
        const response = await fetchMoviesByKeywords(keyword);
        if (response.status === 200) {
          setMovies(response.data);
          setMaxPages(1);
        }
      }
    };
    getMovies();
  }, [location.pathname]);

  const changePage = async (page: number) => {
    if (ref.current) {
      ref.current.changePage(page);
    }
  };

  return (
    <div className="browse-movies">
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={2.5}>
          <LeftSidebar
            ref={ref}
            applyFiltersToMovies={setMovies}
            changePaginationMaxPage={setMaxPages}
            setCurrentPage={setCurrentPage}
          />
        </Grid>
        <Grid item xs={9.5}>
          <div className="main">
            {movies && (
              <div className="movies">
                <div className="movies-container">
                  <Grid
                    container
                    sx={{ "& .MuiGrid-item": { display: "flex", justifyContent: "center" } }}>
                    {movies.map((movie) => {
                      return (
                        <Grid item key={movie.id} xl={6} lg={12}>
                          <MovieItem movie={movie} />
                        </Grid>
                      );
                    })}
                  </Grid>
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
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default BrowseMovies;
