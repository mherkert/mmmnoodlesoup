import React from "react";
import { RecipePreview } from "../../components/RecipePreview";
import { graphql, PageProps } from "gatsby";
import { RecipeSummary } from "../../data/types";


type DataProps = {
  recipes: {
    nodes: RecipeSummary[]
  }
}

const RecipesPage = ({ data: { recipes } }: PageProps<DataProps>) => {
  return (
    <div className="flex gap-4">
      {recipes.nodes.map((recipe) => (
        <RecipePreview className="w-96" key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesPage;

export const query = graphql`
  query {
    recipes: allSanityRecipe {
      nodes {
        id
        slug {
          current
        }
        title
        description
        tags {
          name
        }
        image {
          asset {
            gatsbyImageData(layout: CONSTRAINED, width: 300)
          }
        }
        duration {
          preparation
          cooking
          waiting
        }
        user {
          name
        }
      }
    }
  }
`;
