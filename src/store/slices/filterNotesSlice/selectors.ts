import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const filterNotesSelector = (state: RootState) => state.filterNotes;

export const filterTagsSelector = createSelector(
  filterNotesSelector,
  (filterNotes) => filterNotes.tags,
);
