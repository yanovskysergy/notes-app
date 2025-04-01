import { FilterByTags } from "@/domains/Notes/components/FilterByTags";
import { NoteList } from "@/domains/Notes/components/NoteList";
import { NoteListHeader } from "@/domains/Notes/components/headers/NoteListHeader";
import styles from "./Notes.module.scss";

export const NotesPage = () => {
  return (
    <>
      <NoteListHeader />
      <div className={styles.container}>
        <FilterByTags />
        <div className={styles.notes}>
          <NoteList />
        </div>
      </div>
    </>
  );
};
