import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, TAG_NOTE, TAG_TAG } from "./constants";
import { NoteApiType, TagApiType } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: [TAG_NOTE, TAG_TAG],
  endpoints: (builder) => ({
    getTags: builder.query<TagApiType[], void>({
      query: () => "tags",
      providesTags: [TAG_TAG],
    }),
    createTag: builder.mutation<TagApiType, Partial<TagApiType>>({
      query: (body) => ({
        url: `tags`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_TAG],
    }),
    updateTagById: builder.mutation<TagApiType, Partial<TagApiType>>({
      query: (tag) => ({
        url: `tags/${tag.id}`,
        method: "PUT",
        body: tag,
      }),
      invalidatesTags: [TAG_TAG],
    }),
    deleteTagById: builder.mutation<void, Partial<string>>({
      query: (tagId) => ({
        url: `tags/${tagId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_TAG],
    }),
    getNotes: builder.query<NoteApiType[], void>({
      query: () => "notes",
      providesTags: [TAG_NOTE],
    }),
    getNoteById: builder.query<NoteApiType, string>({
      query: (noteId) => `notes/${noteId}`,
      providesTags: [TAG_NOTE],
    }),
    createNote: builder.mutation<NoteApiType, Partial<NoteApiType>>({
      query: (body) => ({
        url: `notes`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_NOTE, TAG_TAG],
    }),
    updateNoteById: builder.mutation<NoteApiType, Partial<NoteApiType>>({
      query: (note) => ({
        url: `notes/${note.id}`,
        method: "PUT",
        body: note,
      }),
      invalidatesTags: [TAG_NOTE, TAG_TAG],
    }),
    deleteNoteById: builder.mutation<void, Partial<string>>({
      query: (noteId) => ({
        url: `notes/${noteId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_NOTE, TAG_TAG],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useCreateTagMutation,
  useUpdateTagByIdMutation,
  useDeleteTagByIdMutation,
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useCreateNoteMutation,
  useUpdateNoteByIdMutation,
  useDeleteNoteByIdMutation,
} = api;
