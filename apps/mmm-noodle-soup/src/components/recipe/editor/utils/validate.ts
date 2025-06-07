import { NewRecipe } from "../../../../data/types";

export function validateRecipe(obj: Partial<NewRecipe>): NewRecipe {
  if (!obj.title) {
    throw new Error("Title is required");
  }
  if (
    !obj.groupedIngredients ||
    obj.groupedIngredients.length === 0 ||
    obj.groupedIngredients.some((group) => group.ingredients.length === 0)
  ) {
    throw new Error("Ingredients are required");
  }
  if (
    !obj.groupedInstructions ||
    obj.groupedInstructions.length === 0 ||
    obj.groupedInstructions.some((group) => group.instructions.length === 0)
  ) {
    throw new Error("Instructions are required");
  }
  return obj as NewRecipe;
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
