import { Grid } from "@mui/material";
import { MovieInfo } from "../../../types";
import { FC } from "react";

type Props = {
  movie: MovieInfo;
};

const MovieDetails: FC<Props> = (props) => {
  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid item xs={6}>
        <div className="row">
          <div className="title">Original language :</div> {props.movie.originalLanguage}
        </div>
        <div className="row">
          <div className="title">Genres :</div>
          {props.movie.genres.map(
            (genre, index) =>
              `${props.movie.genres.length === index + 1 ? genre.name + " " : genre.name + ", "}`
          )}
        </div>
        <div className="row">
          <div className="title">Status :</div> {props.movie.status}
        </div>
        <div className="row">
          <div className="title">Tagline :</div> {props.movie.tagline}
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className="row">
          <div className="title">Production companies :</div>
          {props.movie.productionCompanies.map(
            (pc, index) =>
              `${
                props.movie.productionCompanies.length === index + 1
                  ? pc.name + " "
                  : pc.name + ", "
              }`
          )}
        </div>
        <div className="row">
          <div className="title">Production countries :</div>
          {props.movie.productionCountries.map(
            (pc, index) =>
              `${
                props.movie.productionCountries.length === index + 1
                  ? pc.name + " "
                  : pc.name + ", "
              }`
          )}
        </div>
        <div className="row">
          <div className="title">Budget :</div> {props.movie.budget}
        </div>
        <div className="row">
          <div className="title">Revenue :</div> {props.movie.revenue}
        </div>
      </Grid>
    </Grid>
  );
};

export default MovieDetails;
