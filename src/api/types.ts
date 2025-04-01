import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

export type IDType = string;

export enum CacheTagEnum {
  Note = "NOTE",
  Tag = "TAG",
}

export type StoreApiPathType = "api";

export type ApiBuilderType = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    object,
    FetchBaseQueryMeta
  >,
  CacheTagEnum,
  StoreApiPathType
>;
