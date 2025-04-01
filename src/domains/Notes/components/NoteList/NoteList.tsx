import { useNavigate } from "react-router-dom";
import { notesApiService } from "@/api/entities/notes";
import { routesBook } from "@/router/RootRouter.utils";
import { BackdropLoading } from "@/shared/components/BackdropLoading";
import { useAppSelector } from "@/store";
import { filterTagsSelector } from "@/store/slices/filterNotesSlice/selectors";
import { NoteItem } from "../NoteItem";
import { useNotesFiltering } from "./NoteList.hooks";

export const NoteList = () => {
  const navigate = useNavigate();

  const tagFilters = useAppSelector(filterTagsSelector);
  const { data: notes } = notesApiService.useGetNotesQuery();
  const filteredNotes = useNotesFiltering(notes, tagFilters);

  const [deleteNoteMutation, { isLoading: isDeleteProcessing }] =
    notesApiService.useDeleteNoteByIdMutation();

  const onDeleteNote = (id: string) => {
    deleteNoteMutation(id).catch(() => {
      // TODO
      // add error handling
      console.log("Error when delete note");
    });
  };

  return (
    <>
      {filteredNotes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDeleteNote={() => onDeleteNote(note.id)}
          onClickNote={() => navigate(routesBook.noteDetails(note.id))}
          isProcessing={isDeleteProcessing}
        />
      ))}
      <BackdropLoading open={isDeleteProcessing} />
    </>
  );
};
