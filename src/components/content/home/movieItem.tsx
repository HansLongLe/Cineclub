import { FC, useEffect, useState } from "react";
import { Genre, Movie } from "../../../types";
import AvgRating from "../../avgRating";
import { fetchGenres } from "../../../api";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../../../types/enums";
import { IconButton } from "@mui/material";
import { FiEye } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";

type Props = {
  movie: Movie;
};

const MovieItem: FC<Props> = (props) => {
  const navigate = useNavigate();

  const [genres, setGenres] = useState<Genre[]>();
  const [isHovering, setIsHovering] = useState<boolean>(false);

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

  const handleClick = () => {
    navigate("/" + routePaths.specificMovie + props.movie.id);
  };

  return (
    <div className="movie-item">
      <div className="movie-item-content">
        <div className="movie-item-content-left-sidebar">
          {isHovering && (
            <div
              className="button-group"
              onMouseOver={() => setIsHovering(true)}
              onMouseOut={() => setIsHovering(false)}>
              <IconButton title="Add to watched">
                <FiEye />
              </IconButton>
              <IconButton title="Add to liked">
                <AiOutlineHeart />
              </IconButton>
            </div>
          )}
          <img
            title="Click to see more..."
            className={`${isHovering ? "hovered" : ""}`}
            src={process.env.REACT_APP_IMG_URL + props.movie.posterPath}
            loading="lazy"
            alt={`Missing poster picture for "${props.movie.title}"`}
            onClick={handleClick}
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
          />
        </div>
        <div className="movie-item-content-right-sidebar">
          <div className="movie-title">{props.movie.title}</div>
          <div className="movie-description">
            {props.movie.voteAverage ? (
              <AvgRating ratingNumber={props.movie.voteAverage} size="32" />
            ) : (
              <div className="row">
                <div className="value">NaN</div>
              </div>
            )}
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
