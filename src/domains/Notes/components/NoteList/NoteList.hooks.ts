import { useMemo } from "react";
import { NoteApiType } from "@/api/entities/notes/types";
import { Option } from "@/shared/types/types";

export const useNotesFiltering = (
  notes?: NoteApiType[],
  tagFilters?: Option[],
) => {
  return useMemo(() => {
    if (!notes) return [];

    if (!tagFilters) return notes;

    return notes.filter((note) => {
      const tagIds = new Set(note.tags.map((t) => t.id));
      return tagFilters.every((tag) => tagIds.has(tag.id));
    });
  }, [notes, tagFilters]);
};
