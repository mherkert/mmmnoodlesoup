export type Ingredient = {
  name: string;
  amount?: number;
  unit?: string;
  comment?: string;
};

export type GroupedIngredients = {
  title?: string;
  ingredients: Ingredient[];
};

export type GroupedInstructions = {
  title?: string;
  instructions: string[];
};

export type Duration = {
  preparation?: number;
  cooking?: number;
  waiting?: number;
};

export type Metadata = {
  measurementSystem: "METRIC" | "IMPERIAL";
};

export type Slug = {
  current: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: Slug;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Recipe = {
  id: string;
  title: string;
  slug: Slug;
  description?: string;
  source?: string;
  image?: any; // TODO: fix type
  imageCredit?: string;
  tags?: Tag[];
  servingsCount?: number;
  duration?: Duration;
  metadata: Metadata;
  groupedIngredients: GroupedIngredients[];
  groupedInstructions: GroupedInstructions[];
  _createdAt: string;
  _updatedAt: string;
  user: User;
};

export type EditableRecipe = Partial<Recipe>;

export type NewRecipe = Omit<
  Recipe,
  "id" | "_createdAt" | "_updatedAt" | "metadata"
>;

export type RecipeSearchResult = Pick<
  Recipe,
  "id" | "title" | "description" | "slug" | "image"
>;

export type RecipeSummary = Pick<
  Recipe,
  | "id"
  | "title"
  | "description"
  | "tags"
  | "slug"
  | "duration"
  | "image"
  | "user"
>;

export type PaginatedResponse<T> = {
  data: T[];
  page: {
    totalCount: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
};
