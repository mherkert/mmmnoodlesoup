import { render, screen } from "@testing-library/react";
import React from "react";
import { createMockRecipe } from "../../../__mocks__/recipes";
import { debug } from "jest-preview";
import { Instructions } from "./RecipeInstructions";
describe("RecipeInstructions", () => {
  it("should render", () => {
    const recipe = createMockRecipe();
    render(<Instructions recipe={recipe} />);
    expect(
      screen.getByRole("heading", { name: "Instructions", level: 2 })
    ).toBeInTheDocument();
    debug();
    expect(
      screen.getByRole("heading", { name: "Instructions Title 1", level: 3 })
    ).toBeInTheDocument();
    expect(screen.getByText("Test instruction 1")).toBeInTheDocument();
    expect(screen.getByText("Test instruction 2")).toBeInTheDocument();
    expect(screen.getByText("Test instruction 3")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Instructions Title 2", level: 3 })
    ).toBeInTheDocument();
    expect(screen.getByText("Test instruction 4")).toBeInTheDocument();
    expect(screen.getByText("Test instruction 5")).toBeInTheDocument();
  });
});
