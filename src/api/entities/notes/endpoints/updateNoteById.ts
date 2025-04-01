import { ApiBuilderType, CacheTagEnum } from "@/api/types";
import { NoteApiType, NoteUpdateApiType } from "../types";

export const updateNoteById = (builder: ApiBuilderType) =>
  builder.mutation<NoteApiType, NoteUpdateApiType>({
    query: (note) => ({
      url: `notes/${note.id}`,
      method: "PUT",
      body: note,
    }),
    invalidatesTags: [CacheTagEnum.Note, CacheTagEnum.Tag],
  });
