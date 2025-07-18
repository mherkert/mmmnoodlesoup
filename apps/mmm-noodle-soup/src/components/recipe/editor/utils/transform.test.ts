import { createMockRecipe } from "../../../../__mocks__/recipes";
import { recipeToSlate, slateToRecipe } from "./transform";
import { Descendant, Element } from "slate";
import { CustomText } from "../slate";
import { EditableRecipe, GroupedIngredients, GroupedInstructions, Ingredient } from "../../../../data/types";
import { Duration } from "../../../../data/types";

// Helper function to check if two arrays of ingredients are equal
function areIngredientsEqual(
  ingredients1: Ingredient[],
  ingredients2: Ingredient[]
): boolean {
  if (ingredients1.length !== ingredients2.length) return false;

  return ingredients1.every((ing1, index) => {
    const ing2 = ingredients2[index];
    return (
      ing1.amount === ing2.amount &&
      ing1.unit === ing2.unit &&
      ing1.name === ing2.name &&
      ing1.comment === ing2.comment
    );
  });
}

// Helper function to check if two arrays of instructions are equal
function areInstructionsEqual(
  instructions1: string[],
  instructions2: string[]
): boolean {
  if (instructions1.length !== instructions2.length) return false;
  return instructions1.every((inst1, index) => inst1 === instructions2[index]);
}

// Helper function to check if two grouped ingredients are equal
function areGroupedIngredientsEqual(groups1: GroupedIngredients[], groups2: GroupedIngredients[]): boolean {
  if (groups1.length !== groups2.length) return false;

  return groups1.every((group1, index) => {
    const group2 = groups2[index];
    return (
      group1.title === group2.title &&
      areIngredientsEqual(group1.ingredients, group2.ingredients)
    );
  });
}

// Helper function to check if two grouped instructions are equal
function areGroupedInstructionsEqual(groups1: GroupedInstructions[], groups2: GroupedInstructions[]): boolean {
  if (groups1.length !== groups2.length) return false;

  return groups1.every((group1, index) => {
    const group2 = groups2[index];
    return (
      group1.title === group2.title &&
      areInstructionsEqual(group1.instructions, group2.instructions)
    );
  });
}

// Helper function to check if two durations are equal
function areDurationsEqual(duration1: Duration | undefined, duration2: Duration | undefined): boolean {
  if (!duration1 || !duration2) return false;
  return (
    duration1.preparation === duration2.preparation &&
    duration1.cooking === duration2.cooking &&
    duration1.waiting === duration2.waiting
  );
}

