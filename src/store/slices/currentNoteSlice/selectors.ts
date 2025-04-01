import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export const currentNoteSelector = (state: RootState) => state.currentNote;

export const noteTitleSelector = createSelector(
  currentNoteSelector,
  (state) => state.noteTitle,
);

export const noteTextSelector = createSelector(
  currentNoteSelector,
  (state) => state.noteText,
);

export const parsedTagsSelector = createSelector(
  currentNoteSelector,
  (state) => state.parsedTags,
);

export const tagsHelperPopupSelector = createSelector(
  currentNoteSelector,
  (state) => state.tagsHelperPopup,
);
