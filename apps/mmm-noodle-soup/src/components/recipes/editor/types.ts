export const TitleType = "title";
export const DescriptionType = "description";
export const InstructionsTitleType = "instructionsTitle";
export const InstructionsType = "instructions";
export const InstructionType = "instruction";
export const IngredientsTitleType = "ingredientsTitle";
export const IngredientsType = "ingredients";
export const TagType = "tag";
export const DurationPreparationType = "durationPreparation";
export const DurationWaitingType = "durationWaiting";
export const DurationCookingType = "durationCooking";
export const IngredientsAmountType = "ingredientsAmount";
export const IngredientsUnitType = "ingredientsUnit";
export const IngredientsNameType = "ingredientsName";
export const IngredientsCommentType = "ingredientsComment";
export const ServingsCountType = "servingsCount";

export type BlockType =
  | typeof TitleType
  | typeof DescriptionType
  | typeof InstructionsTitleType
  | typeof IngredientsTitleType
  | typeof InstructionType;

export type WrapType = typeof InstructionsType | typeof IngredientsType;

export type MarkType =
  | typeof TagType
  | typeof DurationPreparationType
  | typeof DurationWaitingType
  | typeof DurationCookingType
  | typeof IngredientsAmountType
  | typeof IngredientsUnitType
  | typeof IngredientsNameType
  | typeof IngredientsCommentType
  | typeof ServingsCountType;
