import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { toast } from "react-toastify";
import { AutoCompleteInput } from "../../../src/components";

// Mock the useDebounce hook if it's used in your component
// jest.mock("../hooks/useDebounce", () => ({
//   __esModule: true,
//   default: jest.fn(),
// }));

describe("AutoCompleteInput", () => {
  it("should display filtered suggestions when user types in the input field", async () => {
    render(<AutoCompleteInput />);

    fireEvent.change(screen.getByPlaceholderText("Type to search..."), {
      target: { value: "success" },
    });

    // Assuming the component renders suggestions based on the input value
    await waitFor(() => {
      expect(
        screen.getByText(
          "The Most Important Thing Illuminated: Uncommon Sense for the Thoughtful Investor"
        )
      ).toBeInTheDocument();
    });
  });

  it("should show error toast when user selects a suggestion that is already in the selected list", async () => {
    render(<AutoCompleteInput />);

    fireEvent.change(screen.getByPlaceholderText("Type to search..."), {
      target: { value: "success" },
    });

    fireEvent.click(
      screen.getByText(
        "The Most Important Thing Illuminated: Uncommon Sense for the Thoughtful Investor"
      )
    );

    // Simulate a click on the same suggestion again
    fireEvent.click(
      screen.getByText(
        "The Most Important Thing Illuminated: Uncommon Sense for the Thoughtful Investor"
      )
    );

    // Wait for the toast to appear
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Suggestion is already in the list⚠️"
      );
    });
  });
});
