import React from "react";
import { Card } from "./Card";
import { RecipeSummary } from "../data/types";
import classNames from "classnames";
import { Link } from "gatsby";
export type RecipePreviewProps = {
  recipe: RecipeSummary;
};
export const RecipePreview = ({
  recipe,

  ...props
}: RecipePreviewProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Card {...props}>
      <Card.Image src={recipe.url} alt={recipe.title} />
      <Card.Title>
        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
      </Card.Title>
      <Card.Description>{recipe.description}</Card.Description>
      <Card.Footer>
        <span>{recipe.servingsCount} servings</span>
        <span>{recipe.time.preparation + recipe.time.cooking} min</span>
      </Card.Footer>
    </Card>
  );
};
