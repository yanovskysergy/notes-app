import { Delete as DeleteIcon } from "@mui/icons-material";
import { CircularProgress, IconButton, Paper, Typography } from "@mui/material";
import { NoteApiType } from "@/api/entities/notes/types";
import { TagItem } from "@/shared/components/TagItem";
import styles from "./NoteItem.module.scss";

interface NoteItemProps {
  note: NoteApiType;
  onDeleteNote: () => void;
  onClickNote: () => void;
  isProcessing: boolean;
}

export const NoteItem = ({
  note,
  onDeleteNote,
  onClickNote,
  isProcessing,
}: NoteItemProps) => {
  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onDeleteNote();
  };

  return (
    <div className={styles["note-wrap"]} onClick={onClickNote}>
      <Paper elevation={3} className={styles.note}>
        <div className={styles.header}>
          <Typography variant="body1" className={styles.title}>
            {note.title || "No title"}
          </Typography>
          <IconButton size="small" onClick={onDelete} disabled={isProcessing}>
            {isProcessing ? (
              <CircularProgress className={styles.progress} size="small" />
            ) : (
              <DeleteIcon />
            )}
          </IconButton>
        </div>
        <Typography variant="body2" className={styles.text}>
          {note.text || "No text"}
        </Typography>
        <div className={styles["tags-wrap"]}>
          <div className={styles.tags}>
            {note.tags.map((tag) => (
              <TagItem key={tag.id} label={tag.name} />
            ))}
          </div>
        </div>
      </Paper>
    </div>
  );
};
