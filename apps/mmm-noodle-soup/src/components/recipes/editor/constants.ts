import {
  BlockType,
  DescriptionType,
  IngredientsAmountType,
  IngredientsUnitType,
  IngredientsNameType,
  IngredientsCommentType,
  ServingsCountType,
  DurationCookingType,
  DurationPreparationType,
  DurationWaitingType,
  IngredientsTitleType,
  InstructionsTitleType,
  InstructionType,
  MarkType,
  TagType,
  TitleType,
  WrapType,
  InstructionsType,
  IngredientsType,
} from "./types";

export const LABELS: Record<BlockType | MarkType | WrapType, string> = {
  [TitleType]: "Title",
  [DescriptionType]: "Description",
  [InstructionsTitleType]: "Title",
  [IngredientsTitleType]: "Title",
  [InstructionType]: "Instruction",
  [TagType]: "Tag",
  [DurationPreparationType]: "Prep",
  [DurationWaitingType]: "Wait",
  [DurationCookingType]: "Cook",
  [IngredientsAmountType]: "Amount",
  [IngredientsUnitType]: "Unit",
  [IngredientsNameType]: "Name",
  [IngredientsCommentType]: "Qualifier",
  [ServingsCountType]: "Servings",
  [InstructionsType]: "Instructions",
  [IngredientsType]: "Ingredients",
};

export const INLINE_TAGS = [
  "span",
  "a",
  "b",
  "i",
  "strong",
  "em",
  "u",
  "small",
  "abbr",
  "code",
  "mark",
  "q",
  "s",
  "sub",
  "sup",
];

export const recipeElementColorVars: Record<
  string,
  { border: string; background: string; "label-background": string }
> = {
  title: {
    border: "border-editor-title",
    background: "bg-editor-title",
    "label-background": "bg-editor-title-label",
  },
  description: {
    border: "border-editor-description",
    background: "bg-editor-description",
    "label-background": "bg-editor-description-label",
  },
  tag: {
    border: "border-editor-tag",
    background: "bg-editor-tag",
    "label-background": "bg-editor-tag-label",
  },
  durationPreparation: {
    border: "border-editor-duration-preparation",
    background: "bg-editor-duration-preparation",
    "label-background": "bg-editor-duration-preparation-label",
  },
  durationWaiting: {
    border: "border-editor-duration-waiting",
    background: "bg-editor-duration-waiting",
    "label-background": "bg-editor-duration-waiting-label",
  },
  durationCooking: {
    border: "border-editor-duration-cooking",
    background: "bg-editor-duration-cooking",
    "label-background": "bg-editor-duration-cooking-label",
  },
  servingsCount: {
    border: "border-editor-servings-count",
    background: "bg-editor-servings-count",
    "label-background": "bg-editor-servings-count-label",
  },
  ingredients: {
    border: "border-editor-ingredients",
    background: "bg-editor-ingredients",
    "label-background": "bg-editor-ingredients-label",
  },
  ingredientsTitle: {
    border: "border-editor-ingredients-title",
    background: "bg-editor-ingredients-title",
    "label-background": "bg-editor-ingredients-title-label",
  },
  ingredientsAmount: {
    border: "border-editor-ingredients-amount",
    background: "bg-editor-ingredients-amount",
    "label-background": "bg-editor-ingredients-amount-label",
  },
  ingredientsUnit: {
    border: "border-editor-ingredients-unit",
    background: "bg-editor-ingredients-unit",
    "label-background": "bg-editor-ingredients-unit-label",
  },
  ingredientsName: {
    border: "border-editor-ingredients-name",
    background: "bg-editor-ingredients-name",
    "label-background": "bg-editor-ingredients-name-label",
  },
  ingredientsComment: {
    border: "border-editor-ingredients-comment",
    background: "bg-editor-ingredients-comment",
    "label-background": "bg-editor-ingredients-comment-label",
  },
  instructions: {
    border: "border-editor-instructions",
    background: "bg-editor-instructions",
    "label-background": "bg-editor-instructions-label",
  },
  instructionsTitle: {
    border: "border-editor-instructions-title",
    background: "bg-editor-instructions-title",
    "label-background": "bg-editor-instructions-title-label",
  },
  instruction: {
    border: "border-editor-instruction",
    background: "bg-editor-instruction",
    "label-background": "bg-editor-instruction-label",
  },
};
