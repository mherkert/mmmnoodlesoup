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

export type Time = {
  preparation?: number;
  cooking?: number;
  waiting?: number;
};

export type Metadata = {
  measurementSystem: "METRIC" | "IMPERIAL";
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  source: string | URL;
  image: URL;
  tags: string[];
  servingsCount: number;
  time: Time;
  metadata: Metadata;
  groupedIngredients: GroupedIngredients[];
  groupedInstructions: GroupedInstructions[];
  publishedAt: Date;
  updatedAt: Date;
  author: string;
};

export type RecipeSummary = Pick<
  Recipe,
  "id" | "title" | "description" | "tags" | "servingsCount" | "time" | "image"
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
