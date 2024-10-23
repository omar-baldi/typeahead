import React, { useState } from "react";
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

  return (
    <>
      {label && <label htmlFor="typeahead-input">{label}</label>}

      <input
        type="text"
        name="typeahead-input"
        value={inputV}
        onChange={(e) => setInputV(e.target.value)}
      />
    </>
  );
}
