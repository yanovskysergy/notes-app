import { FC } from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Chip } from "@mui/material";
import styles from "./TagItem.module.scss";

interface TagItemProps {
  label: string;
  active?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
}

export const TagItem: FC<TagItemProps> = ({
  label,
  active,
  onDelete,
  onClick,
}) => {
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
