import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

interface SanityWebhookPayload {
  _type: string;
  _id: string;
  [key: string]: any;
}

interface NetlifyBuildResponse {
  id: string;
  status: string;
  [key: string]: any;
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
    const sanitySignature = event.headers[SIGNATURE_HEADER_NAME];
    const secret = process.env.SANITY_WEBHOOK_SECRET;
    const body = event.body;

    if (!secret) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Webhook secret is not configured." }),
      };
    }

    if (!body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Request has no body." }),
      };
    }

    if (!sanitySignature) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Missing Sanity signature header." }),
      };
    }

    if (!isValidSignature(body, secret, sanitySignature)) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid signature." }),
      };
    }

    // Parse the webhook payload
    const payload: SanityWebhookPayload = JSON.parse(event.body || "{}");

    // Check if this is a recipe or user related change
    if (payload._type === "recipe" || payload._type === "user") {
      console.log("Recipe or user change detected, triggering rebuild...");

      // Validate required environment variables
      const siteId = process.env.NETLIFY_SITE_ID;
      const accessToken = process.env.NETLIFY_ACCESS_TOKEN;

      if (!siteId || !accessToken) {
        throw new Error(
          "Missing required environment variables: NETLIFY_SITE_ID or NETLIFY_ACCESS_TOKEN"
        );
      }

      // Trigger Netlify rebuild using fetch
      const response = await fetch(
        `https://api.netlify.com/api/v1/sites/${siteId}/builds`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Content update: ${payload._type} ${payload._id} - Triggered by Sanity webhook`,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Netlify API error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const result: NetlifyBuildResponse = await response.json();

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Rebuild triggered successfully",
          buildId: result.id,
          status: result.status,
        }),
      };
    }

    // If not a recipe change, just acknowledge
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Webhook received, no rebuild needed",
        type: payload._type,
      }),
    };
  } catch (error) {
    console.error("Error processing webhook:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal server error",
        details: errorMessage,
      }),
    };
  }
};
