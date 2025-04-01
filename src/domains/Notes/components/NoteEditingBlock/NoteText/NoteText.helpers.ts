export const getInsertLetterInfo = (noteText: string, newNoteText: string) => {
  for (let i = 0; i < newNoteText.length; i++) {
    for (let i = 0; i < newNoteText.length; i++) {
      if (newNoteText[i] !== noteText[i]) {
        return {
          prevLetter: newNoteText[i - 1],
          insertIndex: i,
          insertLetter: newNoteText[i],
        };
      }
    }
  }

  return null;
};

export const getRemoveLetterInfo = (noteText: string, newNoteText: string) => {
  for (let i = 0; i < noteText.length; i++) {
    if (newNoteText[i] !== noteText[i]) {
      return {
        removeLetter: noteText[i],
        removeIndex: i,
      };
    }
  }

  return null;
};
