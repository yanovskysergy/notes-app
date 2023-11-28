export type IDType = string;

export interface TagApiType {
  id: IDType;
  createdAt: string;
  tagName: string;
  noteIds: string[];
}

export interface NoteApiType {
  id: IDType;
  createdAt: string;
  title: string;
  text: string;
  tagIds: string[];
}

export interface NoteType extends Omit<NoteApiType, "tagIds"> {
  tags: TagApiType[];
}
