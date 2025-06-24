import React from "react";
import { Recipe as RecipeComponent } from "../components/recipe/Recipe";
import { graphql, PageProps } from "gatsby";
import { Recipe as RecipeType } from "../data/types";
import { useEffect } from "react";
import { usePageStore } from "../store/PageStore";

type DataProps = {
  recipe: RecipeType;
};

type PageContext = {
  slug: string;
};

const RecipePage = ({
  data: { recipe },
}: PageProps<DataProps, PageContext>) => {
  const { setCurrentPage } = usePageStore();

  useEffect(() => {
    setCurrentPage("recipe");

    return () => {
      setCurrentPage(null);
    };
  }, []);

  return <RecipeComponent recipe={recipe} />;
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
        slug {
          current
        }
      }
      image {
        asset {
          gatsbyImageData(layout: CONSTRAINED, width: 600, height: 400)
        }
      }
      imageCredit
      servingsCount
      duration {
        preparation
        cooking
        waiting
      }
      _createdAt
      _updatedAt
      user {
        id
        name
        email
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
