import { render, screen } from "@testing-library/react";
import { ExternalLink } from "./ExternalLink";
import React from "react";

describe("ExternalLink", () => {
  it("should render", () => {
    render(<ExternalLink href="https://www.google.com">Google</ExternalLink>);
    expect(screen.getByText("Google")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://www.google.com"
    );
    expect(screen.getByTestId("font-awesome-icon")).toBeInTheDocument();
  });

  it("should render without icon", () => {
    render(
      <ExternalLink href="https://www.google.com" showIcon={false}>
        Google
      </ExternalLink>
    );
    expect(screen.getByText("Google")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://www.google.com"
    );
    expect(screen.queryByTestId("font-awesome-icon")).not.toBeInTheDocument();
  });
});
