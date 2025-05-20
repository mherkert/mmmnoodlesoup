import React, { forwardRef } from "react";
import { recipeElementColorVars } from "./constants/recipeElementColorVars";
import { BlockType, WrapType } from "./RecipeEditor";
import { MarkType } from "./RecipeEditor";

type RecipeNodeProps = {
  children?: React.ReactNode;
  type: BlockType | MarkType | WrapType;
  as?: "p" | "span" | "div";
} & React.HTMLAttributes<HTMLElement>;

export const RecipeNode = forwardRef<HTMLElement, RecipeNodeProps>(
  ({ as, type, children, ...rest }, ref) => {
    const Component = as || "span";
    const colorSet = recipeElementColorVars[
      type as keyof typeof recipeElementColorVars
    ] || {
      border: "inherit",
      background: "inherit",
    };
    return (
      <Component
        ref={ref as any}
        className={`border border-solid rounded-md px-1 py-[2px] w-fit
        ${colorSet.border}
        ${colorSet.background}
        `}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);
