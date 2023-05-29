import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ListContent from "./index";

// Mock the useLocation hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn()
}));

// Mock the useSelector hook
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

describe("ListContent", () => {
  beforeEach(() => {
    // Mock the necessary values for the useSelector hook
    jest.spyOn(require("react-redux"), "useSelector").mockReturnValue({
      currentUser: {
        userId: "test-user-id",
        token: "test-token"
      }
    });
  });

  afterEach(() => {
    jest.spyOn(require("react-redux"), "useSelector").mockReset();
  });

  test("renders watched and liked lists when location is \"/MyLists\"", () => {
    // Mock the useLocation hook to return the desired pathname
    jest
      .spyOn(require("react-router-dom"), "useLocation")
      .mockReturnValue({ pathname: "/MyLists" });

    const { getByText } = render(
      <MemoryRouter>
        <ListContent />
      </MemoryRouter>
    );

    expect(getByText("Watched list")).toBeInTheDocument();
    expect(getByText("Liked list")).toBeInTheDocument();
    expect(getByText("Custom Lists")).toBeInTheDocument();
    expect(getByText("Saved lists")).toBeInTheDocument();
  });

  test("renders public lists when location is not \"/MyLists\"", () => {
    // Mock the useLocation hook to return a different pathname
    jest
      .spyOn(require("react-router-dom"), "useLocation")
      .mockReturnValue({ pathname: "/someOtherPath" });

    const { getByText } = render(
      <MemoryRouter>
        <ListContent />
      </MemoryRouter>
    );

    expect(getByText("Public lists")).toBeInTheDocument();
  });
});
