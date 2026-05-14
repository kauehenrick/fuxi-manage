import type { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { create } from "zustand";
import { api } from "../services/api";

export const authorFormSchema = z.object({
	id: z.number().optional(),
	deleted_at: z.date().optional(),
	name: z.string().min(2, { message: "O nome do autor deve ser informado." }),
});

export type AuthorProps = z.infer<typeof authorFormSchema>;

type AuthorStoreProps = {
	authors: AuthorProps[];
	error: null | string | unknown;
	getAuthors: () => Promise<void>;
	addAuthor: (author: Omit<AuthorProps, "id" | "deleted_at">) => Promise<void>;
	disableAuthor: (author: AuthorProps) => Promise<void>;
	updateAuthor: (author: AuthorProps) => Promise<void>;
	enableAuthor: (author: AuthorProps) => Promise<void>;
};

export const useAuthorStore = create<AuthorStoreProps>((set) => ({
	authors: [],
	error: null,

	getAuthors: async () => {
		try {
			set({ error: null });

			const { data } = await api.get("/authors");

			const authors = data?.data ?? data ?? [];

			set({ authors });
		} catch (err) {
			console.error(err);
			toast.error("Erro inesperado ao buscar autores.");
			set({ error: err });
		}
	},

	addAuthor: async (author) => {
		try {
			const { data } = await api.post("/authors", author);

			set((state) => ({
				authors: [...state.authors, data],
			}));

			toast.success("Autor adicionado com sucesso.");
		} catch (err) {
			const error = err as AxiosError<{
				message?: string;
				errors?: Record<string, string[]>;
			}>;

			const message =
				error?.response?.data?.message || "Erro inesperado ao adicionar autor.";

			toast.error(message);

			set({ error: err });
			throw err;
		}
	},

	disableAuthor: async (author) => {
		try {
			const { data } = await api.delete(`/authors/${author.id}`);

			set((state) => ({
				authors: state.authors.map((a) =>
					a.id === author.id
						? {
								...a,
								deleted_at: data.author.deleted_at,
							}
						: a,
				),
			}));

			toast.success("Autor desativado com sucesso.");
		} catch (err) {
			console.error(err);
			toast.error("Erro inesperado ao desativar autor.");
			set({ error: err });
		}
	},

	updateAuthor: async (author) => {
		try {
			const { data } = await api.patch(`/authors/${author.id}`, author);

			set((state) => ({
				authors: state.authors.map((a) => (a.id === author.id ? data : a)),
			}));

			toast.success("Autor atualizado com sucesso.");
		} catch (err) {
			const error = err as AxiosError<{
				message?: string;
				errors?: Record<string, string[]>;
			}>;

			const message =
				error?.response?.data?.message || "Erro inesperado ao atualizar autor.";

			toast.error(message);

			set({ error: err });
			throw err;
		}
	},

	enableAuthor: async (author) => {
		try {
			const { data } = await api.patch(`/authors/${author.id}/restore`);

			set((state) => ({
				authors: state.authors.map((a) =>
					a.id === author.id ? data.author : a,
				),
			}));

			toast.success("Autor habilitado com sucesso.");
		} catch (err) {
			toast.error("Erro ao habilitar o autor.");
			set({ error: err });
			throw err;
		}
	},
}));
