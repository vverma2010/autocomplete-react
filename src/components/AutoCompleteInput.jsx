import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { data } from "../constants/data";
import { BookCard } from "./BookCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Autocomplete input component that fetches and filters suggestions based on user input.
 */
export const AutoCompleteInput = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [bookCardData, setBookCardData] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const debouncedInputValue = useDebounce(inputValue, 500);

  /**
   * Handles selection of a suggestion.
   * @param {Object} value - Selected suggestion object.
   */
  const handleSelect = (value) => {
    if (selectedIds.includes(value.id)) {
      toast.error("Suggestion is already in the list⚠️");
    } else {
      setInputValue(suggestions.titles[value.id]);
      setSelectedIds((prevIds) => [...prevIds, value.id]);
      setButtonDisabled(false);
      setFilteredSuggestions([]);
    }
  };

  //   Handles submission of the form.
  const handleSubmit = () => {
    const updatedBookCardData = suggestions.authors
      .filter((author) => selectedIds.includes(author.book_id))
      .map((author) => ({
        ...author,
        summary:
          suggestions.summaries.find((summary) => summary.id === author.book_id)
            ?.summary || "",
      }));

    setBookCardData(updatedBookCardData);
    toast.success("Card added successfully🎉");
    setInputValue("");
    setButtonDisabled(true);
  };

  // Fetch initial suggestions on mount
  useEffect(() => {
    setSuggestions(data);
  }, []);

  // Filter suggestions based on debounced input value
  useEffect(() => {
    if (debouncedInputValue) {
      const filtered = suggestions.summaries.filter((summaries) =>
        summaries.summary
          .toLowerCase()
          .includes(debouncedInputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [debouncedInputValue, suggestions]);

  return (
    <>
      <ToastContainer />
      <div className="autocomplete-container p-4 flex w-full flex-col">
        <div className="flex justify-center items-center w-full">
          <div className="flex justify-center items-stretch gap-4 w-full">
            <div className="w-1/3 relative">
              <input
                className="autocomplete-input p-2 border w-full "
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type to search..."
              />
              {filteredSuggestions.length > 0 && (
                <ul className="autocomplete-suggestions max-h-36 bg-slate-300 overflow-auto absolute mt-2 p-2 flex flex-col gap-2 w-full z-50">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="text-wrap border-b-2 p-2 hover:cursor-pointer hover:bg-slate-500 hover:text-white"
                      onClick={() => handleSelect(suggestion)}
                    >
                      {suggestions.titles[suggestion.id]}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              className="bg-blue-400 px-4 rounded-3xl text-white disabled:opacity-35 disabled:bg-slate-400 disabled:cursor-not-allowed "
              disabled={buttonDisabled}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-8">
          {bookCardData &&
            bookCardData.map((bookCard, bookCardIndex) => {
              return <BookCard index={bookCardIndex} data={bookCard} />;
            })}
        </div>
      </div>
    </>
  );
};
