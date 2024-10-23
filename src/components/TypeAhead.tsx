import React, { useMemo, useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

type TypeAheadData = {
  label: string;
  value: string;
};

type Props = {
  data: TypeAheadData[];
  debounce?: number;
  maxOptions?: number;
  highlight?: boolean;
  label?: string;
  onOptionClick?: (v: TypeAheadData["value"]) => void;
} & React.ComponentProps<"input">;

const DEFAULT_MAX_OPTIONS = 10;
const DEFAULT_DEBOUNCE_VALUE = 1000;

export default function TypeAhead({
  data,
  debounce = DEFAULT_DEBOUNCE_VALUE,
  maxOptions = DEFAULT_MAX_OPTIONS,
  highlight = false,
  label,
  onOptionClick,
  ...inputProps
}: Props) {
  const [inputV, setInputV] = useState("");
  const debouncedInputV = useDebouncedValue(inputV, debounce);

  const typeaheadOptionsElements = useMemo<JSX.Element[]>(() => {
    return data
      .filter((opt) => opt.value.toLowerCase().match(debouncedInputV.toLowerCase()))
      .slice(0, maxOptions)
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
      .map(({ chars, value }, optionIdx) => {
        return (
          <div
            key={`option-${optionIdx}`}
            style={{ textAlign: "start", margin: "1rem 0" }}
          >
            {chars.map(({ char, isHighlighted }, charIdx) => {
              const charFontWeight: React.CSSProperties["fontWeight"] =
                isHighlighted && highlight ? "bolder" : "lighter";

              return (
                <span
                  key={`char-${charIdx}`}
                  style={{ fontWeight: charFontWeight }}
                  onClick={() => onOptionClick?.(value)}
                >
                  {char}
                </span>
              );
            })}
          </div>
        );
      });
  }, [debouncedInputV, data, highlight, maxOptions, onOptionClick]);

  return (
    <>
      {label && (
        <>
          <label htmlFor={inputProps.name}>{label}</label>
          <br />
        </>
      )}

      <input
        {...inputProps}
        type="text"
        value={inputV}
        onChange={(e) => setInputV(e.target.value)}
      />

      {typeaheadOptionsElements}
    </>
  );
}
