import { expect, test, describe } from "vitest";
import { render, screen } from "@/utils/test-utils";
import { vi } from "vitest";
import { BrandInput } from "@/app/components/form/brand-input";
import { ModelInput } from "@/app/components/form/model-input";
import { YearInput } from "@/app/components/form/year-input";

vi.mock("next/font/google", () => ({
  Roboto: () => ({
    style: {
      fontFamily: "mocked",
    },
  }),
}));

describe("Form", () => {
  test("it should render an select with test id = brand", () => {
    render(
      <BrandInput value={""} data={[]} onBrandChange={(e) => console.log(e)} />,
    );
    expect(screen.getByTestId("brand")).toBeDefined();
  });

  test("it should render an select with test id = model", () => {
    render(
      <ModelInput
        disabled
        value={""}
        data={[]}
        onModelChange={(e) => console.log(e)}
      />,
    );
    expect(screen.getByTestId("model")).toBeDefined();
  });

  test("it should render an select with test id = year", () => {
    render(
      <YearInput
        disabled
        value={""}
        data={[]}
        onYearChange={(e) => console.log(e)}
      />,
    );
    expect(screen.getByTestId("year")).toBeDefined();
  });
});
