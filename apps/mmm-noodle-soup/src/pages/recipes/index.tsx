import React from "react";
import { RecipePreview } from "../../components/recipes/RecipePreview";
import { graphql, PageProps } from "gatsby";
import { RecipeSummary } from "../../data/types";

type DataProps = {
  recipes: {
    nodes: RecipeSummary[];
  };
};

const RecipesPage = ({ data: { recipes } }: PageProps<DataProps>) => {
  return (
    <section className="flex flex-col md:flex-row md:flex-wrap gap-4">
      {recipes.nodes.map((recipe) => (
        <RecipePreview
          className="max-w-96 h-96"
          key={recipe.id}
          recipe={recipe}
        />
      ))}
    </section>
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
          id
          name
        }
        image {
          asset {
            gatsbyImageData(layout: CONSTRAINED, width: 384, height: 216)
          }
        }
        duration {
          preparation
          cooking
          waiting
        }
        user {
          id
          name
          email
        }
      }
    }
  }
`;
