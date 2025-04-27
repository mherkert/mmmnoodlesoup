import React from "react";
import { render, screen } from "@testing-library/react";
import { Tags } from "./Tags";

const tags = [
  { id: "1", name: "Tag 1", slug: { current: "tag-1" } },
  { id: "2", name: "Tag 2", slug: { current: "tag-2" } },
  { id: "3", name: "Tag 3", slug: { current: "tag-3" } },
];
describe("Tags", () => {
  it("render correctly", () => {
    render(<Tags tags={tags} />);
    expect(
      screen.getByRole("list", { name: "Recipe tags" })
    ).toBeInTheDocument();
    expect(screen.getByRole("listitem", { name: "Tag 1" })).toBeInTheDocument();
    expect(screen.getByRole("listitem", { name: "Tag 2" })).toBeInTheDocument();
    expect(screen.getByRole("listitem", { name: "Tag 3" })).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("render correctly with max", () => {
    render(<Tags tags={tags} max={2} />);
    expect(screen.getByRole("listitem", { name: "Tag 1" })).toBeInTheDocument();
    expect(screen.getByRole("listitem", { name: "Tag 2" })).toBeInTheDocument();
    expect(
      screen.queryByRole("listitem", { name: "Tag 3" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: "Recipe tags" })
    ).toBeInTheDocument();
  });

  it("render correctly with no tags", () => {
    render(<Tags tags={[]} />);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("list", { name: "Recipe tags" })
    ).not.toBeInTheDocument();
  });

  it("render correctly with link", () => {
    render(<Tags tags={tags} link={true} />);
    expect(
      screen.getByRole("list", { name: "Recipe tags" })
    ).toBeInTheDocument();
    expect(screen.getByRole("listitem", { name: "Tag 1" })).toBeInTheDocument();
    expect(screen.getByRole("listitem", { name: "Tag 2" })).toBeInTheDocument();
    expect(screen.getByRole("listitem", { name: "Tag 3" })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });
});
