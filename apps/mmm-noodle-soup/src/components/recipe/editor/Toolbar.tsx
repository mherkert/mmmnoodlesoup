import React from "react";
import { useSlate } from "slate-react";
import { Button } from "../../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faUndo } from "@fortawesome/free-solid-svg-icons";

export const Toolbar = () => {
  const editor = useSlate();

  /** TODO: Add more buttons */
  return (
    <div className="flex flex-col md:flex-row mb-2 h-10 rounded-md justify-between">
      <div className="flex bg-white rounded-md border border-gray-200">
        <Button variant="ghost" size="sm" aria-label="Title">
          Title
        </Button>
        <Button variant="ghost" size="sm" aria-label="Title">
          Description
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            editor.undo();
          }}
          aria-label="Undo"
        >
          <FontAwesomeIcon icon={faUndo} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            editor.redo();
          }}
          aria-label="Redo"
        >
          <FontAwesomeIcon icon={faRedo} />
        </Button>
      </div>
    </div>
  );
};
