import { IDType } from "@/api/types";
import { TagApiType } from "../tags/types";

export interface NoteBaseApiType {
  title: string;
  text: string;
}

export interface NoteUpdateApiType extends NoteBaseApiType {
  id: IDType;
}

export interface NoteApiType extends NoteBaseApiType {
  id: IDType;
  tags: TagApiType[];
}
