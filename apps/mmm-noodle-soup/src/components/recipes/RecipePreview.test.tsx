import { render, screen } from "@testing-library/react";
import { RecipePreview } from "./RecipePreview";
import { RecipeSummary } from "../../data/types";
import React from "react";

describe("RecipePreview", () => {
  const recipe: RecipeSummary = {
    id: "1",
    title: "Recipe 1",
    description: "Description 1",
    tags: [
      { id: "1", name: "tag1", slug: { current: "tag1" } },
      { id: "2", name: "tag2", slug: { current: "tag2" } },
    ],
    duration: {
      preparation: 10,
      cooking: 10,
      waiting: 10,
    },
    slug: {
      current: "recipe-1",
    },
    image: {
      asset: {
        url: "https://via.placeholder.com/150",
      },
    },
    user: {
      id: "1",
      name: "User 1",
      email: "user1@example.com",
    },
  };
  it("should render", () => {
    render(<RecipePreview recipe={recipe} />);
    expect(screen.getByRole("link", { name: "Recipe 1" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Recipe 1" })
    ).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Total time: 30 minutes")).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: "Recipe tags" })
    ).toBeInTheDocument();
  });
});
