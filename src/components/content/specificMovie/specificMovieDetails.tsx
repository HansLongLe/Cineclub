import { FC } from "react";
import { Tab, TabList, Tabs, TabPanel } from "react-tabs";
import { MovieInfo } from "../../../types";
import MovieDetails from "./movieDetails";
import MovieActors from "./movieActors";

type Props = {
  movie: MovieInfo;
};

const SpecificMovieDetails: FC<Props> = (props) => {
  return (
    <Tabs className="tabs">
      <TabList className="tab-list">
        <Tab className="tab">Details</Tab>
        <Tab className="tab">Actors</Tab>
      </TabList>
      <TabPanel>
        <MovieDetails movie={props.movie} />
      </TabPanel>
      <TabPanel>
        <MovieActors movieId={props.movie.id} />
      </TabPanel>
    </Tabs>
  );
};

export default SpecificMovieDetails;
