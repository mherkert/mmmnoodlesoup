import { BaseEditor, Descendant, HistoryEditor } from "slate";
import { ReactEditor } from "slate-react";


type ParagraphElement = {
  type: "paragraph";
  children: CustomText[] | CustomElement[];
};
type TitleElement = { type: "title"; children: AnyText[] };
type DescriptionElement = { type: "description"; children: AnyText[] };
type IngredientsTitleElement = {
  type: "ingredientsTitle";
  children: AnyText[];
};
type IngredientElement = {
  type: "paragraph";
  children: [
    | IngredientsAmountText
    | IngredientsUnitText
    | IngredientsNameText
    | IngredientsCommentText
    | AnyText,
  ];
};
type IngredientsElement = {
  type: "ingredients";
  children: (IngredientsTitleElement | IngredientElement | ParagraphElement)[];
};
type InstructionsTitleElement = {
  type: "instructionsTitle";
  children: AnyText[];
};
type InstructionsElement = {
  type: "instructions";
  children: (
    | InstructionsTitleElement
    | InstructionElement
    | ParagraphElement
  )[];
};
type InstructionElement = { type: "instruction"; children: AnyText[] };

type AnyText = { type?: never; text: string };
type TagText = { type: "tag"; text: string };
type IngredientsAmountText = { type: "ingredientsAmount"; text: string };
type IngredientsUnitText = { type: "ingredientsUnit"; text: string };
type IngredientsNameText = { type: "ingredientsName"; text: string };
type IngredientsCommentText = { type: "ingredientsComment"; text: string };
type ServingsCountText = { type: "servingsCount"; text: string };
type DurationPreparationText = { type: "durationPreparation"; text: string };
type DurationWaitingText = { type: "durationWaiting"; text: string };
type DurationCookingText = { type: "durationCooking"; text: string };

type CustomElement =
  | ParagraphElement
  | TitleElement
  | DescriptionElement
  | IngredientsTitleElement
  | IngredientsElement
  | InstructionsTitleElement
  | InstructionsElement
  | InstructionElement;

type CustomText =
  | AnyText
  | TagText
  | DurationPreparationText
  | DurationWaitingText
  | DurationCookingText
  | IngredientsAmountText
  | IngredientsUnitText
  | IngredientsNameText
  | IngredientsCommentText
  | ServingsCountText;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
