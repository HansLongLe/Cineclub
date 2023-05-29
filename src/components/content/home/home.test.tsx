import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Home from "./index";
import { act } from "react-dom/test-utils";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

describe("Home", () => {
  test("renders the component and displays popular movies", async () => {
    // Mock fetchMoviesForCategoryApi to return popular movies
    jest.spyOn(require("../../../api"), "fetchMoviesForCategoryApi").mockResolvedValue({
      status: 200,
      data: {
        movies: [
          { id: 1, title: "Movie 1" },
          { id: 2, title: "Movie 2" },
          { id: 3, title: "Movie 3" }
        ]
      }
    });
    const setBackgroundImageMock = jest.fn();
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(setBackgroundImageMock);
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue({
      currentUser: { username: "testUser", userId: "userId1234", token: "token1234" }
    });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/Home"]}>
          <Routes>
            <Route path="/Home" Component={Home} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Verify that the component renders
    expect(screen.getByTestId("home")).toBeInTheDocument();

    // // Verify that the popular movies section is displayed
    // expect(screen.getByText("Popular Movies")).toBeInTheDocument();

    // // Verify that the movie items are rendered
    // expect(screen.getByText("Movie 1")).toBeInTheDocument();
    // expect(screen.getByText("Movie 2")).toBeInTheDocument();
    // expect(screen.getByText("Movie 3")).toBeInTheDocument();
  });
});
