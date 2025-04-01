import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NoteApiType } from "@/api/entities/notes/types";
import {
  changeNoteText,
  changeNoteTitle,
  resetCurrentNoteState,
} from "@/store/slices/currentNoteSlice";
import { CurrentTags } from "./CurrentTags";
import styles from "./NoteEditingBlock.module.scss";
import { NoteText } from "./NoteText";
import { NoteTitle } from "./NoteTitle";

interface NoteEditingBlockProps {
  note: NoteApiType | null;
}

export const NoteEditingBlock = ({ note }: NoteEditingBlockProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (note) {
      dispatch(changeNoteTitle(note.title));
      dispatch(changeNoteText(note.text));
    }

    return () => {
      dispatch(resetCurrentNoteState());
    };
  }, [dispatch, note]);

  return (
    <div className={styles.container}>
      <div className={styles["short-info"]}>
        <NoteTitle />
        <CurrentTags />
      </div>
      <div className={styles["text-wrapper"]}>
        <NoteText />
      </div>
    </div>
  );
};
