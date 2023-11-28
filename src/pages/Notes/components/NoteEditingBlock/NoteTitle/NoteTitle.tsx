import { FC } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { useAppSelector } from "@/store";
import { changeNoteTitle } from "@/store/slices/currentNoteSlice";
import { noteTitleSelector } from "@/store/slices/currentNoteSlice/selectors";

interface NoteTitleProps {}

export const NoteTitle: FC<NoteTitleProps> = () => {
  const dispatch = useDispatch();
  const title = useAppSelector(noteTitleSelector);

  return (
    <TextField
      fullWidth
      label="Title"
      size="small"
      multiline
      maxRows={4}
      value={title}
      onChange={(e) =>
        dispatch(changeNoteTitle(e.target.value.substring(0, 50)))
      }
    />
  );
};