describe("transform utility", () => {
  describe("recipe to slate", () => {
    it("should transform a basic recipe", () => {
      const recipe = createMockRecipe();
      const slateValue: Descendant[] = recipeToSlate(recipe);
      expect(slateValue.length).toEqual(10);
      expect(slateValue[0].type).toEqual("title");
      expect(slateValue[1].type).toEqual("description");
      expect(slateValue[2].type).toEqual("paragraph");
      expect((slateValue[2] as Element).children[0].type).toEqual(
        "durationPreparation"
      );
      expect(
        ((slateValue[2] as Element).children[0] as CustomText).text
      ).toEqual("10");
      expect(slateValue[3].type).toEqual("paragraph");
      expect((slateValue[3] as Element).children[0].type).toEqual(
        "durationWaiting"
      );
      expect(
        ((slateValue[3] as Element).children[0] as CustomText).text
      ).toEqual("30");
      expect(slateValue[4].type).toEqual("paragraph");
      expect((slateValue[4] as Element).children[0].type).toEqual(
        "durationCooking"
      );
      expect(
        ((slateValue[4] as Element).children[0] as CustomText).text
      ).toEqual("20");
      expect(slateValue[5].type).toEqual("paragraph");
      expect((slateValue[5] as Element).children[0].type).toEqual(
        "servingsCount"
      );
      expect(
        ((slateValue[5] as Element).children[0] as CustomText).text
      ).toEqual("2");
    });
    it("should transform a recipe with ingredients", () => {
      const recipe = createMockRecipe();

      const slateValue: Descendant[] = recipeToSlate(recipe);

      expect(slateValue.length).toEqual(10);
      expect(slateValue[7].type).toEqual("ingredients");
      expect((slateValue[7] as Element).children[0].type).toEqual(
        "ingredientsTitle"
      );
      expect((slateValue[7] as Element).children[1].type).toEqual("paragraph");
      expect(
        ((slateValue[7] as Element).children[1] as Element).children[0].type
      ).toEqual("ingredientsAmount");
      expect(
        ((slateValue[7] as Element).children[1] as Element).children[2].type
      ).toEqual("ingredientsUnit");
      expect(
        ((slateValue[7] as Element).children[1] as Element).children[4].type
      ).toEqual("ingredientsName");
      expect(
        ((slateValue[7] as Element).children[1] as Element).children[6].type
      ).toEqual("ingredientsComment");
    });

    it("should transform a recipe with instructions", () => {
      const recipe = createMockRecipe();
      const slateValue: Descendant[] = recipeToSlate(recipe);
      expect(slateValue.length).toEqual(10);
      expect(slateValue[8].type).toEqual("instructions");
      expect((slateValue[8] as Element).children[0].type).toEqual(
        "instructionsTitle"
      );
      expect((slateValue[8] as Element).children[1].type).toEqual(
        "instruction"
      );
      expect((slateValue[8] as Element).children[2].type).toEqual(
        "instruction"
      );
    });
  });

  describe("slate to recipe", () => {
    it("should transform a basic recipe", () => {
      const recipe = createMockRecipe();
      const expectedRecipe: EditableRecipe = {
        title: recipe.title,
        description: recipe.description,
        groupedIngredients: recipe.groupedIngredients || [],
        groupedInstructions: recipe.groupedInstructions || [],
        duration: recipe.duration,
        servingsCount: recipe.servingsCount,
      };
      const slateValue: Descendant[] = recipeToSlate(recipe);
      const recipeFromSlate = slateToRecipe(slateValue);
      const recipeFromSlateNew: EditableRecipe = {
        title: recipeFromSlate.title,
        description: recipeFromSlate.description,
        groupedIngredients: recipeFromSlate.groupedIngredients || [],
        groupedInstructions: recipeFromSlate.groupedInstructions || [],
        duration: recipeFromSlate.duration,
        servingsCount: recipeFromSlate.servingsCount,
      };

      // Detailed debugging
      console.log("=== Detailed Comparison ===");
      console.log("Title comparison:", {
        expected: expectedRecipe.title,
        actual: recipeFromSlateNew.title,
        equal: expectedRecipe.title === recipeFromSlateNew.title,
      });
      console.log("Description comparison:", {
        expected: expectedRecipe.description,
        actual: recipeFromSlateNew.description,
        equal: expectedRecipe.description === recipeFromSlateNew.description,
      });
      console.log("ServingsCount comparison:", {
        expected: expectedRecipe.servingsCount,
        actual: recipeFromSlateNew.servingsCount,
        equal:
          expectedRecipe.servingsCount === recipeFromSlateNew.servingsCount,
        types: {
          expected: typeof expectedRecipe.servingsCount,
          actual: typeof recipeFromSlateNew.servingsCount,
        },
      });
      console.log("Duration comparison:", {
        expected: expectedRecipe.duration,
        actual: recipeFromSlateNew.duration,
        equal: areDurationsEqual(
          expectedRecipe.duration,
          recipeFromSlateNew.duration
        ),
      });
      console.log("GroupedIngredients comparison:", {
        expectedLength: expectedRecipe.groupedIngredients?.length,
        actualLength: recipeFromSlateNew.groupedIngredients?.length,
        equal: areGroupedIngredientsEqual(
          expectedRecipe.groupedIngredients || [],
          recipeFromSlateNew.groupedIngredients || []
        ),
      });
      console.log("GroupedInstructions comparison:", {
        expectedLength: expectedRecipe.groupedInstructions?.length,
        actualLength: recipeFromSlateNew.groupedInstructions?.length,
        equal: areGroupedInstructionsEqual(
          expectedRecipe.groupedInstructions || [],
          recipeFromSlateNew.groupedInstructions || []
        ),
      });

      // Manual equality checks
      expect(expectedRecipe.title).toBe(recipeFromSlateNew.title);
      expect(expectedRecipe.description).toBe(recipeFromSlateNew.description);
      expect(expectedRecipe.servingsCount).toBe(
        recipeFromSlateNew.servingsCount
      );
      expect(
        areDurationsEqual(expectedRecipe.duration, recipeFromSlateNew.duration)
      ).toBe(true);
      expect(
        areGroupedIngredientsEqual(
          expectedRecipe.groupedIngredients || [],
          recipeFromSlateNew.groupedIngredients || []
        )
      ).toBe(true);
      expect(
        areGroupedInstructionsEqual(
          expectedRecipe.groupedInstructions || [],
          recipeFromSlateNew.groupedInstructions || []
        )
      ).toBe(true);
    });

    it("should transform a recipe with ingredients", () => {
      const slateValue: Descendant[] = [
        {
          type: "ingredients",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  text: "200",
                  type: "ingredientsAmount",
                },
                {
                  text: " ",
                },
                {
                  text: "ml",
                  type: "ingredientsUnit",
                },
                {
                  text: " ",
                },
                {
                  text: "Wasser",
                  type: "ingredientsName",
                },
              ],
            },
            {
              type: "paragraph",
              children: [
                {
                  text: "300",
                  type: "ingredientsAmount",
                },
                {
                  text: " ",
                },
                {
                  text: "g",
                  type: "ingredientsUnit",
                },
                {
                  text: " ",
                },
                {
                  text: "Mehl",
                  type: "ingredientsName",
                },
              ],
            },
          ],
        },
      ];
      const recipeFromSlate = slateToRecipe(slateValue);
      expect(recipeFromSlate.groupedIngredients).toBeDefined();
      expect(recipeFromSlate.groupedIngredients?.length).toBe(1);
      expect(recipeFromSlate.groupedIngredients?.[0].title).toBeUndefined();
      expect(recipeFromSlate.groupedIngredients?.[0].ingredients.length).toBe(
        2
      );
      expect(
        recipeFromSlate.groupedIngredients?.[0].ingredients[0].amount
      ).toBe(200);
      expect(recipeFromSlate.groupedIngredients?.[0].ingredients[0].unit).toBe(
        "ml"
      );
      expect(recipeFromSlate.groupedIngredients?.[0].ingredients[0].name).toBe(
        "Wasser"
      );
      expect(
        recipeFromSlate.groupedIngredients?.[0].ingredients[1].amount
      ).toBe(300);
      expect(recipeFromSlate.groupedIngredients?.[0].ingredients[1].unit).toBe(
        "g"
      );
      expect(recipeFromSlate.groupedIngredients?.[0].ingredients[1].name).toBe(
        "Mehl"
      );
    });

    it("should transform a recipe with a single ingredient", () => {
      // Sometimes we have a single ingredient and no title and for some reason slate represents it as shown below. There may be a fix for this, but for now let's handle this case.
      const slateValue: Descendant[] = [
        {
          "type": "paragraph",
          "children": [
            {
              "type": "ingredients",
              "children": [
                {
                  "text": "300",
                  // @ts-expect-error
                  "type": "ingredientsAmount"
                },
                {
                  // @ts-expect-error
                  "text": " "
                },
                {
                  "text": "ml",
                  // @ts-expect-error
                  "type": "ingredientsUnit"
                },
                {
                  // @ts-expect-error
                  "text": " "
                },
                {
                  "text": "Wasser",
                  // @ts-expect-error
                  "type": "ingredientsName"
                }
              ]
            }
          ]
        }
      ];
      const recipeFromSlate = slateToRecipe(slateValue);
      expect(recipeFromSlate.groupedIngredients).toBeDefined();
      expect(recipeFromSlate.groupedIngredients?.length).toBe(1);
      expect(recipeFromSlate.groupedIngredients?.[0].title).toBeUndefined();
      expect(recipeFromSlate.groupedIngredients?.[0].ingredients.length).toBe(
        1
      );
      expect(
        recipeFromSlate.groupedIngredients?.[0].ingredients[0].amount
      ).toBe(300);
      expect(recipeFromSlate.groupedIngredients?.[0].ingredients[0].unit).toBe(
        "ml"
      );
      expect(recipeFromSlate.groupedIngredients?.[0].ingredients[0].name).toBe(
        "Wasser"
      );
    });

    it("should throw an error if the duration is not a number", () => {
      const slateValue: Descendant[] = [
        {
          type: "durationPreparation",
          text: "not a number" ,
        },
      ];
      expect(() => slateToRecipe(slateValue)).toThrow(
        "Failed to convert preparation duration to number."
      );
    });

    it("should throw an error if the servings count is not a number", () => {
      const slateValue: Descendant[] = [
        {
          type: "servingsCount",
          text: "not a number",
        },
      ];
      expect(() => slateToRecipe(slateValue)).toThrow(
        "Failed to convert servings count to number."
      );
    });

    it("should throw an error if the amount is not a number", () => {
      const slateValue: Descendant[] = [
        {
          type: "ingredients",
          children: [
            {
              type: "paragraph",
              children: [
                {
                  type: "ingredientsAmount",
                  text: "not a number",
                },
              ],
            },
          ],
        },
      ];
      expect(() => slateToRecipe(slateValue)).toThrow(
        "Failed to convert amount to number."
      );
    });
  });
});
