import React from "react";
import { Card } from "../Card";
import { Recipe as RecipeType } from "../../data/types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Tags } from "../tags/Tags";
import { Duration } from "../duration/Duration";

interface RecipeProps {
  recipe: RecipeType;
}

export const Recipe = ({
  recipe,
  ...props
}: RecipeProps & React.HTMLAttributes<HTMLDivElement>) => {
  const gatsbyImage = getImage(recipe.image?.asset);

  return (
    <Card {...props}>
      <Card.Header className="flex flex-col md:flex-row gap-4">
        <Card.Image className="flex flex-col">
          {gatsbyImage && (
            <GatsbyImage image={gatsbyImage} alt="" aria-hidden="true" />
          )}
          {recipe.imageCredit && (
            <div className="text-sm text-gray-500 text-end">
              Photo: {recipe.imageCredit}
            </div>
          )}
        </Card.Image>
        <div>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Description>{recipe.description}</Card.Description>
          <Card.Separator/>
          <RecipeInformation className="ps-4 pe-4 ">
            {/* TODO servings */}
            <Tags tags={recipe.tags} link={true} />
            <Duration duration={recipe.duration} showDetails={true} />
          </RecipeInformation>
        </div>
      </Card.Header>
      <Card.Separator/>
      <Card.Content>
        <div className="flex flex-col md:flex-row gap-4">
          <Ingredients className="md:w-1/3" recipe={recipe} />
          <Instructions className="md:w-2/3" recipe={recipe} />
        </div>
      </Card.Content>
      <Card.Footer>{/* TODO: author and source */}</Card.Footer>
    </Card>
  );
};

const RecipeInformation = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

const Heading = ({
  children,
  level = 1,
}: {
  children: React.ReactNode;
  level?: number;
}) => {
  switch (level) {
    case 1:
      return <h1 className="pt-8 pb-6">{children}</h1>;
    case 2:
      return <h2 className="pt-6 pb-4">{children}</h2>;
    case 3:
      return <h3 className="pt-4 pb-2">{children}</h3>;
    default:
      return <h1 className="pt-8 pb-6">{children}</h1>;
  }
};

const Ingredients = ({
  recipe,
  className,
}: {
  recipe: RecipeType;
  className?: string;
}) => {
  return (
    <div className={className}>
      <Heading level={2}>Ingredients</Heading>
      <ul>
        {recipe.groupedIngredients.map((ingredient) => (
          <li key={ingredient.title}>
            {ingredient.title && (
              <Heading level={3}>{ingredient.title}</Heading>
            )}
            <ul className="flex flex-col gap-1.5">
              {ingredient.ingredients.map((ingredient) => (
                <li key={ingredient.name} className="flex gap-2">
                  <span className="font-bold min-w-24 inline-block">
                    {ingredient.amount} {ingredient.unit}
                  </span>{" "}
                  <span>
                    {ingredient.name}
                    {ingredient.comment && `, ${ingredient.comment}`}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Instructions = ({
  recipe,
  className,
}: {
  recipe: RecipeType;
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

interface InstructionsListProps {
  instructions: string[];
  className?: string;
}

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
