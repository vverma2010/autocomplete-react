import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/react";
import App from "./App";

describe("AutoCompleteInput", () => {
  it("should render AutoCompleteInput when App is rendered", async () => {
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Type to search...")
      ).toBeInTheDocument();
    });
  });

  it("should not display suggestions when input value does not match any summaries", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Type to search...");
    fireEvent.change(input, { target: { value: "nonexistent" } });
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
