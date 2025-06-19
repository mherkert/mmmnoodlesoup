import React from "react";
import { RecipePreview } from "../../components/recipe/RecipePreview";
import { graphql, PageProps } from "gatsby";
import { RecipeSummary } from "../../data/types";
import { useRecipeFilter } from "../../hooks/useRecipeFilter";

type DataProps = {
  recipes: {
    nodes: RecipeSummary[];
  };
};

const RecipesPage = ({ data: { recipes } }: PageProps<DataProps>) => {
  const [filteredRecipes, queryTerm, queryTags] = useRecipeFilter(
    recipes.nodes
  );

  return (
    <>
      {/* TODO: <TagsFilter currentTags={tags} /> */}
      <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {filteredRecipes.map((recipe: RecipeSummary) => (
          <RecipePreview
            className="max-w-96 h-96"
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </section>
      {filteredRecipes.length === 0 && (
        <RecipesNotFoundMessage queryTerm={queryTerm} queryTags={queryTags} />
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

const RecipesNotFoundMessage = ({
  queryTerm,
  queryTags,
}: {
  queryTerm: string | null;
  queryTags: string[] | null;
}) => {
  const reason = [
    queryTerm ? `search term "${queryTerm}"` : null,
    queryTags && queryTags?.length > 0
      ? `tags "${queryTags?.join(", ")}"`
      : null,
  ]
    .filter(Boolean)
    .join(" and ");

  return (
    <div className="text-center text-gray-500">
      No recipes found for {reason}.
    </div>
  );
};
