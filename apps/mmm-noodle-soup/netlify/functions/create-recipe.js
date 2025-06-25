import { createClient } from "@sanity/client";

// Create Sanity client with authentication
const sanityClient = createClient({
  projectId: "04qgrpgb",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse the request body
    const recipeData = JSON.parse(event.body);

    // Validate required fields
    if (!recipeData.title || !recipeData.slug) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Missing required fields: title and slug",
        }),
      };
    }

    // Create the recipe in Sanity
    const result = await sanityClient.create({
      _type: "recipe",
      ...recipeData,
    });

    console.log("Recipe created successfully:", result._id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        recipe: result,
      }),
    };
  } catch (error) {
    console.error("Error creating recipe:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to create recipe",
        details: error.message,
      }),
    };
  }
};
