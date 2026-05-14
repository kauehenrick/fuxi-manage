import type { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { create } from "zustand";
import { api } from "../services/api";

export const genreFormSchema = z.object({
	id: z.number().optional(),
	deleted_at: z.date().optional(),
	name: z.string().min(2, { message: "O nome do gênero deve ser informado." }),
});

export type GenreProps = z.infer<typeof genreFormSchema>;

type GenreStoreProps = {
	genres: GenreProps[];
	error: null | string | unknown;
	getGenres: () => Promise<void>;
	addGenre: (genre: Omit<GenreProps, "id" | "isActive">) => Promise<void>;
	disableGenre: (genre: GenreProps) => Promise<void>;
	updateGenre: (genre: GenreProps) => Promise<void>;
	enableGenre: (genre: GenreProps) => Promise<void>;
};

export const useGenreStore = create<GenreStoreProps>((set) => ({
	genres: [],
	error: null,

	getGenres: async () => {
		try {
			set({ error: null });

			const { data } = await api.get("/genres");

			const genres = data?.data ?? data ?? [];

			set({ genres });
		} catch (err) {
			console.error(err);
			toast.error("Erro inesperado ao buscar gêneros.");
			set({ error: err });
		}
	},

	addGenre: async (genre) => {
		try {
			const { data } = await api.post("/genres", genre);

			set((state) => ({
				genres: [...state.genres, data],
			}));

			toast.success("Gênero adicionado com sucesso!");
		} catch (err) {
			const error = err as AxiosError<{
				message?: string;
				errors?: Record<string, string[]>;
			}>;

			const message =
				error?.response?.data?.message ||
				"Erro inesperado ao adicionar gênero.";

			toast.error(message);

			set({ error: err });
			throw err;
		}
	},

	disableGenre: async (genre) => {
		try {
			const { data } = await api.delete(`/genres/${genre.id}`);

			set((state) => ({
				genres: state.genres.map((g) =>
					g.id === genre.id
						? {
								...g,
								deleted_at: data.genre.deleted_at,
							}
						: g,
				),
			}));

			toast.success("Gênero desativado com sucesso!");
		} catch (err) {
			console.error(err);
			toast.error("Erro inesperado ao desativar gênero!");
			set({ error: err });
		}
	},

	updateGenre: async (genre) => {
		try {
			const { data } = await api.patch(`/genres/${genre.id}`, genre);

			set((state) => ({
				genres: state.genres.map((g) => (g.id === genre.id ? data : g)),
			}));

			toast.success("Gênero atualizado com sucesso!");
		} catch (err) {
			const error = err as AxiosError<{
				message?: string;
				errors?: Record<string, string[]>;
			}>;

			const message =
				error?.response?.data?.message ||
				"Erro inesperado ao atualizar gênero.";

			toast.error(message);

			set({ error: err });
			throw err;
		}
	},

	enableGenre: async (genre) => {
		try {
			const { data } = await api.patch(`/genres/${genre.id}/restore`);

			set((state) => ({
				genres: state.genres.map((g) => (g.id === genre.id ? data.genre : g)),
			}));

			toast.success("Autor habilitado com sucesso.");
		} catch (err) {
			toast.error("Erro ao habilitar o autor.");
			set({ error: err });
			throw err;
		}
	},
}));
