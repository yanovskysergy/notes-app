import { TagItem } from "@/shared/components/TagItem";
import { useAppSelector } from "@/store";
import { parsedTagsSelector } from "@/store/slices/currentNoteSlice/selectors";
import styles from "./CurrentTags.module.scss";

export const CurrentTags = () => {
  const parsedTags = useAppSelector(parsedTagsSelector);

  return (
    <div className={styles.container}>
      {parsedTags.map((tagName) => (
        <TagItem key={tagName} label={tagName} />
      ))}
    </div>
  );
};
