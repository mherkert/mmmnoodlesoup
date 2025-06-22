import React from "react";
import { Button } from "../../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faSave } from "@fortawesome/free-solid-svg-icons";

type StepperProps = {
  onEdit: () => void;
  onPreview: () => void;
  onSubmit: () => void;
};

// TODO: very rudimentarey for now. Will be improved later.
export const Stepper = ({ onEdit, onPreview, onSubmit }: StepperProps) => {
  return (
    <div className="flex flex-col md:flex-row mb-2 h-10 rounded-md justify-between">
      <div className="flex bg-white rounded-md border border-gray-200">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <FontAwesomeIcon icon={faPencil} />
          Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={onPreview}>
          <FontAwesomeIcon icon={faEye} />
          Preview
        </Button>
        <Button variant="ghost" size="sm" onClick={onSubmit}>
          <FontAwesomeIcon icon={faSave} />
          Save
        </Button>
      </div>
    </div>
  );
};
