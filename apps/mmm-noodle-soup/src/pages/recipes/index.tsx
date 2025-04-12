import React from "react";
import { RecipePreview } from "../../components/RecipePreview";

const recipes = [
  {
    id: "c1r2",
    title: "Banoffee Pie",
    description: "BananaDrama",
    image: new URL("https://redhousespice.com/wp-content/uploads/2022/11/chicken-noodle-soup-with-mushrooms-scaled.jpg"),
    tags: ["party"],
    servingsCount: 12,
    time: {
      preparation: 20,
      cooking: 60,
      waiting: 0,
    },
    metadata: {
      measurementSystem: "METRIC",
    },
    groupedIngredients: [
      {
        title: "Everything",
        ingredients: [
          { amount: 5, name: "eggs" },
          { amount: 240, unit: "g", name: "flour" },
          { amount: 3, name: "bananas" },
          { amount: 100, unit: "ml", name: "milk" },
        ],
      },
    ],
    groupedInstructions: [
      {
        title: "Everything",
        instructions: [
          "Mix all ingredients.",
          "Put in a dish.",
          "Put in the oven.",
        ],
      },
    ],
  },
  // Additional mock recipes
  {
    id: "c1r3",
    title: "Chocolate Cake",
    description: "Classic chocolate cake",
    image: new URL("https://img.chefkoch-cdn.de/rezepte/1031841208350942/bilder/1537796/crop-642x428/kaiserschmarrn-tiroler-landgasthofrezept.jpg"),
    tags: ["dessert", "chocolate"],
    servingsCount: 8,
    time: {
      preparation: 30,
      cooking: 45,
    },
    metadata: {
      measurementSystem: "METRIC",
    },
    groupedIngredients: [
      {
        title: "Everything",
        ingredients: [
          { amount: 3, name: "eggs" },
          { amount: 200, unit: "g", name: "flour" },
          { amount: 150, unit: "g", name: "chocolate" },
        ],
      },
    ],
    groupedInstructions: [
      {
        title: "Everything",
        instructions: [
          "Mix dry ingredients",
          "Add wet ingredients",
          "Bake at 180°C",
        ],
      },
    ],
  },
];

const RecipesPage = () => {
  return (
    <div className="flex gap-4">
      {recipes.map((recipe) => (
        <RecipePreview className="w-96" key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesPage;
