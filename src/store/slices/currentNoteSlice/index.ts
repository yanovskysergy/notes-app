import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getTagNameByIndex, parseTags } from "@/shared/utils/tags";

type TagsHelperPopup = {
  position: {
    top: number;
    left: number;
  };
  index: number;
  prevName?: string;
};

export interface CurrentNoteState {
  noteTitle: string;
  noteText: string;
  parsedTags: string[];
  tagsHelperPopup?: TagsHelperPopup;
}

const initialState: CurrentNoteState = {
  noteTitle: "",
  noteText: "",
  parsedTags: [],
  tagsHelperPopup: undefined,
};

export const currentNoteSlice = createSlice({
  name: "currentNote",
  initialState,
  reducers: {
    changeNoteTitle: (state, action: PayloadAction<string>) => {
      state.noteTitle = action.payload;
    },
    changeNoteText: (state, action: PayloadAction<string>) => {
      state.noteText = action.payload;
      state.parsedTags = parseTags(action.payload);

      if (state.tagsHelperPopup) {
        state.tagsHelperPopup = {
          ...state.tagsHelperPopup,
          prevName: getTagNameByIndex(
            state.noteText,
            state.tagsHelperPopup.index,
          ),
        };
      }
    },
    openTagsHelperPopup: (state, action: PayloadAction<TagsHelperPopup>) => {
      state.tagsHelperPopup = {
        ...action.payload,
        prevName: getTagNameByIndex(state.noteText, action.payload.index),
      };
    },
    closeTagsHelperPopup: (state) => {
      state.tagsHelperPopup = undefined;
    },
    resetCurrentNoteState: (state) => {
      state.noteTitle = initialState.noteTitle;
      state.noteText = initialState.noteText;
      state.parsedTags = [];
      state.tagsHelperPopup = initialState.tagsHelperPopup;
    },
  },
});

export const {
  changeNoteText,
  changeNoteTitle,
  openTagsHelperPopup,
  closeTagsHelperPopup,
  resetCurrentNoteState,
} = currentNoteSlice.actions;

export default currentNoteSlice.reducer;
