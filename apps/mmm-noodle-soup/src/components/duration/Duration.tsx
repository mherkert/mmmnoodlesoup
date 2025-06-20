import React from "react";
import { Duration as DurationType } from "../../data/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

type DurationProps = {
  duration: DurationType;
  showDetails?: boolean;
};

export const Duration = ({ duration, showDetails = false }: DurationProps) => {
  let { preparation, cooking, waiting } = duration;
  preparation = preparation ?? 0;
  cooking = cooking ?? 0;
  waiting = waiting ?? 0;
  const total = preparation + cooking + waiting;

  if (total === 0) return null;

  if (showDetails) {
    return (
      <table>
        <caption className="sr-only">Recipe duration breakdown</caption>
        <thead>
          <tr>
            <th scope="col" className="text-left pe-4">
              <FontAwesomeIcon
                className="pe-1"
                icon={faClock}
                aria-hidden="true"
              />{" "}
              Total
            </th>
            <th scope="col" className="text-right">
              {total} min
            </th>
          </tr>
        </thead>
        <tbody>
          {preparation !== 0 && (
            <tr className="text-primary-light/90 text-sm">
              <th scope="row" className="text-left pe-4">
                Preparation
              </th>
              <td className="text-right">{preparation} min</td>
            </tr>
          )}
          {waiting !== 0 && (
            <tr className="text-primary-light/90 text-sm">
              <th scope="row" className="text-left pe-4">
                Waiting
              </th>
              <td className="text-right">{waiting} min</td>
            </tr>
          )}
          {cooking !== 0 && (
            <tr className="text-primary-light/90 text-sm">
              <th scope="row" className="text-left pe-4">
                Cooking
              </th>
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
