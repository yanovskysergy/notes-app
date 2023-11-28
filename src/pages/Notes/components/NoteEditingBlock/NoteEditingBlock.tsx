import { CurrentTags } from "./CurrentTags";
import styles from "./NoteEditingBlock.module.scss";
import { NoteText } from "./NoteText";
import { NoteTitle } from "./NoteTitle";

export const NoteEditingBlock = () => {
  return (
    <div className={styles.container}>
      <div className={styles["short-info"]}>
        <NoteTitle />
        <CurrentTags />
      </div>
      <div className={styles["text-wrapper"]}>
        <NoteText />
      </div>
    </div>
  );
};
