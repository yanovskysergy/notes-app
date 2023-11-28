import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { CircularProgress, IconButton, Paper, Typography } from "@mui/material";
import { NoteType } from "@/api/types";
import { BackdropLoading } from "@/shared/components/BackdropLoading";
import { TagItem } from "@/shared/components/TagItem";
import { useOnDeleteNote } from "../../Notes.hooks";
import styles from "./NoteItem.module.scss";

interface NoteItemProps {
  note: NoteType;
}

export const NoteItem: FC<NoteItemProps> = ({ note }) => {
  const navigate = useNavigate();
  const onClick = () => navigate(note.id);
  const { onDeleteNote, processing } = useOnDeleteNote();

  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onDeleteNote(note.id, note.tags);
  };

  return (
    <>
      <BackdropLoading open={processing} />
      <div className={styles["note-wrap"]} onClick={onClick}>
        <Paper elevation={3} className={styles.note}>
          <div className={styles.header}>
            <Typography variant="body1" className={styles.title}>
              {note.title || "No title"}
            </Typography>
            <IconButton size="small" onClick={onDelete} disabled={processing}>
              {processing ? (
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
                <TagItem key={tag.id} label={tag.tagName} />
              ))}
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};
