import axios from "../api/axios";

export const createAccount = async (
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
    .catch((error) => {
      if (error.response) return error.response.data;
      else return error;
    });
  return response;
};

export const login = async (username: string, password: string) => {
  const response = await axios
    .post("/token", { username: username, password: password })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else {
        return error;
      }
    });
  return response;
};

export const logout = async (token: string) => {
  const response = await axios.post("/logout", { refreshToken: token });
  return response;
};

export const fetchMoviesForCategory = async (
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
    .catch((error) => error);
  return response;
};

export const fetchGenres = async () => {
  const response = await axios.get("/genres");
  return response;
};

export const fetchMovieInfo = async (movieId: number) => {
  const response = await axios.get("/movie/" + movieId);
  return response;
};

export const fetchList = async (path: string, tokenUserId: string, token?: string) => {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  const response = await axios.get(path + tokenUserId);
  return response;
};

export const fetchTags = async () => {
  const response = await axios.get("/all_lists?page=1&start=1&end=20");
  return response;
};

export const createListApi = async (
  title: string,
  visible: boolean,
  userId: string,
  token: string
) => {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  const response = await axios.post("/list", { name: title, public: visible, creatorId: userId });
  return response;
};
