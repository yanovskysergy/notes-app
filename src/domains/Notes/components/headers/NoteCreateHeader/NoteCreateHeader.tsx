import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { notesApiService } from "@/api/entities/notes";
import { routesBook } from "@/router/RootRouter.utils";
import { BackdropLoading } from "@/shared/components/BackdropLoading";
import { Header } from "@/shared/components/Header";
import { useAppSelector } from "@/store";
import { closeTagsHelperPopup } from "@/store/slices/currentNoteSlice";
import { currentNoteSelector } from "@/store/slices/currentNoteSlice/selectors";

export const NoteCreateHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { noteTitle, noteText } = useAppSelector(currentNoteSelector);
  const [createNoteMutation, { isLoading }] =
    notesApiService.useCreateNoteMutation();

  const goBack = () => navigate(routesBook.noteList());

  const createNoteHandler = () => {
    dispatch(closeTagsHelperPopup());
    createNoteMutation({ title: noteTitle, text: noteText })
      .then(() => {
        goBack();
      })
      .catch(() => {
        // TODO
        // add error handling
        console.log("Error when create note");
      });
  };

  return (
    <>
      <Header
        headerLeft={
          <Button
            disabled={isLoading}
            startIcon={<ArrowBackIcon />}
            onClick={goBack}
          >
            Go back to notes
          </Button>
        }
        headerRight={
          <Button disabled={isLoading} onClick={createNoteHandler}>
            Create note
          </Button>
        }
      />
      <BackdropLoading open={isLoading} />
    </>
  );
};
