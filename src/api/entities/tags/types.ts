import { IDType } from "@/api/types";

export interface TagBaseApiType {
  name: string;
}

export interface TagApiType extends TagBaseApiType {
  id: IDType;
}
