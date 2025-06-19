import React, { useState } from "react";
import Downshift from "downshift";
import classNames from "classnames";
import { graphql, navigate } from "gatsby";
import { useStaticQuery } from "gatsby";
import { RecipeSearchResult } from "../../data/types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useFuzzySearch } from "../../hooks/useFuzzySearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../buttons/Button";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { recipes } = useStaticQuery(graphql`
    query {
      recipes: allSanityRecipe {
        nodes {
          id
          title
          description
          slug {
            current
          }
          image {
            asset {
              gatsbyImageData(layout: CONSTRAINED, width: 30, height: 30)
            }
          }
        }
      }
    }
  `) as { recipes: { nodes: RecipeSearchResult[] } };

  const filteredRecipes = useFuzzySearch<RecipeSearchResult>(
    recipes.nodes,
    ["title", "description"],
    searchTerm
  );

  return (
    <Downshift
      onChange={(selection) => {
        navigate(`/recipes/${selection.slug.current}`);
      }}
      onInputValueChange={(inputValue) => {
        setSearchTerm(inputValue);
      }}
      itemToString={(item) => (item ? item.title : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div>
          <div className="lg:w-[var(--search-input-width-lg)] md:w-[var(--search-input-width-md)] w-[var(--search-input-width-sm)]">
            <label {...getLabelProps()} className="sr-only">
              Search a recipe
            </label>
            <div
              className="bg-white flex shadow-sm  gap-0.5 rounded-md focus-within:ring-2 focus-within:ring-white 
              focus-within:ring-offset-2 focus-within:ring-offset-primary"
              {...getRootProps({}, { suppressRefError: true })}
            >
              <input
                placeholder="Find your new favourite recipe"
                className="lg:w-[var(--search-input-width-lg)] md:w-[var(--search-input-width-md)] w-[var(--search-input-width-sm)] rounded-md 
               py-2 px-2 text-sm/6 focus:outline-none"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    navigate(
                      `/recipes?search=${encodeURIComponent(searchTerm)}`
                    );
                  }
                }}
                {...getInputProps()}
              />
              <Button variant="ghost" size="sm" {...getToggleButtonProps()}>
                {isOpen ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </Button>
            </div>
          </div>
          <ul
            className={`absolute rounded-md lg:w-[var(--search-input-width-lg)] md:w-[var(--search-input-width-md)] w-[var(--search-input-width-sm)]  bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
              !(isOpen && filteredRecipes.length) && "hidden"
            }`}
            {...getMenuProps()}
          >
            {isOpen
              ? filteredRecipes.map((item, index) => (
                  <li
                    className={classNames(
                      highlightedIndex === index && "bg-primary-highlight",
                      selectedItem === item && "font-bold",
                      "py-2 px-3 shadow-sm flex gap-2"
                    )}
                    {...getItemProps({
                      key: item.title,
                      index,
                      item,
                    })}
                  >
                    <div>
                      {item.image?.asset && (
                        <GatsbyImage
                          image={getImage(item.image?.asset)!}
                          alt=""
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div>{item.title}</div>
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
};
