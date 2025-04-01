import { useNavigate } from "react-router-dom";
import { PlusOne as PlusOneIcon } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { routesBook } from "@/router/RootRouter.utils";
import { Header } from "@/shared/components/Header";

export const NoteListHeader = () => {
  const navigate = useNavigate();

  const onNewNoteClick = () => {
    navigate(routesBook.noteCreate());
  };

  return (
    <Header
      headerLeft={<Typography variant="h6">Notes</Typography>}
      headerRight={
        // TODO
        // Move Buttons & Inputs & Icons to src/ui
        <Button
          variant="outlined"
          startIcon={<PlusOneIcon color="primary" />}
          onClick={onNewNoteClick}
        >
          New note
        </Button>
      }
    />
  );
};
