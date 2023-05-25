export type Movie = {
  backdropPath: string;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  popularity: number;
  posterPath: string;
  releaseDate: Date;
  title: string;
  voteAverage: number;
  voteCount: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type MovieInfo = {
  id: number;
  budget: number;
  genres: Genre[];
  images: string[];
  imdbId: string;
  originalLanguage: string;
  overview: string;
  popularity: number;
  productionCompanies: ProductionCompanies[];
  productionCountries: ProductionCountries[];
  releaseDate: Date;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  voteAverage: number;
  voteCount: number;
  backdropPath: string;
  posterPath: string;
  homepage?: string;
  keywordsContainer?: string;
  originalTitile?: string;
  reviews?: string[];
};

export type ProductionCompanies = {
  id: number;
  logoPath: string;
  name: string;
  originCountry: string;
};

export type ProductionCountries = {
  iso_3166_1: string;
  name: string;
};
