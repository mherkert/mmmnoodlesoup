import React from "react";
import Layout from "./src/components/Layout";
import "./src/styles/global.css";
import { Auth0Provider } from "@auth0/auth0-react";

export const wrapPageElement = ({
  element,
  props,
}: {
  element: React.ReactNode;
  props: React.HTMLAttributes<HTMLDivElement>;
}) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN!}
      clientId={process.env.GATSBY_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
    >
      <Layout {...props}>{element}</Layout>
    </Auth0Provider>
  );
};
