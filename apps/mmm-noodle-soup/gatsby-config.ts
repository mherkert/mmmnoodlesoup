import type { GatsbyConfig } from "gatsby";
import dotenv from "dotenv";
dotenv.config({ path: `.env` });

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Mmm Noodle Soup`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require("tailwindcss")],
        cssLoaderOptions: {
          modules: {
            namedExport: false,
            exportLocalsConvention: "asIs",
          },
        },
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "04qgrpgb", // TODO: consider changing name in sanity.io
        dataset: "production",
        watchMode: true, // only dev mode
        apiVersion: "2021-03-25",
        token: process.env.GATSBY_SANITY_TOKEN,
      },
    },
  ],
};

export default config;
