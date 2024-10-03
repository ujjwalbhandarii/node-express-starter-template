const restrictedWords = ["apple", "ball", "cat"];

export const containsRestrictedWords = (text: string): boolean => {
  return restrictedWords.some((word) => text.toLowerCase().includes(word));
};
