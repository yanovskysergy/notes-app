import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useGetTagsQuery } from "@/api";
import { TagApiType } from "@/api/types";
import { getTextWithFullTagName } from "@/shared/helpers/tags.helpers";
import { useAppSelector } from "@/store";
import {
  changeNoteText,
  closeTagsHelperPopup,
} from "@/store/slices/currentNoteSlice";
import {
  noteTextSelector,
  tagsHelperPopupSelector,
} from "@/store/slices/currentNoteSlice/selectors";

export const useSelectNewTag = () => {
  const dispatch = useDispatch();
  const noteText = useAppSelector(noteTextSelector);
  const tagsHelperPopup = useAppSelector(tagsHelperPopupSelector);

  const { data: tags } = useGetTagsQuery();

  const filteredTags = useMemo(
    () =>
      tagsHelperPopup?.prevName
        ? tags?.filter((tag) =>
            tag.tagName
              .toLowerCase()
              .includes(
                tagsHelperPopup?.prevName
                  ?.toLowerCase()
                  .trim()
                  .replace("#", "") || "",
              ),
          )
        : tags,
    [tagsHelperPopup?.prevName, tags],
  );

  const onSelectTag = (selectedTag: TagApiType) => {
    if (tagsHelperPopup) {
      const newNoteText = getTextWithFullTagName(
        noteText,
        tagsHelperPopup.index,
        selectedTag.tagName,
      );

      if (newNoteText) {
        dispatch(changeNoteText(newNoteText));
        dispatch(closeTagsHelperPopup());
      }
    }
  };

  const closeTagPopup = () => dispatch(closeTagsHelperPopup());

  return {
    tags: filteredTags,
    onSelectTag,
    tagPosition: tagsHelperPopup?.position,
    closeTagPopup,
  };
};
