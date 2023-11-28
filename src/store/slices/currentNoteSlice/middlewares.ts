/* eslint-disable @typescript-eslint/no-explicit-any */
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { CurrentNoteState, changeNoteText } from ".";

const listenerMiddleware = createListenerMiddleware();

const tagsLimit = 5;

listenerMiddleware.startListening({
  actionCreator: changeNoteText,
  effect: (_, { dispatch, getState }) => {
    const { parsedTags, noteText } = (getState() as any)
      .currentNote as CurrentNoteState;

    if (parsedTags.length > tagsLimit) {
      window.alert(`Please no more ${tagsLimit} unique tags per note`);

      const newText = parsedTags
        .slice(tagsLimit)
        .reduce(
          (acc, tag) => acc.replaceAll(` #${tag}`, ` INVALID_TAG:[${tag}]`),
          noteText,
        );

      if (noteText !== newText) {
        dispatch(changeNoteText(newText));
      }
    }
  },
});

export default listenerMiddleware.middleware;
