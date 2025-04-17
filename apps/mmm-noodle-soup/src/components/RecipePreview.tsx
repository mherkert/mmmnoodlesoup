import React from "react";
import { Card } from "./Card";
import { RecipeSummary } from "../data/types";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Tags } from "./Tags";
export type RecipePreviewProps = {
  recipe: RecipeSummary;
  className?: string;
};
export const RecipePreview = ({
  recipe,
  className,
  ...props
}: RecipePreviewProps & React.HTMLAttributes<HTMLDivElement>) => {
  const preparation: number = recipe.duration.preparation || 0;
  const waiting: number = recipe.duration.waiting || 0;
  const cooking: number = recipe.duration.cooking || 0;

  const imagePlaceholder = getImage(recipe.image.asset);

  const trimText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Link to={`/recipes/${recipe.slug.current}`}>
      <Card
        className={classNames("flex flex-col justify-between", className)}
        {...props}
      >
        <div>
          <Card.Image>
            {imagePlaceholder && (
              <GatsbyImage image={imagePlaceholder} alt={recipe.title} />
            )}
          </Card.Image>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Description>
            {trimText(recipe.description, 100)}
          </Card.Description>
        </div>
        <Card.Footer className="flex justify-between">
          <span>
            <FontAwesomeIcon className="pe-1" icon={faClock} />
            {preparation + waiting + cooking} min
          </span>
          <span>
            <Tags tags={recipe.tags} max={2} />
          </span>
        </Card.Footer>
      </Card>
    </Link>
  );
};
