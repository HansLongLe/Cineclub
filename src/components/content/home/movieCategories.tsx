import "./style.scss";
import { FC, useEffect, useState } from "react";
import { Movie } from "../../../types";
import { fetchMoviesForCategory } from "../../../api";
import { IconType } from "react-icons/lib";
import MovieItem from "./movieItem";
import { IoIosArrowDown } from "react-icons/io";

type Props = {
  category: string;
  categoryTitle: string;
  categoryIcon: IconType;
  period?: number;
};

const MovieCategories: FC<Props> = (props) => {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    const getMovies = async () => {
      const responseMovies = await fetchMoviesForCategory(props.category, 1, 1, 4, props.period);
      if (responseMovies && responseMovies.data) {
        setMovies(responseMovies.data);
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
            {movies.map((movie) => {
              return <MovieItem key={movie.id} movie={movie} />;
            })}
          </div>
          <div className="footer">
            <div className="show-more">Show more</div>
            <IoIosArrowDown />
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCategories;
