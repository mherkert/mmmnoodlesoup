import React, { useState, useEffect } from "react";
import { RouteComponentProps, Router } from "@reach/router";
import { sanityClient } from "../services/sanity";
import { Recipe as RecipeType } from "../data/types";
import { Recipe } from "../components/recipe/Recipe";

export default function DynamicRecipe() {
  return (
    <Router basepath="/recipes">
      <RecipeClientOnly path=":slug" />
    </Router>
  );
}

interface DynamicRecipeProps extends RouteComponentProps {
  slug?: string;
}
const RecipeClientOnly = ({ slug }: DynamicRecipeProps) => {
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);

        const result = await sanityClient.fetch(
          `*[_type == "recipe" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          description,
          source,
          image {
            asset-> {
              url,
              metadata {
                dimensions
              }
            }
          },
          imageCredit,
          tags[]-> {
            _id,
            name,
            slug
          },
          servingsCount,
          duration,
          groupedIngredients[] {
            _key,
            title,
            ingredients[] {
              _key,
              name,
              amount,
              unit,
              comment
            }
          },
          groupedInstructions[] {
            _key,
            title,
            instructions
          },
          user-> {
            _id,
            name,
            email
          },
          _createdAt,
          _updatedAt
        }`,
          { slug: slug }
        );
        setRecipe(result);
      } catch (error) {
        console.error(error);
        setError("Error fetching recipe");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading recipe...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Recipe not found</div>
      </div>
    );
  }

  return <Recipe recipe={recipe} />;
};


/**
 * {
    "query": "*[_type == \"recipe\" \u0026\u0026 slug.current == $slug][0] {\n          _id,\n          title,\n          slug,\n          description,\n          source,\n          image {\n            asset-\u003e {\n              url,\n              metadata {\n                dimensions\n              }\n            }\n          },\n          imageCredit,\n          tags[]-\u003e {\n            _id,\n            name,\n            slug\n          },\n          servingsCount,\n          duration,\n          groupedIngredients[] {\n            _key,\n            title,\n            ingredients[] {\n              _key,\n              name,\n              amount,\n              unit,\n              comment\n            }\n          },\n          groupedInstructions[] {\n            _key,\n            title,\n            instructions\n          },\n          user-\u003e {\n            _id,\n            name,\n            email\n          },\n          _createdAt,\n          _updatedAt\n        }",
    "result": {
        "_createdAt": "2025-06-24T19:43:13Z",
        "_id": "Yvtfl0jIDVoTVpisr6sXAv",
        "_updatedAt": "2025-06-24T19:43:13Z",
        "description": null,
        "duration": {
            "cooking": 45
        },
        "groupedIngredients": [],
        "groupedInstructions": [],
        "image": null,
        "imageCredit": null,
        "servingsCount": 20,
        "slug": {
            "current": "another-recipe"
        },
        "source": "From my own random collection of recipes",
        "tags": null,
        "title": "Another recipe",
        "user": {
            "_id": "953cb92e-b6b0-4646-8079-ff04eb46b8b9",
            "email": "marion.herkert@gmail.com",
            "name": "Marion Herkert"
        }
    },
    "syncTags": [
        "s1:X4UUzg",
        "s1:w0wlWQ"
    ],
    "ms": 5
}
 */