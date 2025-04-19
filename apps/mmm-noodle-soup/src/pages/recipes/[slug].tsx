import React from "react";
import { Recipe } from "../../components/recipes/Recipe";
import { graphql, PageProps } from "gatsby";
import { Recipe as RecipeType } from "../../data/types";

type DataProps = {
  recipe: RecipeType;
};

type PageContext = {
  slug: string;
};

const RecipePage = ({
  data: { recipe },
}: PageProps<DataProps, PageContext>) => {
  return <Recipe recipe={recipe} />;
};

export default RecipePage;

export const query = graphql`
  query RecipeQuery($slug: String!) {
    recipe: sanityRecipe(slug: { current: { eq: $slug } }) {
      id
      slug {
        current
      }
      title
      description
      source
      tags {
        id
        name
      }
      image {
        asset {
          gatsbyImageData(layout: CONSTRAINED, width: 300)
        }
      }
      servingsCount
      duration {
        preparation
        cooking
        waiting
      }
      _createdAt
      _updatedAt
      user {
        name
      }
      groupedIngredients {
        title
        ingredients {
          name
          amount
          unit
          comment
        }
      }
      groupedInstructions {
        title
        instructions
      }
    }
  }
`;
