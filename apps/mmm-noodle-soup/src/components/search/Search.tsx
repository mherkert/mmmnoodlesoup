import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { graphql, Link } from "gatsby";
import { useStaticQuery } from "gatsby";
import { RecipeSearchResult } from "../../data/types";

type Recipe = {
  title: string;
  slug: string;
};

/**
 * TODO:
 * - this is not quite working yet; visually or keyboard-wise;
 * - what's up with only every other link working?
 * - add a clear button?
 * - add a loading state?
 * - add a no results state?
 */
const Search = () => {
  const { recipes } = useStaticQuery(graphql`
    query {
      recipes: allSanityRecipe {
        nodes {
          id
          title
          slug {
            current
          }
        }
      }
    }
  `) as { recipes: { nodes: RecipeSearchResult[] } };

  // const recipes: Recipe[] = [
  //   { title: "Nusskuchen", slug: "nusskuchen" },
  //   { title: "Kaiserschmarrn", slug: "kaiserschmarrn" },
  // ];

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>();

  const [query, setQuery] = useState("");

  // todo: fuzzy search
  const filteredRecipes =
    query === ""
      ? recipes.nodes
      : recipes.nodes.filter((recipe) => {
          return recipe.title.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selectedRecipe}
      onChange={(recipe) => setSelectedRecipe(recipe as Recipe)}
      onClose={() => setQuery("")}
    >
      <div className="relative ">
        <ComboboxInput
          placeholder="Find your new favourite recipe"
          className="lg:w-[var(--search-input-width-lg)] md:w-[var(--search-input-width-md)] w-[var(--search-input-width-sm)] rounded-md py-2 px-2 text-sm/6 focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-white"
          displayValue={(recipe: { title: string }) =>
            recipe ? recipe.title : ""
          }
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton
          className="group absolute inset-y-0 right-0 px-2.5"
          aria-label="Search"
        >
          <FontAwesomeIcon aria-hidden icon={faSearch} />
        </ComboboxButton>
      </div>
      <ComboboxOptions
        anchor="bottom start"
        transition
        className="absolute lg:w-[var(--search-input-width-lg)] md:w-[var(--search-input-width-md)] w-[var(--search-input-width-sm)] bg-white rounded-md py-2 px-2 shadow-lg [--anchor-gap:4px] border empty:invisible"
        style={{
          zIndex: 10,
        }}
      >
        {filteredRecipes.map((recipe) => (
          <ComboboxOption
            data-active
            data-focus
            data-selected
            data-hover
            className="h-8 focus:bg-blue-500 active:border-purple-500 hover:bg-secondary-sage   data-selected:bg-blue-500 rounded-md"
            key={recipe.slug.current}
            value={recipe}
          >
            <Link to={`/recipes/${recipe.slug.current}`}>{recipe.title}</Link>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default Search;
