import "./style.scss";
import { FC, useEffect, useState } from "react";
import { Staff } from "../../../types";
import { fetchActorsForMovieApi } from "../../../api";
import { CircularProgress } from "@mui/material";

type Props = {
  movieId: number;
};

const MovieActors: FC<Props> = (props) => {
  const [actors, setActors] = useState<Staff[]>();

  useEffect(() => {
    const getActors = async () => {
      const response = await fetchActorsForMovieApi(props.movieId);
      if (response.status === 200) {
        setActors(response.data.filter((d: Staff) => d.profilePath !== null));
      }
    };
    getActors();
  }, []);

  const truncate = (string: string) => {
    return string.length > 20 ? string.substring(0, 20) + "..." : string;
  };

  return (
    <div className="movie-actor">
      {actors ? (
        actors.map((actor) => {
          return (
            <div className="item" key={actor.id}>
              <img src={process.env.REACT_APP_IMG_URL + actor.profilePath} />
              <div className="info">
                <div title={actor.character}>Character: {truncate(actor.character)}</div>
                <div title={actor.name}>Played by: {truncate(actor.name)}</div>
              </div>
            </div>
          );
        })
      ) : (
        <CircularProgress sx={{ color: "grey" }} />
      )}
    </div>
  );
};

export default MovieActors;
