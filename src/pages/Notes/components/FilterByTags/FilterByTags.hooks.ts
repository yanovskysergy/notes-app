import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetTagsQuery } from "@/api";
import { useAppSelector } from "@/store";
import {
  addTagFilter,
  clearTagFilters,
  removeTagFilter,
} from "@/store/slices/filterNotesSlice";
import { filterTagsSelector } from "@/store/slices/filterNotesSlice/selectors";
import type { Option } from "@shared/types/types";

export const useTagsAutocomplete = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const { data } = useGetTagsQuery();
  const filterTags = useAppSelector(filterTagsSelector);

  const options = useMemo(
    () =>
      (data || [])
        .filter(({ id }) => !filterTags.find((o) => o.id === id))
        .map(({ id, tagName }) => ({
          id,
          label: tagName,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [data, filterTags],
  );

  const onAddTag = (tagOption: Option) => {
    dispatch(addTagFilter(tagOption));
    setValue("");
  };

  const onDeleteTag = (id: string) => {
    dispatch(removeTagFilter(id));
  };

  const onClearAllTags = () => {
    dispatch(clearTagFilters());
  };

  return {
    options,
    value,
    setValue,
    onAddTag,
    onDeleteTag,
    onClearAllTags,
  };
};
