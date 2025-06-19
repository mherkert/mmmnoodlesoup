import { RecipeSummary } from "../data/types";
import { useFuzzySearch } from "./useFuzzySearch";
import { useLocation } from "@reach/router";

export const useRecipeFilter = (recipes: RecipeSummary[]): [RecipeSummary[], string | null, string[] | null] => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
  
    const queryTerm = searchParams.get("search");
    const queryTags = searchParams.getAll("tag");

    let filteredRecipes = useFuzzySearch<RecipeSummary>(
      recipes,
      ["title", "description"],
      queryTerm
    );
  
    if (queryTags.length > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        queryTags.every((queryTag) =>
          recipe.tags?.map((recipeTag) => recipeTag.name).includes(queryTag)
        )
      );
    }

  return [filteredRecipes, queryTerm, queryTags];
};