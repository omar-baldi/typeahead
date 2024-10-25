import TypeAhead from "@/components/TypeAhead";
import data from "@/data";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { act } from "react";
import { vi } from "vitest";

vi.useFakeTimers();

async function mockTypeaheadInputChangeEvent<W extends RenderResult>(
  wrapper: W,
  v: string,
  timerToAdvance: number
) {
  const inputElement = await wrapper.getByTestId("typeahead-input");

  act(() => {
    fireEvent.change(inputElement, {
      target: {
        value: v,
      },
    });

    vi.advanceTimersByTime(timerToAdvance);
  });
}

describe("TypeAhead", () => {
  const typeaheadData = data.map((d) => ({ label: d, value: d }));

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should render all typeahead options on component mount", async () => {
    const wrapper = render(<TypeAhead data={typeaheadData} />);
    const typeaheadOptions = await wrapper.getAllByTestId("typeahead-option");
    expect(typeaheadOptions).toHaveLength(9);
  });

  it("should render only typeahead options that match the value searched", async () => {
    const debounceValue = 1000;
    const wrapper = render(<TypeAhead data={typeaheadData} debounce={debounceValue} />);
    await mockTypeaheadInputChangeEvent(wrapper, "oo", debounceValue);
    const typeaheadOptions = await wrapper.getAllByTestId("typeahead-option");
    expect(typeaheadOptions).toHaveLength(4);
    expect(typeaheadOptions.map((t) => t.innerText)).toEqual(
      expect.arrayContaining([
        "Room Name One",
        "Room Name Two",
        "Room Name Oon",
        "Blueberry Banana Smoothie",
      ])
    );
  });

  it("should not render any typeahead options if none of them match the value searched", async () => {
    const debounceValue = 1000;
    const wrapper = render(<TypeAhead data={typeaheadData} debounce={debounceValue} />);
    await mockTypeaheadInputChangeEvent(wrapper, "_", debounceValue);
    const typeaheadOptions = await wrapper.queryAllByTestId("typeahead-option");
    expect(typeaheadOptions).toHaveLength(0);
  });
});
