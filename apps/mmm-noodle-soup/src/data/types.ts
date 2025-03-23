export type Ingredient = {
  amount: number;
  unit?: string;
  name: string;
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
  preparation: number;
  cooking: number;
};

export type Metadata = {
  measurementSystem: "METRIC" | "IMPERIAL";
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  servingsCount: number;
  time: Time;
  metadata: Metadata;
  groupedIngredients: GroupedIngredients[];
  groupedInstructions: GroupedInstructions[];
};

export type RecipeSummary = Pick<
  Recipe,
  "id" | "title" | "description" | "tags" | "servingsCount" | "time" | "url"
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
