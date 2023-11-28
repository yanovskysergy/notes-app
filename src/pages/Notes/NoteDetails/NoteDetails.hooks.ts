import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetNoteByIdQuery } from "@/api";
import { useAppSelector } from "@/store";
import {
  changeNoteText,
  changeNoteTitle,
  resetCurrentNoteState,
} from "@/store/slices/currentNoteSlice";
import {
  noteTextSelector,
  noteTitleSelector,
} from "@/store/slices/currentNoteSlice/selectors";
import { useOnUpdateNote } from "../Notes.hooks";

export const useNoteDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: note } = useGetNoteByIdQuery(id || "", { skip: !id });
  const noteText = useAppSelector(noteTextSelector);
  const noteTitle = useAppSelector(noteTitleSelector);
  const { onUpdateNote, processing } = useOnUpdateNote();

  useEffect(() => {
    if (note) {
      dispatch(changeNoteTitle(note.title));
      dispatch(changeNoteText(note.text));

      return () => dispatch(resetCurrentNoteState());
    }
    return () => {};
  }, [dispatch, note]);

  const goBack = () => navigate("/notes");

  const updateNoteHandler = async () => {
    if (note) {
      await onUpdateNote(noteTitle, noteText, note);
      goBack();
    }
  };

  return {
    goBack,
    updateNoteHandler,
    processing: !note || processing,
  };
};
