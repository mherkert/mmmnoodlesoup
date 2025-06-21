import { create } from 'zustand';

interface PageStore {
  currentPage: 'recipes' | 'recipe' | 'create' | null;
  setCurrentPage: (page: PageStore['currentPage']) => void;
}

export const usePageStore = create<PageStore>((set) => ({
  currentPage: null,
  setCurrentPage: (page) => set({ currentPage: page }),
}));