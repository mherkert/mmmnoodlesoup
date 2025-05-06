import { Recipe } from "../../data/types";
import React from "react";
import { Heading } from "../heading/Heading";

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
      <ol>
        {recipe.groupedInstructions.map((instruction) => (
          <li key={instruction.title}>
            {instruction.title && (
              <Heading level={3}>{instruction.title}</Heading>
            )}
            <InstructionsList instructions={instruction.instructions} />
          </li>
        ))}
      </ol>
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
    <ol className={`instructions-list ${className}`}>
      {instructions.map((instruction, index) => (
        <li key={index} className="relative pl-12 mb-4 ">
          <span className="absolute left-0 top-[-6px] w-8 h-8 flex items-center justify-center text-2xl font-heading text-primary">
            {index + 1}
          </span>
          <span className="block">{instruction}</span>
        </li>
      ))}
    </ol>
  );
};
