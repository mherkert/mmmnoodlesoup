import React from "react";
import { Tag } from "../../data/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "gatsby";
import classNames from "classnames";
type TagsProps = {
  tags: Tag[];
  link?: boolean;
  max?: number;
};

export const Tags = ({ tags, link = false, max }: TagsProps) => {
  if (tags.length === 0) {
    return null;
  }

  const truncatedTags = max ? tags.slice(0, max) : tags;
  return (
    <ul
      className="flex flex-wrap gap-1 list-none p-0 m-0"
      aria-label="Recipe tags"
    >
      {truncatedTags.map((tag) => {
        const tagJsx = (
          <>
            <FontAwesomeIcon
              className="pe-[2px] align-middle"
              icon={faTag}
              aria-hidden="true"
            />
            {tag.name}
          </>
        );
        return (
          <li
            className={classNames(
              "text-xs border border-gray-300 rounded-md px-1 py-[2px] flex items-center",
              link ? "hover:bg-gray-200" : ""
            )}
            key={tag.id}
            aria-label={tag.name}
          >
            {link ? (
              <Link to={`/recipes?tag=${tag.slug.current}`}>{tagJsx}</Link>
            ) : (
              tagJsx
            )}
          </li>
        );
      })}
    </ul>
  );
};
