import { findAllSubstringIndexes } from "../../src/helpers";

describe("findAllSubstringIndexes", () => {
  it.each([
    ["", "Tomorrow we will be up early", []],
    ["ro", "Tomorrow we will be up early", [[5, 6]]],
  ])(
    "should return correct indexes entries of the value found in the sentence",
    (subStr, sentence, expectedIndexes) => {
      const indexes = findAllSubstringIndexes(subStr, sentence);
      expect(indexes).toEqual(expectedIndexes);
    }
  );
});
