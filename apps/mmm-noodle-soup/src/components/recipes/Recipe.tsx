import React from "react";
import { Card } from "../Card";
import { Recipe as RecipeType } from "../../data/types";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

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

  const imagePlaceholder = getImage(recipe.image.asset)

  return (
    <Card {...props}>
      <Card.Image>
        {imagePlaceholder && <GatsbyImage image={imagePlaceholder} alt={recipe.title} />}
      </Card.Image>
      <Card.Title>{recipe.title}</Card.Title>
      <Card.Description>{recipe.description}</Card.Description>
      <Card.Content>
        <h2>Ingredients</h2>
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
        <h2>Instructions</h2>
        <ol>
          {recipe.groupedInstructions.map((instruction) => (
            <li key={instruction.title}>
              <h3>{instruction.title}</h3>
              <ol>
                {instruction.instructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ol>
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
