import "./style.scss";
import { FC } from "react";
import { Movie } from "../../../types";

type Props = {
  movie: Movie;
};

const MovieItem: FC<Props> = (props) => {
  return (
    <div className="movie-item">
      <div className="movie-item-left-sidebar">
        {/* <img src={process.env.REACT_APP_IMG_URL + props.movie.posterPath} /> */}
      </div>
      <div className="movie-item-right-sidebar"></div>
    </div>
  );
};

export default MovieItem;
