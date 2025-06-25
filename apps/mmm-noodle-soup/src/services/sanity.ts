import createClient from "@sanity/client";
import { NewRecipe } from "../data/types";

// Create Sanity client for read operations using public API
export const sanityClient = createClient({
  projectId: "04qgrpgb",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Use CDN for read operations
  // No token needed for public read access
});

// Create Sanity client for development (bypasses CDN for fresh data)
export const sanityClientDev = createClient({
  projectId: "04qgrpgb",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // No CDN for development
  // No token needed for public read access
});

// Create Sanity client for mutations (with credentials) - only for development
export const sanityClientWithAuth = createClient({
  projectId: "04qgrpgb",
  dataset: "production",
  apiVersion: "2024-01-01",
  ...(process.env.NODE_ENV === "development" && {
    token: process.env.SANITY_TOKEN,
  }),
  useCdn: false,
  // TODO: for local development add the gatsby token
});

// Generate a slug from a title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove special characters
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
};

// Check if slug exists and generate unique one
export const generateUniqueSlug = async (title: string): Promise<string> => {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;

  // Check if slug exists
  while (true) {
    const existingRecipe = await sanityClient.fetch(
      `*[_type == "recipe" && slug.current == $slug][0]`,
      { slug }
    );

    if (!existingRecipe) {
      break; // Slug is unique
    }

    // Generate new slug with counter
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

// Recipe creation function - uses Netlify Function in production, direct call in development
export const createRecipe = async (recipeData: NewRecipe) => {
  if (process.env.NODE_ENV === "development") {
    // Use direct Sanity call in development
    try {
      const result = await sanityClientWithAuth.create({
        _type: "recipe",
        ...recipeData,
      });
      return result;
    } catch (error) {
      console.error("Error creating recipe:", error);
      throw error;
    }
  } else {
    // Use Netlify Function in production
    try {
      const response = await fetch("/.netlify/functions/create-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create recipe");
      }

      const result = await response.json();
      return result.recipe;
    } catch (error) {
      console.error("Error creating recipe:", error);
      throw error;
    }
  }
};

// Get user by email - uses read-only client
export const getUserByEmail = async (email: string) => {
  try {
    const user = await sanityClient.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Create user if they don't exist - uses Netlify Function in production
export const createUser = async (userData: any) => {
  if (process.env.NODE_ENV === "development") {
    // Use direct Sanity call in development
    try {
      const result = await sanityClientWithAuth.create({
        _type: "user",
        ...userData,
      });
      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  } else {
    // Use Netlify Function in production
    try {
      const response = await fetch("/.netlify/functions/user-management", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "create",
          userData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user");
      }

      const result = await response.json();
      return result.user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
};

// Update user's Auth0 IDs - uses Netlify Function in production
export const updateUserAuth0Ids = async (userId: string, auth0Id: string) => {
  if (process.env.NODE_ENV === "development") {
    // Use direct Sanity call in development
    try {
      const user = await sanityClientWithAuth.getDocument(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const auth0Ids = user.auth0Ids || [];

      if (!auth0Ids.includes(auth0Id)) {
        await sanityClientWithAuth
          .patch(userId)
          .set({
            auth0Ids: [...auth0Ids, auth0Id],
          })
          .commit();
      }

      return user;
    } catch (error) {
      console.error("Error updating user Auth0 IDs:", error);
      throw error;
    }
  } else {
    // Use Netlify Function in production
    try {
      const response = await fetch("/.netlify/functions/user-management", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update-auth0-ids",
          userData: { userId, auth0Id },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update user");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error updating user Auth0 IDs:", error);
      throw error;
    }
  }
};
