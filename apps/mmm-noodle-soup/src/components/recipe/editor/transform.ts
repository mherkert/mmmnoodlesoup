import { Descendant } from "slate";
import {
  GroupedIngredients,
  GroupedInstructions,
  Recipe,
  NewRecipe,
} from "../../../data/types";
import {
  TitleType,
  DescriptionType,
  ServingsCountType,
  DurationPreparationType,
  DurationCookingType,
  DurationWaitingType,
  IngredientsTitleType,
  IngredientsType,
  IngredientsAmountType,
  IngredientsUnitType,
  IngredientsNameType,
  IngredientsCommentType,
  InstructionsType,
  InstructionsTitleType,
  InstructionType,
} from "./types";
import {
  IngredientsCommentText,
  IngredientsAmountText,
  IngredientsNameText,
  IngredientsTitleElement,
  IngredientsUnitText,
  AnyText,
  InstructionsTitleElement,
  InstructionElement,
  ParagraphElement,
} from "./slate";

export const recipeToSlate = (recipe: Recipe): Descendant[] => {
  const slate: Descendant[] = [];

  if (recipe.title) {
    slate.push({ type: TitleType, children: [{ text: recipe.title }] });
  }

  if (recipe.description) {
    slate.push({
      type: DescriptionType,
      children: [{ text: recipe.description }],
    });
  }

  if (recipe.duration) {
    if (recipe.duration.preparation) {
      slate.push({
        type: "paragraph",
        children: [
          {
            type: DurationPreparationType,
            text: String(recipe.duration.preparation),
          },
        ],
      });
    }

    if (recipe.duration.waiting) {
      slate.push({
        type: "paragraph",
        children: [
          {
            type: DurationWaitingType,
            text: String(recipe.duration.waiting),
          },
        ],
      });
    }

    if (recipe.duration.cooking) {
      slate.push({
        type: "paragraph",
        children: [
          {
            type: DurationCookingType,
            text: String(recipe.duration.cooking),
          },
        ],
      });
    }
  }

  if (recipe.servingsCount) {
    slate.push({
      type: "paragraph",
      children: [
        { type: ServingsCountType, text: String(recipe.servingsCount) },
      ],
    });
  }

  if (recipe.groupedIngredients) {
    recipe.groupedIngredients.forEach(
      (groupedIngredients: GroupedIngredients) => {
        const ingredientGroupChildren: (
          | IngredientsTitleElement
          | ParagraphElement
        )[] = []; // can have a title and multiple paragraphs

        if (groupedIngredients.title) {
          ingredientGroupChildren.push({
            type: IngredientsTitleType,
            children: [{ text: groupedIngredients.title }],
          });
        }
        if (groupedIngredients.ingredients) {
          groupedIngredients.ingredients.forEach((ingredient) => {
            const ingredientChildren: (
              | IngredientsAmountText
              | IngredientsUnitText
              | IngredientsNameText
              | IngredientsCommentText
              | AnyText
            )[] = [];
            if (ingredient.amount) {
              ingredientChildren.push({
                text: String(ingredient.amount),
                type: IngredientsAmountType,
              });
              ingredientChildren.push({
                text: " ",
              });
            }
            if (ingredient.unit) {
              ingredientChildren.push({
                text: String(ingredient.unit),
                type: IngredientsUnitType,
              });
              ingredientChildren.push({
                text: " ",
              });
            }
            if (ingredient.name) {
              ingredientChildren.push({
                text: String(ingredient.name),
                type: IngredientsNameType,
              });
              ingredientChildren.push({
                text: " ",
              });
            }
            if (ingredient.comment) {
              ingredientChildren.push({
                text: String(ingredient.comment),
                type: IngredientsCommentType,
              });
              ingredientChildren.push({
                text: " ",
              });
            }
            ingredientGroupChildren.push({
              type: "paragraph",
              children: ingredientChildren,
            });
          });
        }
        slate.push({
          type: IngredientsType,
          children: ingredientGroupChildren,
        });
      }
    );
  }

  if (recipe.groupedInstructions) {
    recipe.groupedInstructions.forEach(
      (groupedInstructions: GroupedInstructions) => {
        const instructionGroupChildren: (
          | InstructionsTitleElement
          | InstructionElement
        )[] = [];

        if (groupedInstructions.title) {
          instructionGroupChildren.push({
            type: InstructionsTitleType,
            children: [{ text: groupedInstructions.title }],
          });
        }
        if (groupedInstructions.instructions) {
          groupedInstructions.instructions.forEach((instruction) => {
            instructionGroupChildren.push({
              type: InstructionType,
              children: [{ text: instruction }],
            });
          });
        }
        slate.push({
          type: InstructionsType,
          children: instructionGroupChildren,
        });
      }
    );
  }
  return slate;
};

