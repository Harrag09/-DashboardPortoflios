import { combineReducers, createStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";


import storage from "redux-persist/lib/storage"; // Import storage from redux-persist/lib
import { rootSlice } from "./slice/rootSlice";
import { modalSlice } from "./slice/Model/ModelSlice";




const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["root", 'modal'],
};
const rootReducer = combineReducers({
  root: rootSlice.reducer,
  modal: modalSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
