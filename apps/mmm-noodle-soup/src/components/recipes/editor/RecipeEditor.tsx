import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  createEditor,
  Descendant,
  Editor,
  Transforms,
  Element,
  Text,
} from "slate";
import { withHistory } from "slate-history";
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
import { Toolbar } from "./Toolbar";
import {
  BlockType,
  DescriptionType,
  DurationCookingType,
  DurationPreparationType,
  DurationWaitingType,
  IngredientsAmountType,
  IngredientsCommentType,
  IngredientsNameType,
  IngredientsTitleType,
  IngredientsType,
  IngredientsUnitType,
  InstructionType,
  InstructionsTitleType,
  InstructionsType,
  MarkType,
  ServingsCountType,
  TagType,
  TitleType,
  WrapType,
} from "./types";

type RecipeEditorProps = {
  recipe?: Recipe;
};

export const BLOCK_TYPES = [
  TitleType,
  DescriptionType,
  InstructionsTitleType,
  IngredientsTitleType,
  InstructionType,
] as const;

export const WRAP_TYPES = [InstructionsType, IngredientsType] as const;
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
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.focus();
    }
  }, []);

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
        const type = BLOCK_HOTKEYS[hotkey as keyof typeof BLOCK_HOTKEYS];
        const isActive = isBlockActive(editor, type);
        Transforms.setNodes(
          editor,
          { type: isActive ? "paragraph" : type },
          {
            match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
          }
        );
      }
    }
  };
  return (
    <div>
      {/* <div className="bg-white rounded-lg border border-gray-200"> */}
      <Slate
        editor={editor}
        initialValue={emptyRecipe}
        onChange={(value) => {
          console.log("Slate value:", value);
        }}
      >
        <Toolbar />
        <Editable
          ref={editableRef}
          className="bg-white rounded-md border border-gray-200 outline-none p-2"
          renderElement={renderElement}
          placeholder="Enter some recipe text…"
          renderPlaceholder={({ children, attributes }) => {
            delete attributes.style.top;
            return <span {...attributes}>{children}</span>;
          }}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  );
};
