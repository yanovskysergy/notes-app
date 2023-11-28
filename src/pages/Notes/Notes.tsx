import { useNavigate } from "react-router-dom";
import { PlusOne as PlusOneIcon } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { NoteItem } from "@/pages/Notes/components/NoteItem";
import { Header } from "@/shared/components/Header";
import { useNoteList } from "./Notes.hooks";
import styles from "./Notes.module.scss";
import { FilterByTags } from "./components/FilterByTags";

export const Notes = () => {
  const navigate = useNavigate();
  const notes = useNoteList();

  return (
    <>
      <Header
        headerLeft={<Typography variant="h6">Notes</Typography>}
        headerRight={
          <Button
            variant="outlined"
            startIcon={<PlusOneIcon color="primary" />}
            onClick={() => navigate("/notes/new-note")}
          >
            New note
          </Button>
        }
      />
      <div className={styles.container}>
        <FilterByTags />
        <div className={styles.notes}>
          {(notes || []).map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      </div>
    </>
  );
};
