import React from "react";
import Layout from "./src/components/Layout";
import "./src/styles/global.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthBridge } from "./src/components/auth/AuthBridge";
// FontAwesome CSS import to prevent icon flashing
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export const wrapRootElement = ({ element }) => {
  const domain = process.env.GATSBY_AUTH0_DOMAIN;
  const clientId = process.env.GATSBY_AUTH0_CLIENT_ID;
  const redirectUri =
    typeof window !== "undefined" ? window.location.origin : "";

  if (!domain || !clientId) {
    console.error(
      "Auth0 configuration missing. Please check your environment variables."
    );
    return element;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: process.env.GATSBY_AUTH0_AUDIENCE,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <AuthBridge>{element}</AuthBridge>
    </Auth0Provider>
  );
};

export const wrapPageElement = ({
  element,
  props,
}: {
  element: React.ReactNode;
  props: React.HTMLAttributes<HTMLDivElement>;
}) => {
  return <Layout {...props}>{element}</Layout>;
};
