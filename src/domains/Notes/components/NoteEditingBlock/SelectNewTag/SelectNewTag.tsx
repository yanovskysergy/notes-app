import { useSelectNewTag } from "./SelectNewTag.hooks";
import { SelectNewTagPaperView } from "./SelectNewTagPaperView";

interface SelectNewTagProps {
  inputSize: {
    height: number;
    width: number;
  };
}

export const SelectNewTag = ({ inputSize }: SelectNewTagProps) => {
  const { tags, onSelectTag, tagPosition, closeTagPopup } = useSelectNewTag();

  if (!tags?.length || !tagPosition) {
    return null;
  }

  return (
    <SelectNewTagPaperView
      onSelectTag={onSelectTag}
      closeTagPopup={closeTagPopup}
      inputSize={inputSize}
      tagPosition={tagPosition}
      tags={tags}
    />
  );
};
