import createClient from "@sanity/client";

// Create Sanity client
export const sanityClient = createClient({
  projectId: "04qgrpgb", // Your project ID from gatsby-config.ts
  dataset: "production",
  apiVersion: "2024-01-01", // Use today's date or your preferred version
  token: process.env.GATSBY_SANITY_TOKEN, // We'll need to add this to env vars
  useCdn: false, // Set to false for mutations (create, update, delete)
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

// Recipe creation function
export const createRecipe = async (recipeData: any) => {
  try {
    const result = await sanityClient.create({
      _type: "recipe",
      ...recipeData,
    });
    return result;
  } catch (error) {
    console.error("Error creating recipe:", error);
    throw error;
  }
};

// Get user by email (more reliable than Auth0 ID)
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

// Create user if doesn't exist
export const createUser = async (userData: any) => {
  try {
    const result = await sanityClient.create({
      _type: "user",
      ...userData,
    });
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update user's Auth0 IDs (for tracking multiple social connections)
export const updateUserAuth0Ids = async (userId: string, auth0Id: string) => {
  try {
    const user = await sanityClient.getDocument(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const auth0Ids = user.auth0Ids || [];

    if (!auth0Ids.includes(auth0Id)) {
      await sanityClient
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
};
