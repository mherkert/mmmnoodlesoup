import { render, screen } from "@testing-library/react";
import { Duration } from "./Duration";
import React from "react";

describe("Duration", () => {
  it("duration renders correctly", () => {
    render(
      <Duration duration={{ preparation: 10, cooking: 10, waiting: 10 }} />
    );
    expect(screen.getByTestId("font-awesome-icon")).toBeInTheDocument();
    expect(screen.getByText("30 min")).toBeInTheDocument();
  });

  it("duration renders correctly with empty duration", () => {
    render(<Duration duration={{}} />);
    expect(screen.getByTestId("font-awesome-icon")).toBeInTheDocument();
    expect(screen.getByText("0 min")).toBeInTheDocument();
  });

  it("duration renders correctly with no waiting time", () => {
    render(<Duration duration={{ preparation: 10, cooking: 10 }} />);
    expect(screen.getByTestId("font-awesome-icon")).toBeInTheDocument();
    expect(screen.getByText("20 min")).toBeInTheDocument();
  });

  it("duration renders correctly with no cooking time", () => {
    render(<Duration duration={{ preparation: 10, waiting: 10 }} />);
    expect(screen.getByTestId("font-awesome-icon")).toBeInTheDocument();
    expect(screen.getByText("20 min")).toBeInTheDocument();
  });

  it("duration renders correctly with no preparation time", () => {
    render(<Duration duration={{ cooking: 10, waiting: 10 }} />);
    expect(screen.getByTestId("font-awesome-icon")).toBeInTheDocument();
    expect(screen.getByText("20 min")).toBeInTheDocument();
  });
});
