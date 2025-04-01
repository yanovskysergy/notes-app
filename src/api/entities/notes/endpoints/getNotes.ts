import { ApiBuilderType, CacheTagEnum } from "@/api/types";
import { NoteApiType } from "../types";

export const getNotes = (builder: ApiBuilderType) =>
  builder.query<NoteApiType[], void>({
    query: () => "notes",
    providesTags: [CacheTagEnum.Note],
  });
