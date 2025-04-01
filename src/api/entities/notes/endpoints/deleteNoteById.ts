import { ApiBuilderType, CacheTagEnum } from "@/api/types";

export const deleteNoteById = (builder: ApiBuilderType) =>
  builder.mutation<void, string>({
    query: (noteId) => ({
      url: `notes/${noteId}`,
      method: "DELETE",
    }),
    invalidatesTags: [CacheTagEnum.Note, CacheTagEnum.Tag],
  });
