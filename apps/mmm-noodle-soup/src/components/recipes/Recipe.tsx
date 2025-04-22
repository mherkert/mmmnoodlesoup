import React from "react";
import { Card } from "../Card";
import { Recipe as RecipeType } from "../../data/types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

interface RecipeProps {
  recipe: RecipeType;
}

export const Recipe = ({
  recipe,
  ...props
}: RecipeProps & React.HTMLAttributes<HTMLDivElement>) => {
  const preparation: number = recipe.duration.preparation || 0;
  const waiting: number = recipe.duration.waiting || 0;
  const cooking: number = recipe.duration.cooking || 0;

  const gatsbyImage = getImage(recipe.image?.asset);

  return (
    <Card {...props}>
      <Card.Image>
        {gatsbyImage && (
          <GatsbyImage image={gatsbyImage} alt={recipe.title} />
        )}
      </Card.Image>
      <Card.Title>{recipe.title}</Card.Title>
      <Card.Description>{recipe.description}</Card.Description>
      <Card.Content>
        <Heading>Ingredients</Heading>
        <ul>
          {recipe.groupedIngredients.map((ingredient) => (
            <li key={ingredient.title}>
              <h3>{ingredient.title}</h3>
              <ul>
                {ingredient.ingredients.map((ingredient) => (
                  <li key={ingredient.name}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <Heading>Instructions</Heading>
        <ol>
          {recipe.groupedInstructions.map((instruction) => (
            <li key={instruction.title}>
              <h3>{instruction.title}</h3>
              {/* <ol className="counter-reset">
                {instruction.instructions.map((instruction, index) => (
                  <InstructionListItem key={index} instruction={instruction} index={index} />
                ))}
              </ol> */}
              <InstructionsList instructions={instruction.instructions} />
            </li>
          ))}
        </ol>
      </Card.Content>
      <Card.Footer>
        <span>{recipe.servingsCount} servings</span>
        <span>{preparation + waiting + cooking} min</span>
      </Card.Footer>
    </Card>
  );
};

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="pt-4 pb-2" >{children}</h2>;
};

interface InstructionsListProps {
  instructions: string[];
  className?: string;
}

export const InstructionsList: React.FC<InstructionsListProps> = ({
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
