import { FC, useRef } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";
import { TagApiType } from "@/api/types";
import { TagItem } from "@/shared/components/TagItem";
import { useSizeListener } from "@/shared/hooks/useSizeListener";
import { getPosition } from "./SelectNewTag.helpers";
import styles from "./SelectNewTag.module.scss";

interface SelectNewTagPaperViewProps {
  onSelectTag: (selectedTag: TagApiType) => void;
  closeTagPopup: () => void;
  inputSize: {
    height: number;
    width: number;
  };
  tagPosition: {
    top: number;
    left: number;
  };
  tags: TagApiType[];
}

export const SelectNewTagPaperView: FC<SelectNewTagPaperViewProps> = ({
  onSelectTag,
  closeTagPopup,
  inputSize,
  tagPosition,
  tags,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const paperSize = useSizeListener(divRef);

  return (
    <Paper
      ref={divRef}
      className={styles.container}
      style={getPosition({ tagPosition, inputSize, paperSize })}
      elevation={3}
    >
      <div className={styles.header}>
        <Typography variant="body2">Select tag</Typography>
        <IconButton onClick={closeTagPopup}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles["tag-list"]}>
        {tags?.map((tag) => (
          <TagItem
            key={tag.id}
            label={tag.tagName}
            onClick={() => onSelectTag(tag)}
          />
        ))}
      </div>
    </Paper>
  );
};
