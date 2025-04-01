import { TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/api/rootApi";
// reducers
import currentNoteReducer from "@/store/slices/currentNoteSlice";
import filterNotesReducer from "@/store/slices/filterNotesSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    filterNotes: filterNotesReducer,
    currentNote: currentNoteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
