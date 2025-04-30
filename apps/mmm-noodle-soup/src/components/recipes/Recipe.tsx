import React, { useState } from "react";
import { Card } from "../Card";
import { Recipe as RecipeType } from "../../data/types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Tags } from "../tags/Tags";
import { Duration } from "../duration/Duration";
import { formatDate } from "../../utils/date";
import { ExternalLink } from "../links/ExternalLink";
import { Button } from "../buttons/Button";

interface RecipeProps {
  recipe: RecipeType;
}

export const Recipe = ({
  recipe,
  ...props
}: RecipeProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [ingredientsMultiplier, setIngredientsMultiplier] = useState(1);

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
        <div className="flex-grow">
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Description>{recipe.description}</Card.Description>
          <Card.Separator />
          <RecipeInformation className="ps-4 pe-4">
            <Tags className="mb-4" tags={recipe.tags} link={true} />
            <Duration duration={recipe.duration} showDetails={true} />
          </RecipeInformation>
        </div>
      </Card.Header>
      <Card.Separator />
      <Card.Content className="flex flex-col md:flex-row gap-4">
        <Ingredients
          className="md:w-1/3"
          recipe={recipe}
          ingredientsMultiplier={ingredientsMultiplier}
          setIngredientsMultiplier={setIngredientsMultiplier}
        />
        <Instructions className="md:w-2/3" recipe={recipe} />
      </Card.Content>
      <Card.Separator />
      <Card.Footer>
        <div className="text-sm text-gray-500 text-end">
          <span>
            Added by {recipe.user.name}{" "}
            <span className="hidden md:inline whitespace-nowrap">
              on {formatDate(recipe._createdAt)}
            </span>
          </span>{" "}
          | <Source source={recipe.source} />
        </div>
      </Card.Footer>
    </Card>
  );
};

const Source = ({ source }: { source: string }) => {
  try {
    return (
      <ExternalLink href={new URL(source).toString()}>
        Recipe Source
      </ExternalLink>
    );
  } catch (error) {
    return <span>Recipe source: {source}</span>;
  }
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

const QUANTITY_OPTIONS = [
  { label: "½ x", value: 0.5 },
  { label: "1 x", value: 1 },
  { label: "1½ x", value: 1.5 },
  { label: "2 x", value: 2 },
];

const Ingredients = ({
  recipe,
  className,
  ingredientsMultiplier,
  setIngredientsMultiplier,
}: {
  recipe: RecipeType;
  className?: string;
  ingredientsMultiplier: number;
  setIngredientsMultiplier: (ingredientsMultiplier: number) => void;
}) => {
  return (
    <div className={className}>
      <Heading level={2}>
        Ingredients{" "}
        <span className="text-sm">
          (Serves {recipe.servingsCount * ingredientsMultiplier})
        </span>
      </Heading>
      {recipe.servingsCount && (
        <div className="flex gap-2 mb-4 flex-col lg:flex-row">
          <div className="flex gap-2">
            {QUANTITY_OPTIONS.map(({ value, label }) => {
              return (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  className="w-13 whitespace-nowrap"
                  active={ingredientsMultiplier === value}
                  onClick={() => setIngredientsMultiplier(value)}
                >
                  {label}
                </Button>
              );
            })}
          </div>
          {/* <div className="content-center border-2 text-primary rounded-3xl border-primary text-5xl w-11 h-11">
            {recipe.servingsCount * ingredientsMultiplier}
          </div> */}
        </div>
      )}
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
                    {ingredient.amount &&
                      ingredient.amount * ingredientsMultiplier}{" "}
                    {ingredient.unit}
                  </span>
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
