import "./style.scss";
import { FC, useEffect, useState } from "react";
// import { Movie } from "../../../types";
import { fetchMoviesForCategory } from "../../../api";
import { IconType } from "react-icons/lib";

type Props = {
  category: string;
  categoryTitle: string;
  categoryIcon: IconType;
};

const MovieCategories: FC<Props> = (props) => {
  //   const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    const getMovies = async () => {
      const responseMovies = await fetchMoviesForCategory(props.category, 1, 1, 6);
      if (responseMovies && responseMovies.data) {
        // setMovies(responseMovies.data);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="movie-category">
      <div className="movie-category-title">
        {props.categoryTitle} <props.categoryIcon />
      </div>
      <div className="movie-category-movies"></div>
    </div>
  );
};

export default MovieCategories;
