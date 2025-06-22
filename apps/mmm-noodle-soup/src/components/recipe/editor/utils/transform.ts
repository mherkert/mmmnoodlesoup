import { Descendant } from "slate";
import {
  GroupedIngredients,
  GroupedInstructions,
  Recipe,
  EditableRecipe,
  Ingredient,
} from "../../../../data/types";
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
} from "../types";
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
  TitleElement,
  DescriptionElement,
  DurationWaitingText,
  DurationPreparationText,
  DurationCookingText,
  ServingsCountText,
  InstructionsElement,
  IngredientsElement,
} from "../slate";
import { validateRecipe } from "./validate";
import { safeNumber } from "./validate";

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

// Use the visitor pattern to transform the slate to a recipe
interface NodeVisitor {
  visitTitle(node: TitleElement, context: RecipeBuilder): void;
  visitDescription(node: DescriptionElement, context: RecipeBuilder): void;
  visitDurationPreparation(
    node: DurationPreparationText,
    context: RecipeBuilder
  ): void;
  visitDurationWaiting(node: DurationWaitingText, context: RecipeBuilder): void;
  visitDurationCooking(node: DurationCookingText, context: RecipeBuilder): void;
  visitServingsCount(node: ServingsCountText, context: RecipeBuilder): void;
  visitInstructions(node: InstructionsElement, context: RecipeBuilder): void;
  visitIngredients(node: IngredientsElement, context: RecipeBuilder): void;
  visitDefault(node: Descendant, context: RecipeBuilder): void;
}

class RecipeBuilder {
  private recipe: EditableRecipe = {};

  setTitle(title: string): void {
    this.recipe.title = title;
  }

  setDescription(description: string): void {
    this.recipe.description = description;
  }

  setDurationPreparation(minutes: number): void {
    if (!this.recipe.duration) {
      this.recipe.duration = {};
    }
    this.recipe.duration.preparation = minutes;
  }

  setDurationWaiting(minutes: number): void {
    if (!this.recipe.duration) {
      this.recipe.duration = {};
    }
    this.recipe.duration.waiting = minutes;
  }

  setDurationCooking(minutes: number): void {
    if (!this.recipe.duration) {
      this.recipe.duration = {};
    }
    this.recipe.duration.cooking = minutes;
  }

  setServingsCount(count: number): void {
    this.recipe.servingsCount = count;
  }

  addGroupedInstructions(groupedInstructions: GroupedInstructions): void {
    if (!this.recipe.groupedInstructions) {
      this.recipe.groupedInstructions = [];
    }
    this.recipe.groupedInstructions.push(groupedInstructions);
  }

  addGroupedIngredients(groupedIngredients: GroupedIngredients): void {
    if (!this.recipe.groupedIngredients) {
      this.recipe.groupedIngredients = [];
    }
    this.recipe.groupedIngredients.push(groupedIngredients);
  }

  build(): EditableRecipe {
    return this.recipe;
  }
}

class RecipeNodeVisitor implements NodeVisitor {
  visitTitle(node: TitleElement, context: RecipeBuilder): void {
    context.setTitle(node.children[0].text);
  }

  visitDescription(node: DescriptionElement, context: RecipeBuilder): void {
    context.setDescription(node.children[0].text);
  }

  visitDurationPreparation(
    node: DurationPreparationText,
    context: RecipeBuilder
  ): void {
    const result = safeNumber(node.text);
    if (result.kind === "success") {
      context.setDurationPreparation(result.value);
    } else {
      throw new Error("Failed to convert preparation duration to number.");
    }
  }

  visitDurationWaiting(
    node: DurationWaitingText,
    context: RecipeBuilder
  ): void {
    const result = safeNumber(node.text);
    if (result.kind === "success") {
      context.setDurationWaiting(result.value);
    } else {
      throw new Error("Failed to convert waiting duration to number.");
    }
  }

