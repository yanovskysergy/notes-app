import { NoteEditingBlock } from "@/domains/Notes/components/NoteEditingBlock";
import { NoteCreateHeader } from "@/domains/Notes/components/headers/NoteCreateHeader";

export const NoteCreatePage = () => {
  return (
    <>
      <NoteCreateHeader />
      <NoteEditingBlock note={null} />
    </>
  );
};
