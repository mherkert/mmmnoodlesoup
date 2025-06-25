import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import createClient from "@sanity/client";

// Create Sanity client with authentication
const sanityClient = createClient({
  projectId: "04qgrpgb",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

interface UserData {
  email: string;
  name: string;
  image?: string;
  role?: string;
}

interface RequestBody {
  action: "create" | "update-auth0-ids" | "get-by-email";
  userData: UserData | { userId: string; auth0Id: string } | { email: string };
}

interface WebhookResponse {
  statusCode: number;
  body: string;
  headers?: Record<string, string>;
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
): Promise<WebhookResponse> => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { action, userData }: RequestBody = JSON.parse(event.body || "{}");

    switch (action) {
      case "create":
        return await createUser(userData as UserData);
      case "update-auth0-ids":
        const updateData = userData as { userId: string; auth0Id: string };
        return await updateUserAuth0Ids(updateData.userId, updateData.auth0Id);
      case "get-by-email":
        const emailData = userData as { email: string };
        return await getUserByEmail(emailData.email);
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid action" }),
        };
    }
  } catch (error) {
    console.error("Error in user management:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to process user request",
        details: errorMessage,
      }),
    };
  }
};

async function createUser(userData: UserData): Promise<WebhookResponse> {
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

async function updateUserAuth0Ids(
  userId: string,
  auth0Id: string
): Promise<WebhookResponse> {
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

async function getUserByEmail(email: string): Promise<WebhookResponse> {
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
