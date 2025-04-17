import React from "react";
import { Tag } from "../data/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
type TagsProps = {
  tags: Tag[];
  max?: number;
};

export const Tags = ({ tags, max }: TagsProps) => {
  const truncatedTags = max ? tags.slice(0, max) : tags;
  return (
    <div className="flex flex-wrap gap-1">
      {truncatedTags.map((tag) => (
        <span className="text-xs border border-gray-300 rounded-md px-1 py-[2px]" key={tag.id}>
          <FontAwesomeIcon className="pe-[2px] align-middle" icon={faTag} />
          {tag.name}
        </span>
      ))}
    </div>
  );
};
