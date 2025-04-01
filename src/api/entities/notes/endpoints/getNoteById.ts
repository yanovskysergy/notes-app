import { ApiBuilderType, CacheTagEnum } from "@/api/types";
import { NoteApiType } from "../types";

export const getNoteById = (builder: ApiBuilderType) =>
  builder.query<NoteApiType, string>({
    query: (noteId) => `notes/${noteId}`,
    providesTags: [CacheTagEnum.Note],
  });
