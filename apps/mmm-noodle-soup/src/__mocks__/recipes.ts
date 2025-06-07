import { Recipe } from "../data/types";

export const mockRecipes: Recipe[] = [
  {
    id: "recipe-1",
    _createdAt: "2024-01-01T12:00:00Z",
    _updatedAt: "2024-01-01T12:00:00Z",
    title: "Test Recipe 1",
    description: "A delicious test recipe",
    duration: {
      preparation: 15,
      cooking: 30,
      waiting: 0,
    },
    tags: [
      {
        id: "tag-1",
        name: "Tag 1",
        slug: {
          current: "tag-1",
        },
      },
    ],
    groupedIngredients: [
      {
        title: "Ingredients Title",
        ingredients: [
          {
            name: "Test Ingredient 1",
            amount: 100,
            unit: "g",
            comment: "Comment 1",
          },
          {
            name: "Test Ingredient 2",
            amount: 2,
            unit: "tbsp",
            comment: "Comment 2",
          },
        ],
      },
    ],
    groupedInstructions: [
      {
        title: "Instructions Title",
        instructions: ["Test instruction 1", "Test instruction 2"],
      },
    ],
    source: "https://example.com/recipe",
    user: {
      id: "user-1",
      name: "Test User",
      email: "test@example.com",
    },
    slug: {
      current: "recipe-1",
    },
    servingsCount: 2,
    metadata: {
      measurementSystem: "METRIC",
    },
  },
  {
    id: "recipe-2",
    _createdAt: "2024-01-02T12:00:00Z",
    _updatedAt: "2024-01-02T12:00:00Z",
    title: "Test Recipe 2",
    description: "Another test recipe",
    slug: {
      current: "recipe-2",
    },
    servingsCount: 2,
    metadata: {
      measurementSystem: "METRIC",
    },
    duration: {
      preparation: 10,
      cooking: 20,
      waiting: 5,
    },
    tags: [
      {
        id: "tag-2",
        name: "Tag 2",
        slug: {
          current: "tag-2",
        },
      },
    ],
    groupedIngredients: [
      {
        title: "Ingredients Title",
        ingredients: [
          {
            name: "Test Ingredient 3",
            amount: 1,
            unit: "cup",
          },
        ],
      },
    ],
    groupedInstructions: [
      {
        title: "Instructions Title",
        instructions: ["Test instruction 3"],
      },
    ],
    source: "https://example.com/recipe2",
    user: {
      id: "user-1",
      name: "Test User",
      email: "test@example.com",
    },
  },
];

// Helper function to create a recipe with specific properties
export const createMockRecipe = (overrides: Partial<Recipe> = {}): Recipe => {
  return {
    id: "recipe-mock",
    title: "Mock Recipe",
    description: "A mock recipe for testing",
    _createdAt: "2024-01-01T12:00:00Z",
    _updatedAt: "2024-01-01T12:00:00Z",
    user: {
      id: "user-mock",
      name: "Mock User",
      email: "mock@example.com",
    },
    duration: {
      preparation: 10,
      waiting: 30,
      cooking: 20,
    },
    source: "https://example.com/mock",
    tags: [
      {
        id: "tag-1",
        name: "Tag 1",
        slug: { current: "tag-1" },
      },
      {
        id: "tag-2",
        name: "Tag 2",
        slug: { current: "tag-2" },
      },
    ],
    slug: {
      current: "recipe-mock",
    },
    metadata: {
      measurementSystem: "METRIC",
    },
    servingsCount: 2,
    groupedIngredients: [
      {
        title: "Ingredients Title 1",
        ingredients: [
          {
            amount: 100,
            name: "Test Ingredient 1",
            comment: "Comment 1",
          },
          {
            amount: 2,
            unit: "tbsp",
            name: "Test Ingredient 2",
          },
          {
            name: "Test Ingredient 3",
          },
        ],
      },
      {
        title: "Ingredients Title 2",
        ingredients: [
          {
            amount: 1,
            unit: "cup",
            name: "Test Ingredient 4",
            comment: "Comment 4",
          },
        ],
      },
    ],
    groupedInstructions: [
      {
        title: "Instructions Title 1",
        instructions: [
          "Test instruction 1",
          "Test instruction 2",
          "Test instruction 3",
        ],
      },
      {
        title: "Instructions Title 2",
        instructions: ["Test instruction 4", "Test instruction 5"],
      },
    ],
    ...overrides,
  };
};
