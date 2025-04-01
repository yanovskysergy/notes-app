import { api } from "@/api/rootApi";
import { createNote } from "./endpoints/createNote";
import { deleteNoteById } from "./endpoints/deleteNoteById";
import { getNoteById } from "./endpoints/getNoteById";
import { getNotes } from "./endpoints/getNotes";
import { updateNoteById } from "./endpoints/updateNoteById";

const notesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // queries
    getNotes: getNotes(builder),
    getNoteById: getNoteById(builder),
    // mutations
    createNote: createNote(builder),
    updateNoteById: updateNoteById(builder),
    deleteNoteById: deleteNoteById(builder),
  }),
});

const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useCreateNoteMutation,
  useUpdateNoteByIdMutation,
  useDeleteNoteByIdMutation,
} = notesApi;

export const notesApiService = {
  // queries
  useGetNotesQuery,
  useGetNoteByIdQuery,
  // mutations
  useCreateNoteMutation,
  useUpdateNoteByIdMutation,
  useDeleteNoteByIdMutation,
};
