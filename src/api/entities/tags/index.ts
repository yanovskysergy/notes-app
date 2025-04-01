import { api } from "@/api/rootApi";
import { getTags } from "./endpoints/getTags";

const tagsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTags: getTags(build),
  }),
});

const { useGetTagsQuery } = tagsApi;

export const tagsApiService = { useGetTagsQuery };
