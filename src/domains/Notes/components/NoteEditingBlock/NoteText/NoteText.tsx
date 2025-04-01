import { useRef } from "react";
import { TextField } from "@mui/material";
import { useSizeListener } from "@/shared/hooks/useSizeListener";
import { SelectNewTag } from "../SelectNewTag";
import { useInputTagsChanger } from "./NoteText.hooks";
import styles from "./NoteText.module.scss";

export const NoteText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputContainerSize = useSizeListener(containerRef);

  const { onChange, value } = useInputTagsChanger();

  return (
    <div className={styles.container}>
      <SelectNewTag inputSize={inputContainerSize} />
      <TextField
        className={styles["text-field"]}
        inputRef={containerRef}
        multiline
        fullWidth
        size="small"
        onChange={onChange}
        value={value}
        minRows={20}
      />
    </div>
  );
};
