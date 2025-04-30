import { useStaticQuery, graphql, Link } from "gatsby";
import React from "react";
import { Tag } from "../../data/types";
import { Button } from "../buttons/Button";

// TODO: this is how one can do static queries in Gatsby; I don't want a tags filter just now, but keeping it here for future reference
export const TagsFilter = ({ tags }: { tags?: Tag[] }) => {
  const { allTags } = useStaticQuery(graphql`
    query {
      allTags: allSanityTag {
        nodes {
          name
          id
          _id
        }
      }
    }
  `);
  console.log(tags);
  return (
    <div>
      <Link to="/tags">
        <Button>All</Button>
      </Link>
      {allTags.nodes?.map((tag: any) => (
        <Link to={`/tags/${tag.id}`}>
          <Button>{tag.name}</Button>
        </Link>
      ))}
    </div>
  );
};
