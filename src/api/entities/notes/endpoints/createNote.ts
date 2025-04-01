import { ApiBuilderType, CacheTagEnum } from "@/api/types";
import { NoteApiType, NoteBaseApiType } from "../types";

export const createNote = (builder: ApiBuilderType) =>
  builder.mutation<NoteApiType, NoteBaseApiType>({
    query: (body) => ({
      url: "notes",
      method: "POST",
      body,
    }),
    invalidatesTags: [CacheTagEnum.Note, CacheTagEnum.Tag],
  });
