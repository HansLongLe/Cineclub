import "./style.scss";
import { FC, useEffect, useState } from "react";
import { Movie } from "../../../types";
import { fetchMoviesForCategory } from "../../../api";
import MovieItem from "./movieItem";
import { IconType } from "react-icons/lib";

type Props = {
  category: string;
  categoryTitle: string;
  categoryIcon: IconType;
};

const MovieCategories: FC<Props> = (props) => {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    const getMovies = async () => {
      const responseMovies = await fetchMoviesForCategory(props.category, 1, 1, 6);
      if (responseMovies.data) {
        setMovies(responseMovies.data);
        console.log(responseMovies);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="movie-category">
      <div className="movie-category-title">
        {props.categoryTitle} <props.categoryIcon />
      </div>
      <div className="movie-category-movies">
        {movies &&
          movies.map((movie) => {
            return <MovieItem key={movie.id} movie={movie} />;
          })}
      </div>
    </div>
  );
};

export default MovieCategories;
