import { EditableRecipe } from "../../../../data/types";

export function validateRecipe(newRecipe: EditableRecipe): EditableRecipe {
  console.log("validateRecipe", { newRecipe });
  if (!newRecipe.title) {
    throw new Error("Title is required");
  }
  if (
    !newRecipe.groupedIngredients ||
    newRecipe.groupedIngredients.length === 0 ||
    newRecipe.groupedIngredients.some((group) => group.ingredients.length === 0)
  ) {
    throw new Error("Ingredients are required");
  }
  if (
    !newRecipe.groupedInstructions ||
    newRecipe.groupedInstructions.length === 0 ||
    newRecipe.groupedInstructions.some((group) => group.instructions.length === 0)
  ) {
    throw new Error("Instructions are required");
  }
  return newRecipe;
}

export type ValidationSucceeded<R> = {
  kind: "success";
  value: R;
};

export type ValidationFailed = {
  kind: "failure";
  reason: string;
};

export type ValidationResult<R> = ValidationSucceeded<R> | ValidationFailed;

export const safeNumber = (s: string): ValidationResult<number> => {
  const number = Number(s);
  if (isNaN(number)) {
    return { kind: "failure", reason: "Value should be a number" };
  }
  return { kind: "success", value: number };
};

export const nonEmptyString = (s: string): ValidationResult<string> => {
  if (s.trim() === "") {
    return { kind: "failure", reason: "Value should not be empty" };
  }
  return { kind: "success", value: s };
};
