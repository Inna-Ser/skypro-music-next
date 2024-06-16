import {
    configureStore
} from "@reduxjs/toolkit";
import trackSlice from "./features/trackSlice";
import volumeSlice from "./features/volumeSlice";
import {
    tracksApi
} from "../services/tracks";
import { authApi } from "../services/auth";

export const store = configureStore({
    reducer: {
        [tracksApi.reducerPath]: tracksApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        tracks: trackSlice,
        volume: volumeSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([tracksApi.middleware, authApi.middleware])
});