import { Delete as DeleteIcon } from "@mui/icons-material";
import { Chip } from "@mui/material";
import styles from "./TagItem.module.scss";

interface TagItemProps {
  label: string;
  active?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
}

export const TagItem = ({ label, active, onDelete, onClick }: TagItemProps) => {
  return (
    <Chip
      className={onDelete || onClick ? styles.tag : undefined}
      label={`#${label}`}
      onDelete={onDelete}
      deleteIcon={<DeleteIcon />}
      color="primary"
      variant={active ? "filled" : "outlined"}
      onClick={onClick}
    />
  );
};
