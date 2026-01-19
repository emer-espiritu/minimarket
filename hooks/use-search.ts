import { create } from "zustand";

interface SearchState {
  query: string;
  setQuery: (value: string) => void;
  clear: () => void;
}

export const useSearch = create<SearchState>((set) => ({
  query: "",
  setQuery: (value) => set({ query: value }),
  clear: () => set({ query: "" }),
}));
