import React from "react";
import { Duration as DurationType } from "../../data/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

type DurationProps = {
  duration: DurationType;
  showDetails?: boolean;
};

export const Duration = ({ duration, showDetails = false }: DurationProps) => {
  const { preparation, cooking, waiting } = duration;
  const total = (preparation || 0) + (cooking || 0) + (waiting || 0);

  return (
    <div className="flex items-center">
      <FontAwesomeIcon className="pe-1" icon={faClock} aria-hidden="true" />
      <span aria-label={`Total time: ${total} minutes`}>{total} min</span>
    </div>
  );
};
