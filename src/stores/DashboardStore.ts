import type { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { api } from "../services/api";

export type BooksByGenreProps = {
  name: string;
  value: number;
};

export type TopAuthorProps = {
  name: string;
  books: number;
};

type DashboardStoreProps = {
  booksByGenre: BooksByGenreProps[];
  topAuthors: TopAuthorProps[];
  error: null | string | unknown;
  hasLoaded: boolean;
  getDashboard: () => Promise<void>;
};

export const useDashboardStore = create<DashboardStoreProps>((set, get) => ({
  booksByGenre: [],
  topAuthors: [],
  error: null,
  hasLoaded: false,

  getDashboard: async () => {
    if (get().hasLoaded) return;

    try {
      set({ error: null });

      const { data } = await api.get("/dashboard");

      set({
        booksByGenre: data.booksByGenre ?? [],
        topAuthors: data.topAuthors ?? [],
        hasLoaded: true,
      });
    } catch (err) {
      const error = err as AxiosError<{
        message?: string;
      }>;

      const message =
        error?.response?.data?.message ||
        "Erro inesperado ao buscar dados do dashboard.";

      console.error(err);
      toast.error(message);

      set({ error: err });
    }
  },
}));
