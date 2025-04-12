import React from "react";
import { Card } from "./Card";
import { RecipeSummary } from "../data/types";
import { Link } from "gatsby";
export type RecipePreviewProps = {
  recipe: RecipeSummary;
};
export const RecipePreview = ({
  recipe,
  ...props
}: RecipePreviewProps & React.HTMLAttributes<HTMLDivElement>) => {
  const preparation: number = recipe.time.preparation || 0;
  const waiting: number = recipe.time.waiting || 0;
  const cooking: number = recipe.time.cooking || 0;

  return (
    <Link to={`/recipes/${recipe.id}`}>
      <Card {...props}>
        <Card.Image src={recipe.image.toString()} alt={recipe.title} />
        <Card.Title>
          {recipe.title}
        </Card.Title>
        <Card.Description>{recipe.description}</Card.Description>
        <Card.Footer>
          <span>{recipe.servingsCount} servings</span>
          <span>{preparation + waiting + cooking} min</span>
        </Card.Footer>
      </Card>
    </Link>
  );
};
