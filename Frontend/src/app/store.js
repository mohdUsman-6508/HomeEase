import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/user.Slice.js";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
}); //combine reducer banaya

const persistConfig = {
  key: "root",
  storage,
  version: 1,
}; //persist configure karaya

const persistedReducer = persistReducer(persistConfig, rootReducer);
//persistReducer banaya

export const store = configureStore({
  reducer: persistedReducer, //userReducer ke jagah
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
//isko main.jsx me use karenge
