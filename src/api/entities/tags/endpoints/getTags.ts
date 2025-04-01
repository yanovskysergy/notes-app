import { ApiBuilderType, CacheTagEnum } from "@/api/types";
import { TagApiType } from "../types";

export const getTags = (builder: ApiBuilderType) =>
  builder.query<TagApiType[], void>({
    query: () => "tags",
    providesTags: [CacheTagEnum.Tag],
  });
