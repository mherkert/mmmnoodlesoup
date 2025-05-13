import React, { useMemo } from "react";
import { RecipePreview } from "../../components/recipes/RecipePreview";
import { graphql, PageProps } from "gatsby";
import { useLocation } from "@reach/router";
import { RecipeSummary } from "../../data/types";
import Fuse from "fuse.js";
import { useFilteredRecipes } from "../../hooks/useFilteredRecipes";

type DataProps = {
  recipes: {
    nodes: RecipeSummary[];
  };
};


const RecipesPage = ({ data: { recipes } }: PageProps<DataProps>) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");
  const [filteredRecipes] = useFilteredRecipes(
    recipes.nodes,
    ["title", "description"],
    searchTerm
  );

  return (
    <>
      <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {filteredRecipes.map((recipe: RecipeSummary) => (
          <RecipePreview
            className="max-w-96 h-96"
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </section>
      {searchTerm && filteredRecipes.length === 0 && (
        <div className="text-center text-gray-500">
          No recipes found matching "{searchTerm}"
        </div>
      )}
    </>
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
          slug {
            current
          }
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
