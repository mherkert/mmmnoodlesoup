import React, { forwardRef, useId, memo } from "react";
import { LABELS, recipeElementColorVars } from "./constants";
import { BlockType } from "./types";
import { MarkType } from "./types";
import { WrapType } from "./types";

type RecipeNodeProps = {
  children?: React.ReactNode;
  type: BlockType | MarkType | WrapType;
  as?: "p" | "span" | "div";
} & React.HTMLAttributes<HTMLElement>;

export const RecipeNode = memo(
  forwardRef<HTMLElement, RecipeNodeProps>(
    ({ as, type, children, ...rest }, ref) => {
      console.log("render type", type);
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
          className={`${Component === "span" ? "inline-block" : ""} border border-solid rounded-tr-md rounded-br-md rounded-bl-md px-1 py-[2px] w-fit mt-7 relative ps-6 pe-6
        ${colorSet.border}
        ${colorSet.background}
        `}
          aria-labelledby={id}
          {...rest}
        >
          <span
            id={id}
            contentEditable={false}
            className={`absolute top-[-1.1rem] left-[-0.1rem] ps-1 pe-1 rounded-tl-md rounded-tr-md ${colorSet["label-background"]} text-white text-[0.7rem] whitespace-nowrap select-none`}
          >
            {LABELS[type]}
          </span>
          {children}
        </Component>
      );
    }
  )
);
