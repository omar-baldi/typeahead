import React, { useMemo, useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

type TypeAheadData = {
  label: string;
  value: string;
};

type Props = {
  data: TypeAheadData[];
  debounce?: number;
  label?: string;
  onOptionClick?: (v: TypeAheadData["value"]) => void;
} & React.ComponentProps<"input">;

const DEFAULT_DEBOUNCE_VALUE = 1000;

export default function TypeAhead({
  data,
  debounce = DEFAULT_DEBOUNCE_VALUE,
  label,
  onOptionClick,
  ...inputProps
}: Props) {
  const [inputV, setInputV] = useState("");
  const debouncedInputV = useDebouncedValue(inputV, debounce);

  const typeaheadOptionsElements = useMemo<JSX.Element[]>(() => {
    return data
      .filter((opt) => opt.value.toLowerCase().match(debouncedInputV.toLowerCase()))
      .map(({ label, value }) => {
        const startIdx = label.indexOf(debouncedInputV);
        const endIdx = startIdx + (debouncedInputV.length - 1);

        const chars = [...label].map((char, charIdx) => ({
          char,
          isHighlighted: charIdx >= startIdx && charIdx <= endIdx,
        }));

        return {
          chars,
          value,
        };
      })
      .map(({ chars, value }) => {
        return (
          <div key={undefined} style={{ textAlign: "start", margin: "1rem 0" }}>
            {chars.map(({ char, isHighlighted }) => {
              const charColor: React.CSSProperties["color"] = isHighlighted
                ? "orange"
                : "initial";

              return (
                <span
                  key={undefined}
                  style={{ color: charColor }}
                  onClick={() => onOptionClick?.(value)}
                >
                  {char}
                </span>
              );
            })}
          </div>
        );
      });
  }, [debouncedInputV, data, onOptionClick]);

  return (
    <>
      {label && <label htmlFor="typeahead-input">{label}</label>}

      <input
        {...inputProps}
        type="text"
        name="typeahead-input"
        value={inputV}
        onChange={(e) => setInputV(e.target.value)}
      />

      {typeaheadOptionsElements}
    </>
  );
}
