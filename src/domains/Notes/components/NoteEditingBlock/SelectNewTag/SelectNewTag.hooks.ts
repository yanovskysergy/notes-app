import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { tagsApiService } from "@/api/entities/tags";
import { TagApiType } from "@/api/entities/tags/types";
import { getTextWithFullTagName } from "@/shared/utils/tags";
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

  const { data: tags } = tagsApiService.useGetTagsQuery();

  const filteredTags = useMemo(
    () =>
      tagsHelperPopup?.prevName
        ? tags?.filter((tag) =>
            tag.name
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
        selectedTag.name,
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
