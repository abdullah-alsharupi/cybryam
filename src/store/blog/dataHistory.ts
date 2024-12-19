import { Blog } from "@/app/types/types";
import { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

export type blogDataState = {
  globalBlogs: Blog[];
  setGlobalBlog: (blog: Blog[]) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  filteredBlog: Blog[];
  filterBlog: () => void;
};

const initialValues: Pick<
  blogDataState,
  "globalBlogs" | "filteredBlog" | "searchQuery"
> = {
  filteredBlog: [],
  globalBlogs: [],
  searchQuery: "",
};

export const createBlogDataSlice: StateCreator<blogDataState> = (set, get) => ({
  ...initialValues,
  setGlobalBlog: (globalBlogs) => {
    set({ globalBlogs });
    get().filterBlog();
  },
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  filterBlog: () => {
    const { searchQuery, globalBlogs } = get();
    if (!searchQuery) {
      return set({ filteredBlog: globalBlogs });
    }
    // Add filtering logic based on searchQuery if needed
  },
});

// Wrapping the createBlogDataSlice with persist
export const createPersistentBlogDataSlice = persist(createBlogDataSlice, {
  name: "blog-storage"
});