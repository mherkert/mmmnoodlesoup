import React, { useState } from "react";
import { Card } from "../card/Card";
import {
  EditableRecipe as EditableRecipeType,
  Recipe as RecipeType,
} from "../../data/types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Tags } from "../tags/Tags";
import { Duration } from "../duration/Duration";
import { formatDate } from "../../utils/date";
import { ExternalLink } from "../links/ExternalLink";
import { Instructions } from "./instructions/RecipeInstructions";
import { Ingredients } from "./ingredients/RecipeIngredients";
import { FullscreenView } from "../FullscreenView";

type RecipeProps = {
  recipe: RecipeType | EditableRecipeType;
};

export const Recipe = ({
  recipe,
  ...props
}: RecipeProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [ingredientsMultiplier, setIngredientsMultiplier] = useState(1);

  return (
    <FullscreenView
      defaultContent={
        <RecipeFull
          {...props}
          recipe={recipe}
          ingredientsMultiplier={ingredientsMultiplier}
          setIngredientsMultiplier={setIngredientsMultiplier}
        />
      }
      fullscreenContent={
        <RecipeMinimal
          recipe={recipe}
          ingredientsMultiplier={ingredientsMultiplier}
          setIngredientsMultiplier={setIngredientsMultiplier}
        />
      }
    />
  );
};

const RecipeFull = ({
  recipe,
  ingredientsMultiplier,
  setIngredientsMultiplier,
  ...props
}: {
  recipe: RecipeType | EditableRecipeType;
  ingredientsMultiplier: number;
  setIngredientsMultiplier: (ingredientsMultiplier: number) => void;
} & React.HTMLAttributes<HTMLDivElement>) => {
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
            {recipe.tags && (
              <Tags className="mb-4" tags={recipe.tags} link={true} />
            )}
            {recipe.duration && (
              <Duration duration={recipe.duration} showDetails={true} />
            )}
          </RecipeInformation>
        </div>
      </Card.Header>
      <Card.Separator />
      <Card.Content className="grid grid-cols-1 md:grid-cols-[minmax(200px,300px)_1fr] gap-4 w-full">
        <Ingredients
          recipe={recipe}
          ingredientsMultiplier={ingredientsMultiplier}
          setIngredientsMultiplier={setIngredientsMultiplier}
        />
        <Instructions recipe={recipe} />
      </Card.Content>
      <Card.Separator />
      <Card.Footer>
        <div className="text-sm text-gray-500 text-end">
          <span>
            Added by {recipe.user?.name}{" "}
            <span className="hidden md:inline whitespace-nowrap">
              on {formatDate(recipe._createdAt!)}
            </span>
          </span>
          {" | "}
          {recipe.source && <Source source={recipe.source} />}
        </div>
      </Card.Footer>
    </Card>
  );
};

const RecipeMinimal = ({
  recipe,
  ingredientsMultiplier,
  setIngredientsMultiplier,
}: {
  recipe: RecipeType | EditableRecipeType;
  ingredientsMultiplier: number;
  setIngredientsMultiplier: (ingredientsMultiplier: number) => void;
}) => {
  return (
    <div className="h-screen">
      <Ingredients
        className="h-[40%] overflow-scroll border-b-2 border-primary-light"
        recipe={recipe}
        ingredientsMultiplier={ingredientsMultiplier}
        setIngredientsMultiplier={setIngredientsMultiplier}
      />
      <Instructions className="h-[60%] overflow-scroll" recipe={recipe} />
    </div>
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
