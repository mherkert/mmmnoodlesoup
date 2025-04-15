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
  const preparation: number = recipe.duration.preparation || 0;
  const waiting: number = recipe.duration.waiting || 0;
  const cooking: number = recipe.duration.cooking || 0;

  return (
    <Link to={`/recipes/${recipe.slug.current}`}>
      <Card {...props}>
        <Card.Image src={recipe.image.toString()} alt={recipe.title} />
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Description>{recipe.description}</Card.Description>
        <Card.Footer>
          <span>{preparation + waiting + cooking} min</span>
        </Card.Footer>
      </Card>
    </Link>
  );
};
