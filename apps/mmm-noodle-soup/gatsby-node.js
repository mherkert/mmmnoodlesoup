const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allSanityRecipe {
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

  const recipes = result.data.allSanityRecipe.nodes;

  recipes.forEach((recipe) => {
    createPage({
      path: `/recipes/${recipe.slug.current}`,
      component: path.resolve("./src/pages/recipes/[slug].tsx"),
      context: {
        slug: recipe.slug.current,
      },
    });
  });
};
