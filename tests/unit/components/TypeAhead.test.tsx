import TypeAhead from "@/components/TypeAhead";
import data from "@/data";
import { render } from "@testing-library/react";
import { vi } from "vitest";

vi.useFakeTimers();

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
});
