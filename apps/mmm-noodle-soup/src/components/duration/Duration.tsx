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

  if (total === 0) return null;

  if (showDetails) {
    return (
      <table>
        <tbody>
          <tr>
            <th className="text-left pe-4">
              <FontAwesomeIcon
                className="pe-1"
                icon={faClock}
                aria-hidden="true"
              />{" "}
              Total
            </th>
            <th className="text-right">{total} min</th>
          </tr>

          {preparation && (
            <tr className="text-primary-light/90 text-sm">
              <th className="text-left pe-4">Preparation</th>
              <td className="text-right">{preparation} min</td>
            </tr>
          )}
          {waiting && (
            <tr className="text-primary-light/90 text-sm">
              <th className="text-left pe-4">Waiting</th>
              <td className="text-right">{waiting} min</td>
            </tr>
          )}
          {cooking && (
            <tr className="text-primary-light/90 text-sm">
              <th className="text-left pe-4">Cooking</th>
              <td className="text-right">{cooking} min</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  } else
    return (
      <div className="flex items-center">
        <FontAwesomeIcon className="pe-1" icon={faClock} aria-hidden="true" />
        <span aria-label={`Total time: ${total} minutes`}>{total} min</span>
      </div>
    );
};
