import { create } from "zustand";

export const useProductsStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  filter: "All",
  setFilter: (filter) => set({ filter }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  currentPage: 1,
  itemsPerPage: 6,
  setPage: (page) => set({ currentPage: page }),


  fetchProducts: async () => {
    if (get().products.length > 0) return;

    set({ loading: true, error: null });

    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      const withLike = data.map((p) => ({ ...p, isLiked: false }));
      set({ products: withLike, loading: false });
    } catch (e) {
      console.error("Products loading error", e);
      set({ error: "Products loading error", loading: false });
    }
  },
  toggleLike: (id) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, isLiked: !p.isLiked } : p
      ),
    }));
  },
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },
  addProduct: (product) => {
    set((state) => ({
      products: [...state.products, product],
    }));
  },
}));
