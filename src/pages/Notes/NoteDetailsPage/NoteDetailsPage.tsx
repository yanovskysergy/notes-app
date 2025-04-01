import { useParams } from "react-router-dom";
import { notesApiService } from "@/api/entities/notes";
import { NoteEditingBlock } from "@/domains/Notes/components/NoteEditingBlock";
import { NoteDetailsHeader } from "@/domains/Notes/components/headers/NoteDetailsHeader";

export const NoteDetailsPage = () => {
  const { id = "" } = useParams();
  const { data: note } = notesApiService.useGetNoteByIdQuery(id, { skip: !id });

  return (
    <>
      <NoteDetailsHeader note={note || null} />
      <NoteEditingBlock note={note || null} />
    </>
  );
};
