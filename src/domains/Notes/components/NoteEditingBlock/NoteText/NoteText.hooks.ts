import { useDispatch } from "react-redux";
import getCaretCoordinates from "textarea-caret";
import { useAppSelector } from "@/store";
import {
  changeNoteText,
  closeTagsHelperPopup,
  openTagsHelperPopup,
} from "@/store/slices/currentNoteSlice";
import {
  noteTextSelector,
  tagsHelperPopupSelector,
} from "@/store/slices/currentNoteSlice/selectors";
import { getInsertLetterInfo, getRemoveLetterInfo } from "./NoteText.helpers";

export const useInputTagsChanger = () => {
  const dispatch = useDispatch();
  const noteText = useAppSelector(noteTextSelector);
  const tagsHelperPopup = useAppSelector(tagsHelperPopupSelector);

  const tagListener = (
    newNoteText: string,
    target: HTMLInputElement | HTMLTextAreaElement,
  ) => {
    // inserting
    if (newNoteText.length > noteText.length) {
      const insertLetterInfo = getInsertLetterInfo(noteText, newNoteText);

      if (insertLetterInfo && target.selectionEnd) {
        const { insertIndex, insertLetter, prevLetter } = insertLetterInfo;

        if (
          insertLetter === "#" &&
          (!prevLetter || ["\n", " "].includes(prevLetter))
        ) {
          if (target.selectionEnd) {
            // TODO
            // remove redux integration for tags popup
            const position = getCaretCoordinates(target, target.selectionEnd);
            dispatch(openTagsHelperPopup({ position, index: insertIndex }));
          }
        } else if (tagsHelperPopup && insertLetter === " ") {
          dispatch(closeTagsHelperPopup());
        }
      }
    } else if (newNoteText.length < noteText.length) {
      // removing
      const { removeLetter } = getRemoveLetterInfo(noteText, newNoteText) || {};
      if (removeLetter === "#") {
        dispatch(closeTagsHelperPopup());
      }
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newNoteText = e.target.value;

    const [smaller, bigger] = [
      Math.min(newNoteText.length, noteText.length),
      Math.max(newNoteText.length, noteText.length),
    ];
    const isChangingByKeyboard = bigger - smaller === 1;
    if (isChangingByKeyboard) {
      tagListener(newNoteText, e.target);
    }

    dispatch(changeNoteText(e.target.value));
  };

  return {
    value: noteText,
    onChange,
  };
};
