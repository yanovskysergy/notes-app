export const getEndTagIndex = (noteText: string, startTagIndex: number) => {
  if (noteText.length <= startTagIndex || noteText[startTagIndex] !== "#") {
    return;
  }

  for (let i = startTagIndex + 1; i < noteText.length; i++) {
    if (noteText[i] === " ") {
      return i;
    }
  }

  return noteText.length - 1;
};

export const getTagNameByIndex = (noteText: string, startTagIndex: number) => {
  const endTagIndex = getEndTagIndex(noteText, startTagIndex);
  if (endTagIndex) {
    return noteText.substring(startTagIndex, endTagIndex + 1);
  }
};

export const getTextWithFullTagName = (
  noteText: string,
  startTagIndex: number,
  tagName: string,
) => {
  const endTagIndex = getEndTagIndex(noteText, startTagIndex);

  if (typeof endTagIndex === "number") {
    const beforeTag = noteText.substring(0, startTagIndex).trimEnd();
    const tag = `#${tagName}`;
    const afterTag = noteText.substring(endTagIndex + 1).trimStart();

    return `${beforeTag}${startTagIndex ? " " : ""}${tag} ${afterTag}`;
  }
};

const tagRegex = / #(\w+)/g;
export const parseTags = (noteText: string) =>
  [...new Set(` ${noteText}`.match(tagRegex))].map((tag) =>
    tag.replace(/ #|#/, ""),
  );
