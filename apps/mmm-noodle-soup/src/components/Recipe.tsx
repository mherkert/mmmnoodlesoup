import React from "react";
import { Card } from "./Card";
import { Recipe as RecipeType } from "../data/types";
import { Link } from "gatsby";

interface RecipeProps {
  recipe: RecipeType;
}

export const Recipe = ({
  recipe,
  ...props
}: RecipeProps & React.HTMLAttributes<HTMLDivElement>) => {
  const preparation: number = recipe.time.preparation || 0;
  const waiting: number = recipe.time.waiting || 0;
  const cooking: number = recipe.time.cooking || 0;

  return (
    <Card {...props}>
      <Card.Image src={recipe.image.toString()} alt={recipe.title} />
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
    // <div className="bg-white rounded-lg shadow-md overflow-hidden border border-primary/10 hover:shadow-lg transition-shadow">
    //   <div className="p-6">
    //     <h2 className="font-heading text-2xl text-primary mb-2">{title}</h2>
    //     <p className="text-gray-600 mb-4">{description}</p>
    //     <div className="flex items-center space-x-4 text-sm">
    //       <span className="flex items-center text-primary-accent">
    //         <svg
    //           className="w-4 h-4 mr-1"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    //           />
    //         </svg>
    //         {cookingTime}
    //       </span>
    //       <span className="flex items-center text-secondary-sage">
    //         <svg
    //           className="w-4 h-4 mr-1"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    //           />
    //         </svg>
    //         {difficulty}
    //       </span>
    //     </div>
    //   </div>
    // </div>
  );
};
