import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fetchMoviesByKeywords } from "../../../api";
import BrowseMovies from "./index";
import { Provider } from "react-redux";
import store from "../../../redux/store";

jest.mock("../../../api", () => ({
  __esModule: true,
  fetchFilteredMovies: jest.fn(),
  fetchMoviesByKeywords: jest.fn(),
  fetchGenresApi: jest.fn(),
  fetchLanguagesApi: jest.fn()
}));

describe("BrowseMovies", () => {
  beforeEach(() => {
    jest.spyOn(require("../../../api"), "fetchFilteredMovies").mockResolvedValue({
      status: 200,
      data: {
        movies: [],
        numberOfPages: 5
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the movie items", async () => {
    const movies = [
      { id: 1, title: "Movie 1" },
      { id: 2, title: "Movie 2" },
      { id: 3, title: "Movie 3" }
    ];

    jest.spyOn(require("../../../api"), "fetchFilteredMovies").mockResolvedValueOnce({
      status: 200,
      data: {
        movies,
        numberOfPages: 2
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/BrowseMovies"]}>
          <Routes>
            <Route path="/BrowseMovies" Component={BrowseMovies} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const movieItems = screen.getAllByTestId("movie-item");
      expect(movieItems).toHaveLength(3);
      expect(screen.getByText("Movie 1")).toBeInTheDocument();
      expect(screen.getByText("Movie 2")).toBeInTheDocument();
      expect(screen.getByText("Movie 3")).toBeInTheDocument();
    });
  });

  test("fetches movies by keyword when keyword is present in URL", async () => {
    jest.spyOn(require("../../../api"), "fetchMoviesByKeywords").mockResolvedValueOnce({
      status: 200,
      data: [
        { id: 1, title: "Movie 1" },
        { id: 2, title: "Movie 2" }
      ]
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/BrowseMovies/keyword"]}>
          <Routes>
            <Route path="/BrowseMovies/:keyword" Component={BrowseMovies} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(fetchMoviesByKeywords).toHaveBeenCalledWith("keyword");
      expect(screen.getByText("Movie 1")).toBeInTheDocument();
      expect(screen.getByText("Movie 2")).toBeInTheDocument();
    });
  });
});
