import type { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { create } from "zustand";
import { api } from "../services/api";

export const bookFormSchema = z.object({
	id: z.number().optional(),
	deleted_at: z.date().optional(),
	title: z.string().min(1, { message: "O título deve ser informado." }),
	author_id: z.number().min(1, { message: "O autor deve ser informado." }),
	genre_id: z.number().min(1, { message: "O gênero deve ser informado." }),
	published_year: z
		.string()
		.nullable()
		.refine(
			(value) => {
				if (!value) return true;

				const year = Number(value);
				const currentYear = new Date().getFullYear();

				return year <= currentYear;
			},
			{
				message: "O ano de publicação não pode ser maior que o ano atual.",
			},
		)
		.refine(
			(value) => {
				if (!value) return true;

				return /^\d{4}$/.test(value);
			},
			{
				message: "Insira um ano de publicação válido.",
			},
		),
	localization: z.string().nullable(),
	isbn: z.string().max(13, { message: "ISBN inválido." }).nullable(),
});

export const bookUpdateFormSchema = bookFormSchema.extend({
	id: z.number({ message: "ID do livro é obrigatório." }),
});

export type BookProps = z.infer<typeof bookFormSchema>;

type BookStoreProps = {
	books: BookProps[];
	error: null | string | unknown;
	getBooks: () => Promise<void>;
	addBook: (book: Omit<BookProps, "id" | "deleted_at">) => Promise<void>;
	disableBook: (book: BookProps) => Promise<void>;
	updateBook: (book: Partial<BookProps> & { id: number }) => Promise<void>;
	enableBook: (book: BookProps) => Promise<void>;
};

export const useBookStore = create<BookStoreProps>((set) => ({
	books: [],
	error: null,

	getBooks: async () => {
		try {
			set({ error: null });

			const { data } = await api.get("/books");

			const books = data?.data ?? data ?? [];

			set({ books });
		} catch (err) {
			toast.error("Erro inesperado ao buscar livros.");
			set({ error: err });
		}
	},

	addBook: async (book) => {
		try {
			const { data } = await api.post("/books", book);

			set((state) => ({
				books: [...state.books, data],
			}));

			toast.success("Livro cadastrado com sucesso.");
		} catch (err) {
			const error = err as AxiosError<{
				message?: string;
				errors?: Record<string, string[]>;
			}>;

			const message =
				error?.response?.data?.message ||
				"Erro inesperado ao cadastrar o livro.";

			toast.error(message);

			set({ error: err });
			throw err;
		}
	},

	disableBook: async (book) => {
		try {
			const { data } = await api.delete(`/books/${book.id}`);

			set((state) => ({
				books: state.books.map((b) =>
					b.id === book.id
						? {
								...b,
								deleted_at: data.book.deleted_at,
							}
						: b,
				),
			}));

			toast.success("Livro desativado com sucesso.");
		} catch (err) {
			toast.error("Erro ao desativar o livro.");
			set({ error: err });
			throw err;
		}
	},

	updateBook: async (book) => {
		try {
			const { data } = await api.patch(`/books/${book.id}`, book);

			set((state) => ({
				books: state.books.map((b) => (b.id === book.id ? data : b)),
			}));

			toast.success("Livro atualizado com sucesso.");
		} catch (err) {
			const error = err as AxiosError<{
				message?: string;
				errors?: Record<string, string[]>;
			}>;

			const message =
				error?.response?.data?.message ||
				"Erro inesperado ao atualizar o livro.";

			toast.error(message);

			set({ error: err });
			throw err;
		}
	},

	enableBook: async (book) => {
		try {
			const { data } = await api.patch(`/books/${book.id}/restore`);

			set((state) => ({
				books: state.books.map((b) => (b.id === book.id ? data.book : b)),
			}));

			toast.success("Livro habilitado com sucesso.");
		} catch (err) {
			toast.error("Erro ao habilitar o livro.");
			set({ error: err });
			throw err;
		}
	},
}));
