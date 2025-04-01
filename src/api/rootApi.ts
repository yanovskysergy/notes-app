import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV } from "@/shared/constants/env";
import { STORE_API_PATH } from "./constants";
import { CacheTagEnum } from "./types";

export const api = createApi({
  reducerPath: STORE_API_PATH,
  baseQuery: fetchBaseQuery({ baseUrl: ENV.API_URL }),
  tagTypes: Object.values(CacheTagEnum),
  endpoints: () => ({}),
});
