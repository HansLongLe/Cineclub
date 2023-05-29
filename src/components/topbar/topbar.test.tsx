import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Topbar from "./index";
import * as redux from "react-redux";
import store from "../../redux/store";
import { BrowserRouter } from "react-router-dom";

describe("Topbar", () => {
  const useSelector = jest.fn();

  test("renders authentication button group when user is not logged in", () => {
    useSelector.mockImplementation(() => ({
      currentUser: { token: undefined }
    }));

    render(
      <BrowserRouter>
        <redux.Provider store={store}>
          <Topbar />
        </redux.Provider>
      </BrowserRouter>
    );

    const authenticationButtonGroup = screen.getByTestId("authentication-button-group");
    expect(authenticationButtonGroup).toBeInTheDocument();
  });
});
