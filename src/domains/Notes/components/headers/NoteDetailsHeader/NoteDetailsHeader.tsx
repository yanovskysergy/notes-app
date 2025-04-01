import { useNavigate } from "react-router-dom";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { notesApiService } from "@/api/entities/notes";
import { NoteApiType } from "@/api/entities/notes/types";
import { routesBook } from "@/router/RootRouter.utils";
import { BackdropLoading } from "@/shared/components/BackdropLoading";
import { Header } from "@/shared/components/Header";
import { useAppSelector } from "@/store";
import {
  noteTextSelector,
  noteTitleSelector,
} from "@/store/slices/currentNoteSlice/selectors";

interface NoteDetailsHeaderProps {
  note: NoteApiType | null;
}

export const NoteDetailsHeader = ({ note }: NoteDetailsHeaderProps) => {
  const navigate = useNavigate();

  const noteText = useAppSelector(noteTextSelector);
  const noteTitle = useAppSelector(noteTitleSelector);
  const [updateNoteMutation, { isLoading }] =
    notesApiService.useUpdateNoteByIdMutation();

  const goBack = () => navigate(routesBook.noteList());

  const updateNoteHandler = () => {
    if (note) {
      updateNoteMutation({
        id: note.id,
        text: noteText,
        title: noteTitle,
      })
        .then(() => {
          goBack();
        })
        .catch(() => {
          // TODO
          // add error handling
          console.log("Error when update note");
        });
    }
  };

  return (
    <>
      <Header
        headerLeft={
          <Button startIcon={<ArrowBackIcon />} onClick={goBack}>
            Go back to notes
          </Button>
        }
        headerRight={
          <>
            <Button onClick={goBack}>Cancel</Button>
            <Button disabled={!note} onClick={updateNoteHandler}>
              Save
            </Button>
          </>
        }
      />
      <BackdropLoading open={isLoading} />
    </>
  );
};
