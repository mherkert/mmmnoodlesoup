import React from "react";
import { render, screen } from "@testing-library/react";
import { Tags } from "./Tags";

describe("Tags", () => {
  it("render correctly", () => {
    render(
      <Tags
        tags={[
          { id: "1", name: "Tag 1" },
          { id: "2", name: "Tag 2" },
          { id: "3", name: "Tag 3" },
        ]}
      />
    );
    expect(screen.getByRole("list", { name: "Recipe tags" })).toBeInTheDocument();
    expect(screen.getByRole("listitem", { name: "Tag 1" })).toBeInTheDocument();
    expect(screen.getByRole("listitem", { name: "Tag 2" })).toBeInTheDocument();
    expect(screen.getByRole("listitem", { name: "Tag 3" })).toBeInTheDocument();
  });

  it("render correctly with max", () => {
    render(
      <Tags
        tags={[
          { id: "1", name: "Tag 1" },
          { id: "2", name: "Tag 2" },
          { id: "3", name: "Tag 3" },
        ]} max={2}
      />
    );
    expect(screen.getByRole("listitem", { name: "Tag 1" })).toBeInTheDocument();
    expect(screen.getByRole("listitem", { name: "Tag 2" })).toBeInTheDocument();
    expect(screen.queryByRole("listitem", { name: "Tag 3" })).not.toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Recipe tags" })).toBeInTheDocument();
  });

  it("render correctly with no tags", () => {
    render(
      <Tags tags={[]} />
    );
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    expect(screen.queryByRole("list", { name: "Recipe tags" })).not.toBeInTheDocument();
  });

});
