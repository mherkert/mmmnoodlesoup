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

  recipes.forEach((recipe) => {
    createPage({
      path: `/recipes/${recipe.slug.current}`,
      component: path.resolve("./src/templates/recipe.tsx"),
      context: {
        slug: recipe.slug.current,
      },
    });
  });
};
