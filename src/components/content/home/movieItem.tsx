import { FC, useEffect, useState } from "react";
import { Genre, Movie } from "../../../types";
import AvgRating from "../../avgRating";
import { fetchGenres } from "../../../api";

type Props = {
  movie: Movie;
};

const MovieItem: FC<Props> = (props) => {
  const [genres, setGenres] = useState<Genre[]>();

  const userLang = navigator.language;

  useEffect(() => {
    const getGenres = async () => {
      const response = await fetchGenres();
      if (response.status === 200) {
        const data: Genre[] = response.data;
        const filteredData = data.filter((d) => {
          return props.movie.genreIds.includes(d.id);
        });
        setGenres(filteredData);
      }
    };
    getGenres();
  }, []);

  return (
    <div className="movie-item">
      <div className="movie-item-content">
        <div className="movie-item-content-left-sidebar">
          <img src={process.env.REACT_APP_IMG_URL + props.movie.posterPath} />
        </div>
        <div className="movie-item-content-right-sidebar">
          <div className="movie-title">{props.movie.title}</div>
          <div className="movie-description">
            <AvgRating ratingNumber={props.movie.voteAverage} size="32px" />
            {genres && (
              <div className="row">
                Genre:
                <div className="value">
                  {genres.map((genre) => {
                    return `${genre.name} `;
                  })}
                </div>
              </div>
            )}
            <div className="row">
              Release date:
              <div className="value">
                {new Date(props.movie.releaseDate).toLocaleDateString(userLang)}
              </div>
            </div>
            <div className="row">
              Original language:
              <div className="value">{props.movie.originalLanguage}</div>
            </div>
            <div className="row">
              Popularity:
              <div className="value">{Math.round(props.movie.popularity)}</div>
            </div>
            <div className="row">
              Vote count:
              <div className="value">{props.movie.voteCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
