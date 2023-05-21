import React from "react";
import { render } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import router from "./common/router";
import { Provider } from "react-redux";
import store from "./redux/store";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
});
