import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPopup from "./index";
import { loginApi } from "../../api";
import { setCurrentUser } from "../../redux/slices/currentUserSlice";

jest.mock("../../api", () => ({
  loginApi: jest.fn()
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn()
}));

describe("LoginPopup", () => {
  beforeEach(() => {
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(jest.fn());
  });

  test("renders the login form correctly", () => {
    render(<LoginPopup />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("handles login with valid username and password", async () => {
    const mockDispatch = jest.fn();
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(mockDispatch);
    const mockLoginResponse = {
      status: 200,
      data: {
        token: "mockToken",
        userId: "mockUserId"
      }
    };
    jest.spyOn(require("../../api"), "loginApi").mockResolvedValue(mockLoginResponse);

    render(<LoginPopup />);
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "testpassword" } });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(loginApi).toHaveBeenCalledWith("testuser", "testpassword");
  });

  test("displays an error message for empty username and password", () => {
    render(<LoginPopup />);
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(screen.getByText("Username cannot be empty")).toBeInTheDocument();
    expect(screen.getByText("Password cannot be empty")).toBeInTheDocument();
  });
});