  visitDurationCooking(
    node: DurationCookingText,
    context: RecipeBuilder
  ): void {
    const result = safeNumber(node.text);
    if (result.kind === "success") {
      context.setDurationCooking(result.value);
    } else {
      throw new Error("Failed to convert cooking duration to number.");
    }
  }

  visitServingsCount(node: ServingsCountText, context: RecipeBuilder): void {
    const result = safeNumber(node.text);
    if (result.kind === "success") {
      context.setServingsCount(result.value);
    } else {
      throw new Error("Failed to convert servings count to number.");
    }
  }

  visitInstructions(node: InstructionsElement, context: RecipeBuilder): void {
    const titleNode = node.children.find(
      (child: Descendant) => child.type === InstructionsTitleType
    );
    const title = titleNode?.children[0]?.text;
    const instructionsNode = node.children.filter(
      (child: Descendant) => child.type === InstructionType
    );
    const instructions = instructionsNode.map(
      (node: InstructionElement) => node.children[0].text
    );

    context.addGroupedInstructions({
      title,
      instructions,
    });
  }

  // TOOD: contains some any types due to the two different structures of nodes for single and multiple ingredients. Investigate if it can be fixed before expressing this situation with types.
  visitIngredients(node: IngredientsElement, context: RecipeBuilder): void {
    const buildIngredient = (node: any): Ingredient => {
      const amountNode = node.children.find(
        (node: Descendant) => node.type === IngredientsAmountType
      );
      const result = amountNode ? safeNumber(amountNode.text) : undefined;
      if (result && result.kind === "failure") {
        throw new Error("Failed to convert amount to number.");
      }
      return {
        amount: result ? result.value : undefined,
        unit: node.children.find(
          (node: Descendant) => node.type === IngredientsUnitType
        )?.text,
        name:
          node.children.find((node: Descendant) => node.type === IngredientsNameType)
            ?.text || "",
        comment: node.children.find(
          (node: Descendant) => node.type === IngredientsCommentType
        )?.text,
      };
    };

    const titleNode = node.children.find(
      (child: Descendant) => child.type === IngredientsTitleType
    );
    const title = titleNode?.children[0]?.text;

    const ingredientNodes = node.children.filter(
      (child: Descendant) =>
        child.type === "paragraph" &&
        child.children.some((child: Descendant) => child.hasOwnProperty("type"))
    );

    let ingredients: Ingredient[];
    // Sometimes ingredients node contains one single ingredient as its children
    if (ingredientNodes.length === 0) {
      ingredients = [buildIngredient(node)];
    } else {
      ingredients = ingredientNodes.map((node: any) => buildIngredient(node));
    }

    context.addGroupedIngredients({
      title,
      ingredients,
    });
  }

  visitDefault(node: Descendant, context: RecipeBuilder): void {
    // Do nothing for unrecognized node types
  }
}

export const slateToRecipe = (slate: Descendant[]): EditableRecipe => {
  const visitor = new RecipeNodeVisitor();
  const context = new RecipeBuilder();
  const queue: Descendant[] = [...slate];

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    // Dispatch to appropriate visitor method
    switch (currentNode.type) {
      case TitleType:
        visitor.visitTitle(currentNode, context);
        break;
      case DescriptionType:
        visitor.visitDescription(currentNode, context);
        break;
      case DurationPreparationType:
        visitor.visitDurationPreparation(currentNode, context);
        break;
      case DurationWaitingType:
        visitor.visitDurationWaiting(currentNode, context);
        break;
      case DurationCookingType:
        visitor.visitDurationCooking(currentNode, context);
        break;
      case ServingsCountType:
        visitor.visitServingsCount(currentNode, context);
        break;
      case InstructionsType:
        visitor.visitInstructions(currentNode, context);
        break;
      case IngredientsType:
        visitor.visitIngredients(currentNode, context);
        break;
      default:
        visitor.visitDefault(currentNode, context);
        break;
    }

    if ("children" in currentNode && Array.isArray(currentNode.children)) {
      queue.push(...currentNode.children);
    }
  }

  return context.build();
};
