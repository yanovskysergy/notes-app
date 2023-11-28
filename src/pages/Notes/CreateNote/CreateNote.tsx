import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { BackdropLoading } from "@/shared/components/BackdropLoading";
import { Header } from "@/shared/components/Header";
import { NoteEditingBlock } from "../components/NoteEditingBlock";
import { useCreateNote } from "./CreateNote.hooks";

export const CreateNote = () => {
  const { createNoteHandler, processing, goBack } = useCreateNote();

  return (
    <>
      <Header
        headerLeft={
          <Button
            disabled={processing}
            startIcon={<ArrowBackIcon />}
            onClick={goBack}
          >
            Go back to notes
          </Button>
        }
        headerRight={
          <Button disabled={processing} onClick={createNoteHandler}>
            Create note
          </Button>
        }
      />
      <BackdropLoading open={processing} />
      <NoteEditingBlock />
    </>
  );
};
