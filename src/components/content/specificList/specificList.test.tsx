import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SpecificList from "./index";
import { ListInfo } from "../../../types";
import { act } from "react-dom/test-utils";

// Mock the useLocation hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useParams: jest.fn()
}));

// Mock the useSelector hook
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

jest.mock("../../../api", () => ({
  ...jest.requireActual("../../../api"),
  fetchListInfoApi: jest.fn()
}));

describe("SpecificList", () => {
  beforeEach(() => {
    // Mock the necessary values for the useSelector hook
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue({
      currentUser: {
        token: "test-token"
      }
    });
  });

  afterEach(() => {
    jest.spyOn(require("react-redux"), "useSelector").mockReset();
    jest.spyOn(require("react-router-dom"), "useParams").mockReset();
  });

  test("renders specific list and movie items when list is available", async () => {
    // Mock the useParams hook to return the desired listId
    jest
      .spyOn(require("react-router-dom"), "useParams")
      .mockReturnValue({ listId: "test-list-id" });

    // Mock the useLocation hook to return the desired pathname
    jest
      .spyOn(require("react-router-dom"), "useLocation")
      .mockReturnValue({ pathname: "/specificList" });

    // Mock the fetchListInfoApi function
    const mockListInfo: ListInfo = {
      name: "Example List",
      id: "123456789",
      public: false,
      creatorId: "987654321",
      top5ActorsFromList: [],
      movieDtos: [],
      tagsDtos: []
    };

    jest.spyOn(require("../../../api"), "fetchListInfoApi").mockResolvedValueOnce({
      status: 200,
      data: {
        mockListInfo
      }
    });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/Home"]}>
          <SpecificList />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Private")).toBeInTheDocument();
    });
  });

  test("renders loading state when list information is not available", async () => {
    // Mock the useParams hook to return the desired listId
    jest
      .spyOn(require("react-router-dom"), "useParams")
      .mockReturnValue({ listId: "test-list-id" });

    // Mock the useLocation hook to return the desired pathname
    jest
      .spyOn(require("react-router-dom"), "useLocation")
      .mockReturnValue({ pathname: "/specificList" });

    // Mock the fetchListInfoApi function to return an error
    jest.spyOn(require("../../../api"), "fetchListInfoApi").mockResolvedValueOnce({
      status: 500
    });

    const { getByText } = render(
      <MemoryRouter>
        <SpecificList />
      </MemoryRouter>
    );

    // Wait for the list information to be fetched and rendered
    await waitFor(() => {
      expect(getByText("Tags")).toBeInTheDocument();
    });
  });
});
