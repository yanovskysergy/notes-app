import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateNoteMutation,
  useCreateTagMutation,
  useDeleteNoteByIdMutation,
  useDeleteTagByIdMutation,
  useGetNotesQuery,
  useGetTagsQuery,
  useUpdateNoteByIdMutation,
  useUpdateTagByIdMutation,
} from "@/api";
import { NoteApiType, TagApiType } from "@/api/types";
import { delay } from "@/shared/helpers";
import { parseTags } from "@/shared/helpers/tags.helpers";
import { useAppSelector } from "@/store";
import { filterTagsSelector } from "@/store/slices/filterNotesSlice/selectors";

export const useNoteList = () => {
  const { data: notes } = useGetNotesQuery();
  const { data: tags } = useGetTagsQuery();
  const tagFilters = useAppSelector(filterTagsSelector);

  return useMemo(() => {
    if (!notes || !tags) {
      return [];
    }

    const tagsMap = new Map(tags.map((tag) => [tag.id, tag]));

    return notes
      .filter((note) => {
        const tagIds = new Set(note.tagIds);
        return tagFilters.every((tagFilter) => tagIds.has(tagFilter.id));
      })
      .map((note) => ({
        ...note,
        tags: note.tagIds.map((id) => tagsMap.get(id)!).filter(Boolean),
      }));
  }, [notes, tags, tagFilters]);
};

const useCreateNewTags = () => {
  const [createTagMutation] = useCreateTagMutation();

  return async (newTagNames: string[], noteId: string) => {
    const promises = newTagNames.map(
      (tagName) => () => createTagMutation({ tagName, noteIds: [noteId] }),
    );
    const tagsResult: TagApiType[] = [];

    for (const promise of promises) {
      // temporary solution
      // Wait for each promise to avoid duplicates
      const res = await promise();
      await delay(1000);
      if ("data" in res) {
        tagsResult.push(res.data);
      }
    }

    return tagsResult;
  };
};

const useUpdateTagsInNote = () => {
  const { data: tags } = useGetTagsQuery();
  const [updateNoteMutation] = useUpdateNoteByIdMutation();
  const [updateTagMutation] = useUpdateTagByIdMutation();

  const createNewTags = useCreateNewTags();

  const createNewTagsForNote = async (note: NoteApiType) => {
    const tagsMap = new Map((tags || []).map((t) => [t.tagName, t]));
    const noteTagNames = new Set(parseTags(note.text));

    // create new tags and add note to each tag
    const newTagNames = [...noteTagNames].filter(
      (tagName) => !tagsMap.has(tagName),
    );
    const newTagIds = (await createNewTags(newTagNames, note.id)).map(
      (t) => t.id,
    );

    return newTagIds;
  };

  const addNoteToOldTags = async (note: NoteApiType) => {
    const tagsMap = new Map((tags || []).map((t) => [t.tagName, t]));
    const noteTagNames = new Set(parseTags(note.text));

    // add note to each existing tag
    const oldTags = [...tagsMap]
      .map((el) => el[1])
      .filter((tag) => noteTagNames.has(tag.tagName));

    for (const tagApi of oldTags) {
      if (!tagApi.noteIds.includes(note.id)) {
        await updateTagMutation({
          ...tagApi,
          noteIds: [...tagApi.noteIds, note.id],
        });
        await delay(1000);
      }
    }

    const oldTagIds = oldTags.map((t) => t.id);

    return oldTagIds;
  };

  const clearRemovedTags = async (note: NoteApiType) => {
    // Exclude noteId from tags that were removed from notes during editing
    const tagsMap = new Map((tags || []).map((t) => [t.tagName, t]));
    const noteTagNames = new Set(parseTags(note.text));
    const prevNoteTagIds = new Set(note.tagIds);

    const tagsForClear = [...tagsMap]
      .map((el) => el[1])
      .filter(
        (tag) => !noteTagNames.has(tag.tagName) && prevNoteTagIds.has(tag.id),
      );

    for (const tagApi of tagsForClear) {
      await updateTagMutation({
        ...tagApi,
        noteIds: tagApi.noteIds.filter((id) => id !== note.id),
      });
      await delay(1000);
    }
  };

  return async (note: NoteApiType) => {
    const newTagIds = await createNewTagsForNote(note);
    const oldTagIds = await addNoteToOldTags(note);
    await clearRemovedTags(note);

    // add tags to note
    await updateNoteMutation({
      ...note,
      tagIds: [...oldTagIds, ...newTagIds],
    });
  };
};

const useDeleteNoteInTags = () => {
  const [updateTagMutation] = useUpdateTagByIdMutation();
  const [deleteTagMutation] = useDeleteTagByIdMutation();

  return async (tags: TagApiType[], noteId: string) => {
    const promises = tags.map((tag) => {
      if (tag.noteIds.length <= 1) {
        return async () => await deleteTagMutation(tag.id);
      } else {
        const newNoteIds = tag.noteIds.filter((id) => id !== noteId);
        return async () =>
          await updateTagMutation({
            id: tag.id,
            noteIds: newNoteIds,
          });
      }
    });

    for (const promise of promises) {
      // temporary solution
      await promise();
      await delay(1000);
    }
  };
};

export const useOnCreateNote = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const [createNoteMutation] = useCreateNoteMutation();
  const updateTagsInNote = useUpdateTagsInNote();

  const onCreateNote = async (title: string, noteText: string) => {
    setProcessing(true);
    // create new note
    const noteResult = await createNoteMutation({
      title,
      text: noteText,
      tagIds: [],
    });

    if ("data" in noteResult) {
      const createdNote = noteResult.data;
      await updateTagsInNote(createdNote);
    }

    setProcessing(false);
    navigate("/notes");
  };

  return {
    onCreateNote,
    processing,
  };
};

export const useOnUpdateNote = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const updateTagsInNote = useUpdateTagsInNote();

  const onUpdateNote = async (
    title: string,
    text: string,
    originalNote: NoteApiType,
  ) => {
    setProcessing(true);

    await updateTagsInNote({ ...originalNote, title, text });

    setProcessing(false);
    navigate("/notes");
  };

  return {
    onUpdateNote,
    processing,
  };
};

export const useOnDeleteNote = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const deleteNoteInTags = useDeleteNoteInTags();
  const [deleteNoteMutation] = useDeleteNoteByIdMutation();

  const onDeleteNote = async (noteId: string, noteTags: TagApiType[]) => {
    setProcessing(true);

    await deleteNoteInTags(noteTags, noteId);
    await deleteNoteMutation(noteId);

    setProcessing(false);
    navigate("/notes");
  };

  return {
    onDeleteNote,
    processing,
  };
};
