import { Recipe } from "../../../data/types";
import React from "react";
import { Heading } from "../../heading/Heading";
import { Button } from "../../buttons/Button";
import { useFullscreenContext } from "../../../contexts/FullscreenContext";
import { useId } from "react";

const QUANTITY_OPTIONS = [
  { label: "½ x", value: 0.5 },
  { label: "1 x", value: 1 },
  { label: "1½ x", value: 1.5 },
  { label: "2 x", value: 2 },
];

export const Ingredients = ({
  recipe,
  className,
  ingredientsMultiplier,
  setIngredientsMultiplier,
}: {
  recipe: Recipe;
  className?: string;
  ingredientsMultiplier: number;
  setIngredientsMultiplier: (ingredientsMultiplier: number) => void;
}) => {
  const { isFullscreen } = useFullscreenContext();
  const ingredientsListId = useId();

  return (
    <div className={className}>
      {recipe.servingsCount && (
        <div aria-live="polite" className="sr-only">
          {`Ingredients updated for ${
            recipe.servingsCount * ingredientsMultiplier
          } servings.`}
        </div>
      )}
      <Heading level={2}>
        Ingredients{" "}
        {recipe.servingsCount && (
          <span className="text-sm">
            (Serves {recipe.servingsCount * ingredientsMultiplier})
          </span>
        )}
      </Heading>
      {recipe.servingsCount && (
        <div
          role="group"
          aria-label="Recipe quantity multiplier"
          className={`flex gap-2 mb-4 ${isFullscreen ? "hidden" : ""}`}
        >
          {QUANTITY_OPTIONS.map(({ value, label }) => {
            return (
              <Button
                key={value}
                variant="outline"
                size="sm"
                className="w-13 whitespace-nowrap"
                role="radio"
                active={ingredientsMultiplier === value}
                aria-checked={ingredientsMultiplier === value}
                aria-controls={ingredientsListId}
                onClick={() => setIngredientsMultiplier(value)}
              >
                {label}
              </Button>
            );
          })}
        </div>
      )}
      <ul id={ingredientsListId}>
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
