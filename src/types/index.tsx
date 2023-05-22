export type Movie = {
  backdropPath: string;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  voteAverage: number;
  voteCount: number;
};

export type Genre = {
  id: number;
  name: string;
};
