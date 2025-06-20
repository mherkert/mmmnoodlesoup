import { render, screen, within } from "@testing-library/react";
import { Duration } from "./Duration";
import React from "react";

describe("Duration", () => {
  describe("without showDetails", () => {
    it("duration renders correctly", () => {
      render(
        <Duration duration={{ preparation: 10, cooking: 10, waiting: 10 }} />
      );
      expect(screen.getByTestId("font-awesome-icon")).toBeInTheDocument();
      expect(screen.getByText("30 min")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Total time: 30 minutes")
      ).toBeInTheDocument();
    });

    it("duration renders correctly with empty duration", () => {
      render(<Duration duration={{}} />);
      expect(screen.queryByTestId("font-awesome-icon")).not.toBeInTheDocument();
      expect(screen.queryByText("Total time")).not.toBeInTheDocument();
    });

    it("duration renders correctly with no waiting time", () => {
      render(<Duration duration={{ preparation: 10, cooking: 10 }} />);
      expect(screen.getByTestId("font-awesome-icon")).toBeInTheDocument();
      expect(screen.getByText("20 min")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Total time: 20 minutes")
      ).toBeInTheDocument();
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
      expect(
        screen.getByLabelText("Total time: 20 minutes")
      ).toBeInTheDocument();
    });
  });

  describe("with showDetails", () => {
    it("duration renders correctly", () => {
      render(
        <Duration
          duration={{ preparation: 10, cooking: 10, waiting: 10 }}
          showDetails
        />
      );
      expect(screen.getByTestId("font-awesome-icon")).toBeInTheDocument();

      expect(
        screen.getByRole("rowheader", { name: "Preparation" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("rowheader", { name: "Cooking" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("rowheader", { name: "Waiting" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("columnheader", { name: "Total" })
      ).toBeInTheDocument();
      expect(
        within(screen.getAllByRole("row")[0]).getByText("30 min")
      ).toBeInTheDocument();
      expect(
        within(screen.getAllByRole("row")[1]).getByText("10 min")
      ).toBeInTheDocument();
      expect(
        within(screen.getAllByRole("row")[2]).getByText("10 min")
      ).toBeInTheDocument();
      expect(
        within(screen.getAllByRole("row")[3]).getByText("10 min")
      ).toBeInTheDocument();
    });

    it("duration renders correctly with empty duration", () => {
      render(<Duration duration={{}} showDetails />);
      expect(screen.queryByTestId("font-awesome-icon")).not.toBeInTheDocument();
      expect(
        screen.queryByRole("columnheader", { name: "Total" })
      ).not.toBeInTheDocument();
    });
  });

  it("duration renders correctly with no waiting time", () => {
    render(
      <Duration duration={{ preparation: 10, cooking: 10 }} showDetails />
    );
    expect(screen.getByTestId("font-awesome-icon")).toBeInTheDocument();
    expect(
      screen.getByRole("rowheader", { name: "Preparation" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("rowheader", { name: "Cooking" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Total" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("rowheader", { name: "Waiting" })
    ).not.toBeInTheDocument();
   
  });
});
