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
    const { action, userData } = JSON.parse(event.body);

    switch (action) {
      case "create":
        return await createUser(userData);
      case "update-auth0-ids":
        return await updateUserAuth0Ids(userData.userId, userData.auth0Id);
      case "get-by-email":
        return await getUserByEmail(userData.email);
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid action" }),
        };
    }
  } catch (error) {
    console.error("Error in user management:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to process user request",
        details: error.message,
      }),
    };
  }
};

async function createUser(userData) {
  const result = await sanityClient.create({
    _type: "user",
    ...userData,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      user: result,
    }),
  };
}

async function updateUserAuth0Ids(userId, auth0Id) {
  const user = await sanityClient.getDocument(userId);
  if (!user) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "User not found" }),
    };
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

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: "Auth0 IDs updated",
    }),
  };
}

async function getUserByEmail(email) {
  const user = await sanityClient.fetch(
    `*[_type == "user" && email == $email][0]`,
    { email }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      user,
    }),
  };
}
