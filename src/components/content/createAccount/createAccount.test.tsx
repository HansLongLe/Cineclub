import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { createAccountApi, loginApi } from "../../../api";
import CreateAccount from "./index";

jest.mock("../../../api", () => ({
  __esModule: true,
  createAccountApi: jest.fn(),
  loginApi: jest.fn()
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn()
}));

describe("CreateAccount", () => {
  global.console = {
    ...console,
    warn: jest.fn()
  };

  const setCurrentUserMock = jest.fn();

  beforeEach(() => {
    jest.spyOn(require("../../../api"), "createAccountApi").mockResolvedValue({
      status: 200,
      data: "User created successfully"
    });

    jest.spyOn(require("../../../api"), "loginApi").mockResolvedValue({
      status: 200,
      data: {
        token: "test-token",
        userId: "test-user-id"
      }
    });

    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(setCurrentUserMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("creates an account and logs in successfully", async () => {
    render(
      <MemoryRouter initialEntries={["/CreateAccount"]}>
        <Routes>
          <Route path="/CreateAccount" Component={CreateAccount} />
        </Routes>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText("Email *");
    const firstNameInput = screen.getByLabelText("First name *");
    const lastNameInput = screen.getByLabelText("Last name *");
    const usernameInput = screen.getByLabelText("Username *");
    const passwordInput = screen.getByLabelText("Password *");
    const repeatPasswordInput = screen.getByLabelText("Repeat password *");
    const signUpButton = screen.getByRole("button", { name: "SIGN UP" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(usernameInput, { target: { value: "johndoe" } });
    fireEvent.change(passwordInput, { target: { value: "TestPassword123!" } });
    fireEvent.change(repeatPasswordInput, { target: { value: "TestPassword123!" } });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(createAccountApi).toHaveBeenCalledWith(
        "test@example.com",
        "John",
        "Doe",
        "johndoe",
        "TestPassword123!"
      );
      expect(loginApi).toHaveBeenCalledWith("johndoe", "TestPassword123!");
      expect(setCurrentUserMock).toHaveBeenCalledWith({
        payload: {
          token: "test-token",
          username: "johndoe",
          userId: "test-user-id"
        },
        type: "currentUser/setCurrentUser"
      });
    });
  });

  test("displays error messages for invalid form inputs", async () => {
    render(
      <MemoryRouter initialEntries={["/CreateAccount"]}>
        <Routes>
          <Route path="/CreateAccount" Component={CreateAccount} />
        </Routes>
      </MemoryRouter>
    );

    const signUpButton = screen.getByRole("button", { name: "SIGN UP" });

    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(createAccountApi).not.toHaveBeenCalled();
      expect(loginApi).not.toHaveBeenCalled();
      expect(setCurrentUserMock).not.toHaveBeenCalled();

      expect(screen.getByText("Email cannot be empty")).toBeInTheDocument();
      expect(screen.getByText("First name cannot be empty")).toBeInTheDocument();
      expect(screen.getByText("Last name cannot be empty")).toBeInTheDocument();
      expect(screen.getByText("Username cannot be empty")).toBeInTheDocument();
      expect(screen.getByText("Password cannot be empty")).toBeInTheDocument();
      expect(screen.getByText("Repeated password cannot be empty")).toBeInTheDocument();
    });
  });
});
