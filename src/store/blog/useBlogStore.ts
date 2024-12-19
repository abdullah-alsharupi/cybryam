import { create } from "zustand";
import { blogDataState, createPersistentBlogDataSlice } from "./dataHistory";

export const useBlogStore = create<blogDataState>((set, get, store) => ({
  ...createPersistentBlogDataSlice(set, get, store),
  ...createPersistentBlogDataSlice(set, get, store),
}));
