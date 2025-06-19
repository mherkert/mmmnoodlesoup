import Fuse, { FuseResult } from "fuse.js";
import { useMemo } from "react";

export const useFuzzySearch = <T>(
  data: T[],
  keys: string[],
  searchQuery: string | null,
) => {
  const fuse = useMemo(
    () =>
      new Fuse<T>(data, {
        keys: keys,
        threshold: 0.3,
        includeScore: true,
      }),
    [data]
  );

  const filteredRecipes = useMemo(() => {
    if (!searchQuery) return data;
    return fuse.search(searchQuery).map((result: FuseResult<T>) => result.item);
  }, [searchQuery, fuse]);

  return filteredRecipes;
};