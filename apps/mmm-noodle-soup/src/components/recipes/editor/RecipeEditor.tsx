import React, { useCallback, useState } from "react";
import {
  createEditor,
  Descendant,
  Editor,
  Transforms,
  Element,
  Text,
} from "slate";

import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { Recipe } from "../../../data/types";
import { isHotkey } from "is-hotkey";
import { RecipeNode } from "./RecipeNode";
type RecipeEditorProps = {
  recipe?: Recipe;
};
const TitleType = "title";
const DescriptionType = "description";
const InstructionsTitleType = "instructionsTitle";
const InstructionsType = "instructions";
const InstructionType = "instruction";
const IngredientsTitleType = "ingredientsTitle";
const IngredientsType = "ingredients";
const TagType = "tag";
const DurationPreparationType = "durationPreparation";
const DurationWaitingType = "durationWaiting";
const DurationCookingType = "durationCooking";
const IngredientsAmountType = "ingredientsAmount";
const IngredientsUnitType = "ingredientsUnit";
const IngredientsNameType = "ingredientsName";
const IngredientsCommentType = "ingredientsComment";
const ServingsCountType = "servingsCount";

export type BlockType =
  | typeof TitleType
  | typeof DescriptionType
  | typeof InstructionsTitleType
  | typeof IngredientsTitleType
  | typeof InstructionType;

export const BLOCK_TYPES = [
  TitleType,
  DescriptionType,
  InstructionsTitleType,
  IngredientsTitleType,
  InstructionType,
] as const;

export type WrapType = typeof InstructionsType | typeof IngredientsType;

export const WRAP_TYPES = [InstructionsType, IngredientsType] as const;

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

export const MARK_TYPES = [
  TagType,
  DurationPreparationType,
  DurationWaitingType,
  DurationCookingType,
  IngredientsAmountType,
  IngredientsUnitType,
  IngredientsNameType,
  IngredientsCommentType,
  ServingsCountType,
] as const;

const BLOCK_HOTKEYS = {
  "Control+t": TitleType,
  "Control+d": DescriptionType,
  "Control+m": InstructionsTitleType,
  "Control+i": IngredientsTitleType,
  "Control+e": InstructionType,
};

const ENTER_HOTKEY = "Enter";

const WRAP_HOTKEYS = {
  "Control+Shift+m": InstructionsType,
  "Control+Shift+i": IngredientsType,
};

const MARK_HOTKEYS = {
  "Control+g": TagType,
  "Control+p": DurationPreparationType,
  "Control+w": DurationWaitingType,
  "Control+c": DurationCookingType,
  "Control+a": IngredientsAmountType,
  "Control+u": IngredientsUnitType,
  "Control+n": IngredientsNameType,
  "Control+o": IngredientsCommentType,
  "Control+s": ServingsCountType,
};

export const RecipeEditor = ({ recipe }: RecipeEditorProps) => {
  const [editor] = useState(() => withReact(createEditor()));

  const emptyRecipe: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  const renderLeaf = useCallback(
    ({ attributes, children, leaf }: RenderLeafProps) => {
      if (leaf.type && MARK_TYPES.includes(leaf.type as MarkType)) {
        return (
          <RecipeNode as="span" {...attributes} type={leaf.type as MarkType}>
            {children}
          </RecipeNode>
        );
      } else {
        return <span {...attributes}>{children}</span>;
      }
    },
    []
  );

  const renderElement = useCallback(
    ({ element, attributes, children }: RenderElementProps) => {
      if (WRAP_TYPES.includes(element.type as WrapType)) {
        return (
          <RecipeNode as="div" {...attributes} type={element.type as WrapType}>
            {children}
          </RecipeNode>
        );
      } else if (BLOCK_TYPES.includes(element.type as BlockType)) {
        return (
          <RecipeNode as="p" {...attributes} type={element.type as BlockType}>
            {children}
          </RecipeNode>
        );
      } else {
        return <p {...attributes}>{children}</p>;
      }
    },
    []
  );

  const isWrapperActive = (editor: Editor, type: string) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === type,
      mode: "lowest",
    });
    return !!match;
  };

  const isBlockActive = (editor: Editor, type: string) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === type,
    });

    return !!match;
  };

  const isMarkActive = (editor: Editor, type: string) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === type,
      universal: true,
    });

    return !!match;
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <Slate
        editor={editor}
        initialValue={emptyRecipe}
        onChange={(value) => {
          console.log("Slate value:", value);
        }}
      >
        <Editable
          className="outline-none"
          renderElement={renderElement}
          placeholder="Enter some recipe text…"
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (isHotkey(ENTER_HOTKEY, event)) {
              event.preventDefault();
              Transforms.insertNodes(editor, {
                type: "paragraph",
                children: [{ text: "" }],
              });
            }
            for (const hotkey in WRAP_HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const type = WRAP_HOTKEYS[hotkey as keyof typeof WRAP_HOTKEYS];
                const isActive = isWrapperActive(editor, type);
                if (!isActive) {
                  Transforms.wrapNodes(
                    editor,
                    { type: type as WrapType, children: [] },
                    {
                      match: (n) => Element.isElement(n) || Text.isText(n),
                      split: true,
                    }
                  );
                } else {
                  Transforms.unwrapNodes(editor, {
                    match: (n) => n.type === type,
                  });
                }
              }
            }
            for (const hotkey in MARK_HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const type = MARK_HOTKEYS[hotkey as keyof typeof MARK_HOTKEYS];
                const isActive = isMarkActive(editor, type);
                Transforms.setNodes(
                  editor,
                  { type: isActive ? undefined : (type as MarkType) },
                  { match: (n) => Text.isText(n), split: true }
                );
              }
            }
            for (const hotkey in BLOCK_HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const type =
                  BLOCK_HOTKEYS[hotkey as keyof typeof BLOCK_HOTKEYS];
                const isActive = isBlockActive(editor, type);
                Transforms.setNodes(
                  editor,
                  { type: isActive ? "paragraph" : type },
                  {
                    match: (n) =>
                      Element.isElement(n) && Editor.isBlock(editor, n),
                  }
                );
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};
