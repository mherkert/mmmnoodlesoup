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
import { BlockType, MarkType, WrapType } from "./types";
import { recipeToSlate, slateToRecipe } from "./transform";
import { createMockRecipe } from "../../../__mocks__/recipes";
import {
  BLOCK_HOTKEYS,
  BLOCK_TYPES,
  ENTER_HOTKEY,
  MARK_HOTKEYS,
  MARK_TYPES,
  WRAP_HOTKEYS,
  WRAP_TYPES,
} from "./constants";

type RecipeEditorProps = {
  recipe?: Recipe;
};

/**
 * A custom richt text editor for recipes. Very much a work in progress.
 */
export const RecipeEditor = ({ recipe }: RecipeEditorProps) => {
  // const mockRecipe: Descendant[] = recipeToSlate(createMockRecipe());

  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  // console.log("mockRecipe", mockRecipe);
  // const initialValue: Descendant[] = mockRecipe;

  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const [validationError, setValidationError] = useState<string | null>(null);
  const editableRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.focus();
    }
  }, []);

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

  const handlePreview = () => {
    try {
      // TODO handle recipe and preview progression
      const recipe = slateToRecipe(value);

      setValidationError(null);
    } catch (error) {
      // TODO: handle validation errors
      setValidationError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value: Descendant[]) => {
        setValue(value);
        // console.log("Slate value:", value);
        // console.log(JSON.stringify(value, null, 2));
      }}
    >
      <Toolbar onPreview={handlePreview} />
      <Editable
        ref={editableRef}
        className="bg-white rounded-md border border-gray-200 outline-none p-2"
        renderElement={renderElement}
        placeholder="Enter some recipe text…"
        renderPlaceholder={({ children, attributes }) => {
          delete attributes.style.top;
          return <span {...attributes}>{children}</span>;
        }}
        // need to set min height here to override slate's inline min height
        style={{ minHeight: "500px" }}
        renderLeaf={renderLeaf}
        onKeyDown={handleKeyDown}
      />
    </Slate>
  );
};
