import { Recipe } from "../../../data/types";
import React from "react";
import { Heading } from "../../heading/Heading";
import classNames from "classnames";
import styles from "./RecipeInstructions.module.css";

export const Instructions = ({
  recipe,
  className,
}: {
  recipe: Recipe;
  className?: string;
}) => {
  return (
    <div className={className}>
      <Heading level={2}>Instructions</Heading>
      <ul>
        {recipe.groupedInstructions.map((instruction) => (
          <li key={instruction.title}>
            {instruction.title && (
              <Heading level={3}>{instruction.title}</Heading>
            )}
            <InstructionsList instructions={instruction.instructions} />
          </li>
        ))}
      </ul>
    </div>
  );
};

type InstructionsListProps = {
  instructions: string[];
  className?: string;
};

const InstructionsList: React.FC<InstructionsListProps> = ({
  instructions,
  className = "",
}) => {
  return (
    <ol className={classNames(styles.instructionsList, className)}>
      {instructions.map((instruction, index) => (
        <li key={index}>{instruction}</li>
      ))}
    </ol>
  );
};
