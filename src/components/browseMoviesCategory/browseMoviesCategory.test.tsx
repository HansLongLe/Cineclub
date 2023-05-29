import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import BrowseMoviesCategory from "./index";
import { fetchMoviesForCategoryApi } from "../../api";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";

jest.mock("../../api", () => ({
  __esModule: true,
  fetchMoviesForCategoryApi: jest.fn(),
  fetchGenresApi: jest.fn()
}));

describe("BrowseMoviesCategory", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders movie items and pagination", async () => {
    const movies = [
      { id: 1, title: "Movie 1" },
      { id: 2, title: "Movie 2" },
      { id: 3, title: "Movie 3" }
    ];
    const responseMovies = {
      data: {
        movies,
        numberOfPages: 2
      }
    };

    jest.spyOn(require("../../api"), "fetchMoviesForCategoryApi").mockResolvedValue(responseMovies);

    render(
      <BrowserRouter>
        <Provider store={store}>
          <BrowseMoviesCategory categoryName="category" period={2023} />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Movie 1")).toBeInTheDocument();
      expect(screen.getByText("Movie 2")).toBeInTheDocument();
      expect(screen.getByText("Movie 3")).toBeInTheDocument();
    });

    expect(fetchMoviesForCategoryApi).toHaveBeenCalledWith("category", 1, 1, 20, 2023);
  });

  test("changes page when pagination is clicked", async () => {
    const movies = [{ id: 1, title: "Movie 1" }];
    const responseMovies = {
      data: {
        movies,
        numberOfPages: 1
      }
    };
    jest
      .spyOn(require("../../api"), "fetchMoviesForCategoryApi")
      .mockResolvedValueOnce(responseMovies);

    render(
      <BrowserRouter>
        <Provider store={store}>
          <BrowseMoviesCategory categoryName="category" period={2023} />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Movie 1")).toBeInTheDocument();
    });

    const paginationItem = screen.getByText("1");
    paginationItem.click();

    await waitFor(() => {
      expect(fetchMoviesForCategoryApi).toHaveBeenCalledWith("category", 1, 1, 20, 2023);
    });
  });
});
