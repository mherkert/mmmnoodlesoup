import React, { ReactNode } from "react";
import { BlockType, MarkType, WrapType } from "./types";
import { nonEmptyString, safeNumber, ValidationFailed } from "./utils/validate";
import { BLOCK_TYPES, MARK_TYPES } from "./constants";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type ValidatedProps = {
  children: ReactNode;
  type: BlockType | MarkType | WrapType;
};

const SafeNumberFn = (s: string) => safeNumber(s);
const NonEmptyStringFn = (s: string) => nonEmptyString(s);

const MARK_VALIDATORS = {
  durationPreparation: SafeNumberFn,
  durationWaiting: SafeNumberFn,
  durationCooking: SafeNumberFn,
  servingsCount: SafeNumberFn,
};

const BLOCK_VALIDATORS = {
  title: NonEmptyStringFn,
  description: NonEmptyStringFn,
};

export const Validated = ({ children, type }: ValidatedProps) => {
  console.log("children", { children }, type);
  let validationFailed: ValidationFailed | undefined;
  if (MARK_TYPES.includes(type as MarkType)) {
    const validateMark = MARK_VALIDATORS[type as keyof typeof MARK_VALIDATORS];
    if (validateMark && React.isValidElement(children)) {
      const text = children.props?.text?.text;
      if (text) {
        const validationResult = validateMark(text);
        if (validationResult.kind === "failure") {
          validationFailed = validationResult;
        }
      }
    }
  } else if (BLOCK_TYPES.includes(type as BlockType)) {
    console.log("block");
    const validateBlock =
      BLOCK_VALIDATORS[type as keyof typeof BLOCK_VALIDATORS];
    if (validateBlock && Array.isArray(children) && children.length > 0) {
      const validationResult = validateBlock(children[0].props.text.text);
      if (validationResult.kind === "failure") {
        validationFailed = validationResult;
      }
    }
  }

  if (validationFailed) {
    return (
      <span className="">
        <span contentEditable={false} className="text-red-500 text-xs pe-4">
          <FontAwesomeIcon icon={faExclamationTriangle}  className="pe-1"/>
          {validationFailed.reason}
        </span>
        {children}
      </span>
    );
  }

  return children;
};

export default Validated;
