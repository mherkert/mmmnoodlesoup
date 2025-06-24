const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      recipes: allSanityRecipe {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const recipes = result.data.recipes.nodes;

  // Create static recipe pages for existing recipes
  recipes.forEach((recipe) => {
    createPage({
      path: `/recipes/${recipe.slug.current}`,
      component: path.resolve("./src/templates/StaticRecipe.tsx"),
      context: {
        slug: recipe.slug.current,
      },
    });
  });

  // Create dynamic recipe pages for newly created recipes
  createPage({
    path: "/recipes/dynamic", // This path will be handled with wildcard; the path is used internally by gatsby
    matchPath: "/recipes/*",
    component: require.resolve("./src/templates/DynamicRecipe.tsx"),
  });
};