type RecipeInTraining = Partial<NewRecipe>;

export const slateToRecipe = (slate: Descendant[]): NewRecipe => {
  const recipeInTraining: RecipeInTraining = {};

  const queue: Descendant[] = [...slate];

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    switch (currentNode.type) {
      case TitleType:
        recipeInTraining.title = currentNode.children[0].text;
        break;
      case DescriptionType:
        recipeInTraining.description = currentNode.children[0].text;
        break;
      case DurationPreparationType: {
        if (!recipeInTraining.duration) {
          recipeInTraining.duration = {};
        }
        const result = safeNumber(currentNode.text);
        if (result.kind === "success") {
          recipeInTraining.duration.preparation = result.value;
        } else
          throw new Error("Failed to convert preparation duration to number.");
        break;
      }
      case DurationWaitingType: {
        if (!recipeInTraining.duration) {
          recipeInTraining.duration = {};
        }
        const result = safeNumber(currentNode.text);
        if (result.kind === "success") {
          recipeInTraining.duration.waiting = result.value;
        } else throw new Error("Failed to convert waiting duration to number.");
        break;
      }
      case DurationCookingType: {
        if (!recipeInTraining.duration) {
          recipeInTraining.duration = {};
        }
        const result = safeNumber(currentNode.text);
        if (result.kind === "success") {
          recipeInTraining.duration.cooking = result.value;
        } else throw new Error("Failed to convert cooking duration to number.");
        break;
      }
      case ServingsCountType: {
        const result = safeNumber(currentNode.text);
        if (result.kind === "success") {
          recipeInTraining.servingsCount = result.value;
        } else throw new Error("Failed to convert servings count to number.");
        break;
      }
      case InstructionsType: {
        if (!recipeInTraining.groupedInstructions) {
          recipeInTraining.groupedInstructions = [];
        }
        const titleNode = currentNode.children.find(
          (child) => child.type === InstructionsTitleType
        );
        const title = titleNode?.children[0]?.text;
        const instructionsNode = currentNode.children.filter(
          (child) => child.type === InstructionType
        );
        const instructions = instructionsNode.map(
          (node) => node.children[0].text
        );
        const groupedInstructions: GroupedInstructions = {
          title,
          instructions: instructions,
        };
        recipeInTraining.groupedInstructions.push(groupedInstructions);
        break;
      }
      case IngredientsType: {
        if (!recipeInTraining.groupedIngredients) {
          recipeInTraining.groupedIngredients = [];
        }
        const titleNode = currentNode.children.find(
          (child) => child.type === IngredientsTitleType
        );
        const title = titleNode?.children[0]?.text;

        const ingredientNodes = currentNode.children.filter(
          (child) => child.type === "paragraph"
        );
        const ingredients = ingredientNodes.map((node) => {
          const amountNode = node.children.find(
            (node) => node.type === IngredientsAmountType
          );
          const result = amountNode ? safeNumber(amountNode.text) : undefined;
          if (result && result.kind === "failure") {
            throw new Error("Failed to convert amount to number.");
          }
          return {
            amount: result ? result.value : undefined,
            unit: node.children.find(
              (node) => node.type === IngredientsUnitType
            )?.text,
            name:
              node.children.find((node) => node.type === IngredientsNameType)
                ?.text || "",
            comment: node.children.find(
              (node) => node.type === IngredientsCommentType
            )?.text,
          };
        });
        const groupedIngredients: GroupedIngredients = {
          title,
          ingredients: ingredients,
        };
        recipeInTraining.groupedIngredients.push(groupedIngredients);
        break;
      }
      default:
        break;
    }

    if ("children" in currentNode && Array.isArray(currentNode.children)) {
      queue.push(...currentNode.children);
    }
  }
  return validateRecipe(recipeInTraining);
};

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

type ConversionSucceeded = {
  kind: "success";
  value: number;
};

type ConversionFailed = {
  kind: "failure";
  reason: string;
};

type ConversionResult = ConversionSucceeded | ConversionFailed;

function safeNumber(s: string): ConversionResult {
  const number = Number(s);
  if (isNaN(number)) {
    return { kind: "failure", reason: "Not a number" };
  }
  return { kind: "success", value: number };
}
