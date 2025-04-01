import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Option } from "@shared/types/types";

export interface FilterNotesState {
  tags: Option[];
}

const initialState: FilterNotesState = {
  tags: [],
};

export const filterNotesSlice = createSlice({
  name: "filterNotes",
  initialState,
  reducers: {
    addTagFilter: (state, action: PayloadAction<Option>) => {
      state.tags.push(action.payload);
    },
    removeTagFilter: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter(({ id }) => id !== action.payload);
    },
    clearTagFilters: (state) => {
      state.tags = [];
    },
  },
});

export const { addTagFilter, removeTagFilter, clearTagFilters } =
  filterNotesSlice.actions;

export default filterNotesSlice.reducer;
