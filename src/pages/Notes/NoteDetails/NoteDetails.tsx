import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { BackdropLoading } from "@/shared/components/BackdropLoading";
import { Header } from "@/shared/components/Header";
import { NoteEditingBlock } from "../components/NoteEditingBlock";
import { useNoteDetails } from "./NoteDetails.hooks";

export const NoteDetails = () => {
  const { goBack, processing, updateNoteHandler } = useNoteDetails();

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
            <Button onClick={updateNoteHandler}>Save</Button>
          </>
        }
      />
      <BackdropLoading open={processing} />
      <NoteEditingBlock />
    </>
  );
};
