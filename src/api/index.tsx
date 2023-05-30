import axios from "../api/axios";

const authorization = (token: string) => {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export const createAccountApi = async (
  email: string,
  firstName: string,
  lastName: string,
  username: string,
  password: string
) => {
  const response = await axios
    .post("/registration", {
      accountDto: { username: username, password: password },
      userDto: { firstName: firstName, lastName: lastName, email: email }
    })
    .catch((error) => error.response);
  return response;
};

export const loginApi = async (username: string, password: string) => {
  const response = await axios
    .post("/token", { username: username, password: password })
    .catch((error) => error.response);
  return response;
};

export const logoutApi = async (token: string) => {
  const response = await axios
    .post("/logout", { refreshToken: token })
    .catch((error) => error.response);
  return response;
};

export const fetchMoviesForCategoryApi = async (
  category: string,
  page?: number,
  start?: number,
  end?: number,
  period?: number
) => {
  const response = await axios
    .get(
      `/collection/${period ? category + "/" : category}${period ? period : ""}${
        page ? "?page=" + page : ""
      }${start ? "&start=" + start : ""}${end ? "&end=" + end : ""}`
    )
    .catch((error) => error.response);
  return response;
};

export const fetchGenresApi = async () => {
  const response = await axios.get("/genres").catch((error) => error.response);
  return response;
};

export const fetchLanguagesApi = async () => {
  const response = await axios.get("/language").catch((error) => error.response);
  return response;
};

export const fetchMovieInfoApi = async (movieId: number) => {
  const response = await axios.get("/movie/" + movieId).catch((error) => error.response);
  return response;
};

export const fetchListApi = async (
  path: string,
  userId: string,
  token: string,
  page?: number,
  start?: number,
  end?: number
) => {
  authorization(token);
  const response = await axios
    .get(
      page && start && end
        ? userId.length !== 0 ? path + "?userId=" + userId + "&page=" + page + "&start=" + start + "&end=" + end : path +  "?page=" + page + "&start=" + start + "&end=" + end
        : path + userId
    )
    .catch((error) => error.response);
  return response;
};

export const createListApi = async (
  title: string,
  visible: boolean,
  userId: string,
  token: string
) => {
  authorization(token);
  const response = await axios
    .post("/list", { name: title, public: visible, creatorId: userId })
    .catch((error) => error.response);
  return response;
};

export const deleteListApi = async (listId: string, userId: string, token: string) => {
  authorization(token);
  const response = await axios
    .delete("/list", { data: { listId: listId, userId: userId } })
    .catch((error) => error.response);
  return response;
};

export const saveMovieToListApi = async (
  path: string,
  movieId: number,
  userId: string,
  token: string,
  listId?: string
) => {
  authorization(token);
  const response = await axios
    .post(
      listId ? path : path + "?userid=" + userId + "&tmdbId=" + movieId,
      listId ? { listId: listId, userId: userId, tmdbId: movieId } : undefined
    )
    .catch((error) => error.response);
  return response;
};

export const deleteMovieFromListApi = async (
  path: string,
  movieId: number,
  userId: string,
  token: string,
  listId?: string
) => {
  authorization(token);
  const response = await axios
    .delete(
      listId ? path : path + "?userid=" + userId + "&tmdbId=" + movieId,
      listId ? { data: { listId: listId, userId: userId, tmdbId: movieId } } : undefined
    )
    .catch((error) => error.response);
  return response;
};

export const fetchListInfoApi = async (listId: string, token: string) => {
  authorization(token);
  const response = await axios.get("/list?listId=" + listId).catch((error) => error.response);
  return response;
};

export const fetchFilteredMovies = async (
  page: number,
  start: number,
  end: number,
  genreIds?: number[],
  year?: number,
  releasedAfter?: string,
  releasedBefore?: string,
  leastAverageVote?: number,
  language?: string,
  sortBy?: number,
  includeAdultMovies?: boolean
) => {
  const response = await axios
    .get(
      "/filter" +
        "?page=" +
        page +
        "&start=" +
        start +
        "&end=" +
        end +
        (genreIds && genreIds.length !== 0
          ? genreIds
              .map((id) => {
                return "&GenreIds=" + id;
              })
              .join("")
          : "") +
        (year && year !== 0 ? "&Year=" + year : "") +
        (releasedAfter && releasedAfter.length !== 0 ? "&ReleasedAfter=" + releasedAfter : "") +
        (releasedBefore && releasedBefore.length !== 0 ? "&ReleasedBefore=" + releasedBefore : "") +
        (leastAverageVote && leastAverageVote !== 0
          ? "&LeastVoteAverage=" + leastAverageVote
          : "") +
        (language && language.length !== 0 ? "&Language=" + language : "") +
        (sortBy ? "&sortBy=" + sortBy : "") +
        (includeAdultMovies ? "&IncludeAdultMovies=" + includeAdultMovies : "")
    )
    .catch((error) => error.response);
  return response;
};

export const movieInWatchedOrLikedApi = async (movieId: number, userId: string, token: string) => {
  authorization(token);
  const response = await axios
    .get("/moive/liked_watched?userId=" + userId + "&tmdbId=" + movieId)
    .catch((error) => error.response);
  return response;
};

export const fetchMoviesByKeywords = async (keywords: string) => {
  const response = await axios.get("/movies/" + keywords).catch((error) => error.response);
  return response;
};

export const fetchMovieInListsApi = async (movieId: number, userId: string, token: string) => {
  authorization(token);
  const response = await axios
    .get("/user/lists?userId=" + userId + "&tmdbId=" + movieId)
    .catch((error) => error.response);
  return response;
};

export const fetchActorsForMovieApi = async (movieId: number) => {
  const response = await axios.get("/cast/" + movieId).catch((error) => error.response);
  return response;
};

export const createTagApi = async (
  tagName: string,
  userId: string,
  listId: string,
  token: string
) => {
  authorization(token);
  const firstResponse = await axios
    .post("/tag", { name: tagName, userId: userId })
    .catch((error) => error.response);
  if (firstResponse.status === 200) {
    const secondResponse = await axios
      .post("/tag/list", {
        tagId: firstResponse.data.tagId,
        userId: userId,
        listId: listId
      })
      .catch((error) => error.response);
    return secondResponse;
  }
  return firstResponse;
};

export const deleteTagApi = async (tagId: string, userId: string, token: string) => {
  authorization(token);
  const response = await axios
    .delete("tag", { data: { tagId: tagId, userId: userId } })
    .catch((error) => error.response);
  return response;
};

export const saveListApi = async (userId: string, listId: string, token: string) => {
  authorization(token);
  const response = await axios
    .post("/like", { userId: userId, listId: listId })
    .catch((error) => error.response);
  return response;
};

export const unlikeListApi = async (userId: string, listId: string, token: string) => {
  authorization(token);
  const response = await axios
    .delete("/unlike", { data: { userId: userId, listId: listId } })
    .catch((error) => error.response);
  return response;
};

export const fetchMyListsTagsApi = async (userId: string, token: string) => {
  authorization(token);
  const response = await axios
    .get("/tag/my_lists?userId=" + userId)
    .catch((error) => error.response);
  return response;
};

export const fetchPublicTagsApi = async (token: string) => {
  authorization(token);
  const response = await axios.get("/tags").catch((error) => error.response);
  return response;
};

export const updateListApi = async (
  listName: string,
  listId: string,
  visibility: boolean,
  userId: string,
  token: string
) => {
  authorization(token);
  const response = await axios
    .put("/list", {
      name: listName,
      id: listId,
      public: visibility,
      creatorId: userId
    })
    .catch((error) => error.response);
  return response;
};

export const fetchPotentialLists = async (movieId: number, userId: string, token: string) => {
  authorization(token);
  const response = await axios
    .get("/user/potential_lists?userId=" + userId + "&tmdbId=" + movieId)
    .catch((error) => error.response);
  return response;
};

export const fetchTopActorsForListApi = async (listId: string, token: string) => {
  authorization(token);
  const response = await axios
    .get("/list/top_actors?listId=" + listId)
    .catch((error) => error.response);
  return response;
};

export const fetchTopDirectorsForListApi = async (listId: string, token: string) => {
  authorization(token);
  const response = await axios
    .get("/list/top_directors?listId=" + listId)
    .catch((error) => error.response);
  return response;
};
