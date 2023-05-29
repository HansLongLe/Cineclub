import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TitleLogo from "./index";
import { routePaths } from "../../types/enums";
import * as router from "react-router";

describe("TitleLogo", () => {
  test("navigates to home when clicked", () => {
    const navigate = jest.fn();
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

    render(
      <MemoryRouter>
        <TitleLogo />
      </MemoryRouter>
    );

    const titleLogo = screen.getByTestId("title-logo");
    fireEvent.click(titleLogo);

    expect(navigate).toHaveBeenCalledWith(routePaths.home);
    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
