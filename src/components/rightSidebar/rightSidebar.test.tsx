import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RightSidebar from "./index";
import { BrowserRouter } from "react-router-dom";
import store from "../../redux/store";
import { Provider } from "react-redux";

describe("RightSidebar", () => {
  test("renders the sidebar components correctly", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <RightSidebar />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Browse Movies")).toBeInTheDocument();
  });
});
