import axios from "../api/axios";

export const createAccount = async (
  email: string,
  firstName: string,
  lastName: string,
  username: string,
  password: string,
) => {
  const response = await axios
    .post("/registration", {
      accountDto: { username: username, password: password },
      userDto: { firstName: firstName, lastName: lastName, email: email },
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

export const fetchPopularMovies = async () => {
  const response = await axios.get("/collection/popular");
  return response;
};
