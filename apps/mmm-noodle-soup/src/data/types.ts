export type Ingredient = {
  name: string;
  amount?: number;
  unit?: string;
  comment?: string;
};

export type GroupedIngredients = {
  title: string;
  ingredients: Ingredient[];
};

export type GroupedInstructions = {
  title: string;
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

export type Recipe = {
  id: string;
  title: string;
  slug: Slug;
  description: string;
  source: string | URL;
  image: URL;
  tags: string[];
  servingsCount: number;
  duration: Duration;
  metadata: Metadata;
  groupedIngredients: GroupedIngredients[];
  groupedInstructions: GroupedInstructions[];
  createdAt: Date;
  updatedAt: Date;
  user: string;
};

export type RecipeSummary = Pick<
  Recipe,
  "id" | "title" | "description" | "tags" | "slug" | "duration" | "image" | "user"
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
