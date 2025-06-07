import React, { forwardRef, useId } from "react";
import { INLINE_TAGS, LABELS, recipeElementColorVars } from "./constants";
import classNames from "classnames";
import { BlockType, WrapType, MarkType } from "./types";
import { Validated } from "./Validated";

type RecipeNodeProps = {
  children?: React.ReactNode;
  type: BlockType | MarkType | WrapType;
  as?: "p" | "span" | "div";
} & React.HTMLAttributes<HTMLElement>;

/**
 * A component that renders a node in the recipe editor.
 */
export const RecipeNode = forwardRef<HTMLElement, RecipeNodeProps>(
  ({ as, type, children, ...rest }, ref) => {
    console.log("render type", type, children);
    const Component = as || "span";
    const colorSet = recipeElementColorVars[
      type as keyof typeof recipeElementColorVars
    ] || {
      border: "inherit",
      background: "inherit",
      "label-background": "inherit",
    };
    const id = useId();
    return (
      <Component
        ref={ref as any}
        className={classNames(
          `border border-solid rounded-tr-md rounded-br-md rounded-bl-md px-1 py-[2px] w-fit mt-7 relative ps-6 pe-6`,
          colorSet.border,
          colorSet.background,
          INLINE_TAGS.includes(Component) ? "inline-block" : "block"
        )}
        aria-labelledby={id}
        {...rest}
      >
        <span
          id={id}
          contentEditable={false}
          className={`absolute top-[-1.1rem] left-[-1px] ps-1 pe-1 rounded-tl-md rounded-tr-md ${colorSet["label-background"]} text-white text-[0.7rem] whitespace-nowrap select-none`}
        >
          {LABELS[type]}
        </span>

        <Validated type={type}>{children}</Validated>
      </Component>
    );
  }
);
