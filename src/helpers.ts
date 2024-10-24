export function findAllSubstringIndexes(valueToSearch: string, sentence: string) {
  valueToSearch = valueToSearch.toLowerCase();
  sentence = sentence.toLowerCase();

  if (valueToSearch.length <= 0) return [];

  const indexes: (readonly [number, number])[] = [];
  let prevEndIdxFound: number | null = null;

  while (sentence.length > 0) {
    let startIdx = sentence.indexOf(valueToSearch);

    if (startIdx < 0) break;
    if (typeof prevEndIdxFound === "number") startIdx += prevEndIdxFound + 1;

    const endIdx = startIdx + (valueToSearch.length - 1);
    const arrayIndexes = [startIdx, endIdx] as const;
    indexes.push(arrayIndexes);

    prevEndIdxFound = endIdx;
    sentence = sentence.slice(endIdx + 1);
  }

  return indexes;
}
