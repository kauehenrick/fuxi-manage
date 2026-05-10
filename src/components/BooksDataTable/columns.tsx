import type { ColumnDef } from "@tanstack/react-table";
import { useAuthorStore } from "@/stores/AuthorStore";
import type { BookProps } from "@/stores/BookStore";
import { useGenreStore } from "@/stores/GenreStore";
import { includesString } from "../../lib/utils";
import DisableBook from "../DisableBook";
import UpdateBook from "../UpdateBook";

export const columns: ColumnDef<BookProps>[] = [
	{
		id: "index",
		sortingFn: (rowA, rowB) => rowA.index - rowB.index,
		header: ({ column }) => (
			<button
				type="button"
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				#
			</button>
		),
		cell: ({ row }) => <span>{row.index + 1}</span>,
	},
	{
		accessorKey: "title",
		header: ({ column }) => (
			<button
				type="button"
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Título
			</button>
		),
		filterFn: includesString,
	},
	{
		accessorKey: "author",
		header: ({ column }) => (
			<button
				type="button"
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Autor
			</button>
		),
		cell: ({ row }) => {
			const authorId = row.original.author_id;
			const authors = useAuthorStore.getState().authors;

			const author = authors.find((a) => a.id === authorId);

			return <span>{author?.name ?? ""}</span>;
		},
	},
	{
		accessorKey: "genre",
		header: ({ column }) => (
			<button
				type="button"
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Gênero
			</button>
		),
		cell: ({ row }) => {
			const genreId = row.original.genre_id;
			const genres = useGenreStore.getState().genres;

			const genre = genres.find((g) => g.id === genreId);

			return <span>{genre?.name ?? ""}</span>;
		},
	},
	{
		accessorKey: "published_year",
		header: ({ column }) => (
			<button
				type="button"
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Ano
			</button>
		),
	},
	{
		accessorKey: "localization",
		header: ({ column }) => (
			<button
				type="button"
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Localização
			</button>
		),
	},
	{
		accessorKey: "isbn",
		header: ({ column }) => (
			<button
				type="button"
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				ISBN
			</button>
		),
	},
	{
		accessorKey: "actions",
		header: () => <p className="me-5 text-right">Ações</p>,
		cell: (cell) => (
			<div className="me-5 flex justify-end space-x-4">
				<UpdateBook {...cell.row.original} />
				<DisableBook book={cell.row.original} />
			</div>
		),
	},
];
