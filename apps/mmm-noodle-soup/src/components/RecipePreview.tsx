import React from "react";
import { Card } from "./Card";
import { RecipeSummary } from "../data/types";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import classNames from "classnames";
import { Tags } from "./tags/Tags";
import { Duration } from "./duration/Duration";

export type RecipePreviewProps = {
  recipe: RecipeSummary;
  className?: string;
};
export const RecipePreview = ({
  recipe,
  className,
  ...props
}: RecipePreviewProps & React.HTMLAttributes<HTMLDivElement>) => {
  const imagePlaceholder = getImage(recipe.image.asset);

  const trimText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <article {...props}>
      <Link
        to={`/recipes/${recipe.slug.current}`}
        className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
        aria-labelledby={`recipe-title-${recipe.id}`}
      >
        <Card
          className={classNames("flex flex-col justify-between", className)}
        >
          <div>
            <Card.Image>
              {imagePlaceholder && (
                <GatsbyImage
                  image={imagePlaceholder}
                  alt=""
                  aria-hidden="true"
                />
              )}
            </Card.Image>
            <Card.Title id={`recipe-title-${recipe.id}`}>
              {recipe.title}
            </Card.Title>
            <Card.Description>
              {trimText(recipe.description, 100)}
            </Card.Description>
          </div>
          <Card.Footer className="flex justify-between">
            <Duration duration={recipe.duration} />
            <Tags tags={recipe.tags} max={2} />
          </Card.Footer>
        </Card>
      </Link>
    </article>
  );
};
