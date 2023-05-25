import { combineReducers, applyMiddleware, configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/currentUserSlice";
import backgroundImageReducer from "./slices/backgroundImageSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";

const reducers = combineReducers({
  currentUser: currentUserReducer,
  backgroundImage: backgroundImageReducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);
composeWithDevTools(applyMiddleware(logger));

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk]
});

export type RootState = ReturnType<typeof reducers>;
