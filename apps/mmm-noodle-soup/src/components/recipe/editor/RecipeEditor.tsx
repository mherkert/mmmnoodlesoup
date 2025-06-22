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
import { EditableRecipe, NewRecipe } from "../../../data/types";
import { Recipe as RecipeType } from "../../../data/types";
import { isHotkey } from "is-hotkey";
import { RecipeNode } from "./RecipeNode";
import { Toolbar } from "./Toolbar";
import { BlockType, MarkType, WrapType } from "./types";
import { recipeToSlate, slateToRecipe } from "./utils/transform";
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
import { Recipe } from "../Recipe";
import {
  createRecipe,
  createUser,
  generateUniqueSlug,
  getUserByEmail,
  updateUserAuth0Ids,
} from "../../../services/sanity";
import { Stepper } from "./Stepper";
import { useAuth } from "../../../store/authStore";
import { navigate } from "gatsby";

type RecipeEditorProps = {
  recipe?: RecipeType;
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

  const { isAuthenticated, user } = useAuth();

  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const [validationError, setValidationError] = useState<string | null>(null);
  const [step, setStep] = useState<"preview" | "edit">("edit");
  const [editableRecipe, setEditableRecipe] = useState<
    EditableRecipe | undefined
  >(recipe);
  const editableRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleEdit = () => {
    setStep("edit");
  };

  const handleSubmit = async () => {
    console.log("handleSubmit", { value });
    console.log('🎯 Form submission started at:', performance.now());

    // TODO: check if user is logged in
    // TODO: check if recipe is valid
    // TODO: submit recipe
    // TODO: handle submit progression
    // TODO: handle recipe and submit progression
    // TODO: handle recipe");
    // TODO: handle recipe and submit progression

    if (!isAuthenticated || !user) {
      setValidationError("You must be logged in to create a recipe");
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    try {
      // First, ensure user exists in Sanity (using email as primary key)
      let sanityUser = await getUserByEmail(user.email!);

      if (!sanityUser) {
        // Create user in Sanity if they don't exist
        sanityUser = await createUser({
          name: user.name,
          email: user.email,
          image: user.picture,
          auth0Ids: [user.sub], // Start with current Auth0 ID
          role: "user",
        });
      } else {
        // Update user's Auth0 IDs to include the current one
        await updateUserAuth0Ids(sanityUser._id, user.sub!);
      }

      console.log("editableRecipe", editableRecipe);
      // Generate unique slug (this will check for conflicts)
      // const { generateUniqueSlug } = await import("../../services/sanity");
      const uniqueSlug = await generateUniqueSlug(editableRecipe!.title!); //TODO type this

      // Prepare recipe data for Sanity, TODO: type this
      const recipe: NewRecipe = {
        title: editableRecipe!.title!,
        slug: {
          // _type: "slug",
          current: uniqueSlug,
        },
        description: editableRecipe!.description,
        source: "From my own random collection of recipes",
        servingsCount: editableRecipe!.servingsCount,
        duration: editableRecipe!.duration,
        // imageCredit: 
        user: {
          // _type: "reference",
          // _ref: sanityUser._id,
          id: sanityUser._id,
          name: sanityUser.name,
          email: sanityUser.email,
        },
        groupedIngredients: editableRecipe!.groupedIngredients?.map((group) => ({
          // _type: "recipeGroupedIngredients",
          title: group.title,
          ingredients: group.ingredients?.map((ingredient) => ({
            // _type: "recipeIngredient",
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
            comment: ingredient.comment || undefined,
          })),
        })) || [],
        groupedInstructions: editableRecipe!.groupedInstructions?.map((group) => ({
          // _type: "recipeGroupedInstructions",
          title: group.title,
          instructions: group.instructions,
        })) || [],
        // groupedIngredients: editableRecipe!.groupedIngredients!.map((group) => ({
        // groupedIngredients: [
        //   {
        //     _type: "recipeGroupedIngredients",
        //     title: "Ingredients",
        //     ingredients: editableRecipe!.ingredients!.map((ing) => ({
        //       _type: "recipeIngredient",
        //       name: ing.name,
        //       amount: ing.amount,
        //       unit: ing.unit,
        //       comment: ing.comment || undefined,
        //     })),
        //   },
        // ],
        // groupedInstructions: [
        //   {
        //     _type: "recipeGroupedInstructions",
        //     title: "Instructions",
        //     instructions: editableRecipe!.instructions!.map((inst) => ({
        //       _type: "recipeInstruction",
        //       text: inst.text,
        //       order: inst.order,
        //     })),
        //   },
        // ],
      };

      const result = await createRecipe(recipe);

      // Redirect to the new recipe
      navigate(`/recipes/${result.slug.current}`);
    } catch (err) {
      console.error("Error creating recipe:", err);
      setValidationError("Failed to create recipe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    console.log("handlePreview", { value });
    console.log("value", JSON.stringify(value, null, 2));
    try {
      // TODO handle recipe and preview progression
      const editableRecipe = slateToRecipe(value);
      editableRecipe._createdAt = new Date().toISOString();
      // editableRecipe.slug = await generateUniqueSlug(editableRecipe.title);
      // console.log("recipe preview", { editableRecipe });
      setEditableRecipe(editableRecipe);
      setStep("preview");
      setValidationError(null);
    } catch (error) {
      console.error("error", { error });
      // TODO: handle validation errors
      setValidationError(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };

  return (
    <>
      <Stepper
        onEdit={handleEdit}
        onPreview={handlePreview}
        onSubmit={handleSubmit}
      />
      {step === "edit" && (
        <Slate
          editor={editor}
          initialValue={value}
          onChange={(value: Descendant[]) => {
            setValue(value);
            // console.log("Slate value:", value);
            // console.log(JSON.stringify(value, null, 2));
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
            // need to set min height here to override slate's inline min height
            style={{ minHeight: "500px" }}
            renderLeaf={renderLeaf}
            onKeyDown={handleKeyDown}
          />
        </Slate>
      )}
      {step === "preview" && <Recipe recipe={editableRecipe!} />}
    </>
  );
};
