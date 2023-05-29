import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LeftSidebar, { LeftSidebarRef } from "./index";
import { routePaths } from "../../types/enums";
import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useParams: jest.fn()
}));

describe("LeftSidebar", () => {
  beforeEach(() => {
    jest
      .spyOn(require("react-router-dom"), "useLocation")
      .mockReturnValue({ pathname: routePaths.browseMovies });
    jest.spyOn(require("react-router-dom"), "useParams").mockReturnValue({ listId: "123" });
  });

  test("renders MovieFilters when the route is for browsing movies", () => {
    render(<LeftSidebar />);
    expect(screen.getByText("Genres")).toBeInTheDocument();
  });

  test("renders ListFilters when the route is not for browsing movies", () => {
    jest
      .spyOn(require("react-router-dom"), "useLocation")
      .mockReturnValue({ pathname: "/some-other-path" });
    render(
      <Provider store={store}>
        <LeftSidebar />
      </Provider>
    );
    expect(screen.getByText("Tags")).toBeInTheDocument();
  });

  test("calls changePage function of MovieFiltersRef when changePage is called on the component ref", () => {
    const childRef = {
      current: {
        changePage: jest.fn()
      }
    };
    const ref = React.createRef<LeftSidebarRef>();
    render(<LeftSidebar ref={ref} />);
    ref.current?.changePage(2);
    expect(childRef.current.changePage).not.toHaveBeenCalledWith(0);
  });
});
