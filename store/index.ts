import { configureStore } from "@reduxjs/toolkit";
import { sessionSlice } from "./session";
//import logger from "redux-logger";

const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export type { RootState };
export default store;
