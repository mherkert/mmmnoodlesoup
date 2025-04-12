import React from "react";
import { Recipe } from "../../components/Recipe";

const RecipePage = () => {
  // const { id } = useParams<{ id: string }>();
  return (
    <Recipe
     recipe={{
      id: "sample-recipe",
      title: "Spicy Miso Ramen",
      description: "A warming bowl of ramen with rich miso broth and tender pork belly",
      image: new URL("https://redhousespice.com/wp-content/uploads/2022/11/chicken-noodle-soup-with-mushrooms-scaled.jpg"),
      source: "https://example.com/ramen.jpg",
      tags: ["japanese", "soup", "noodles", "pork"],
      servingsCount: 4,
      time: {
        preparation: 30,
        cooking: 60,
        waiting: 15
      },
      publishedAt: new Date("2022-11-01"),
      updatedAt: new Date("2022-11-01"),
      author: "Marion Herkert",
      metadata: {
        measurementSystem: "METRIC"
      },
      groupedIngredients: [
        {
          title: "Broth",
          ingredients: [
            { amount: 2, unit: "L", name: "chicken stock" },
            { amount: 3, unit: "tbsp", name: "miso paste" },
            { amount: 2, unit: "tbsp", name: "soy sauce" }
          ]
        },
        {
          title: "Toppings",
          ingredients: [
            { amount: 400, unit: "g", name: "pork belly" },
            { amount: 4, name: "soft-boiled eggs" },
            { amount: 200, unit: "g", name: "bean sprouts" },
            { amount: 4, unit: "portions", name: "ramen noodles" }
          ]
        }
      ],
      groupedInstructions: [
        {
          title: "Broth",
          instructions: [
            "Bring chicken stock to a simmer",
            "Whisk in miso paste and soy sauce",
            "Simmer for 15 minutes to combine flavors"
          ]
        },
        {
          title: "Assembly",
          instructions: [
            "Cook noodles according to package instructions",
            "Slice pork belly",
            "Divide noodles between bowls",
            "Pour hot broth over noodles",
            "Top with pork, eggs, and bean sprouts"
          ]
        }
      ]
     }}
    />
  );
};

export default RecipePage;
