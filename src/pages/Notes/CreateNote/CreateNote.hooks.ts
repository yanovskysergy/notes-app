import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store";
import {
  closeTagsHelperPopup,
  resetCurrentNoteState,
} from "@/store/slices/currentNoteSlice";
import { currentNoteSelector } from "@/store/slices/currentNoteSlice/selectors";
import { useOnCreateNote } from "../Notes.hooks";

export const useCreateNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noteTitle, noteText } = useAppSelector(currentNoteSelector);

  const { onCreateNote, processing } = useOnCreateNote();

  useEffect(() => {
    return () => {
      dispatch(resetCurrentNoteState());
    };
  }, [dispatch]);

  const goBack = () => navigate("/notes");

  const createNoteHandler = () => {
    dispatch(closeTagsHelperPopup());
    onCreateNote(noteTitle, noteText);
  };

  return {
    processing,
    createNoteHandler,
    goBack,
  };
};
