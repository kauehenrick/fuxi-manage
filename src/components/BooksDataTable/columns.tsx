import type { ColumnDef } from "@tanstack/react-table";
import { useAuthorStore } from "@/stores/AuthorStore";
import type { BookProps } from "@/stores/BookStore";
import { useGenreStore } from "@/stores/GenreStore";
import { includesString } from "../../lib/utils";
import DisableBook from "../DisableBook";
import EnableBook from "../EnableBook";
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
		cell: ({ row }) => (
			<span
				className={row.original.deleted_at ? "text-red-800 opacity-80" : ""}
			>
				{row.original.id}
			</span>
		),
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
		cell: ({ row }) => (
			<span
				className={row.original.deleted_at ? "text-red-800 opacity-80" : ""}
			>
				{row.original.title}
			</span>
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

			return (
				<span
					className={row.original.deleted_at ? "text-red-800 opacity-80" : ""}
				>
					{author?.name ?? ""}
				</span>
			);
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

			return (
				<span
					className={row.original.deleted_at ? "text-red-800 opacity-80" : ""}
				>
					{genre?.name ?? ""}
				</span>
			);
		},
	},
	{
		accessorKey: "amount",
		header: ({ column }) => (
			<button
				type="button"
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Quantidade
			</button>
		),
		cell: ({ row }) => (
			<span
				className={row.original.deleted_at ? "text-red-800 opacity-80" : ""}
			>
				{row.original.amount}
			</span>
		),
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
		cell: ({ row }) => (
			<span
				className={row.original.deleted_at ? "text-red-800 opacity-80" : ""}
			>
				{row.original.published_year}
			</span>
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
		cell: ({ row }) => (
			<span
				className={row.original.deleted_at ? "text-red-800 opacity-80" : ""}
			>
				{row.original.isbn}
			</span>
		),
	},
	{
		accessorKey: "actions",
		header: () => <p className="me-5 text-right">Ações</p>,
		cell: (cell) =>
			!cell.row.original.deleted_at ? (
				<div className="me-5 flex justify-end space-x-4">
					<UpdateBook {...cell.row.original} />
					<DisableBook book={cell.row.original} />
				</div>
			) : (
				<div className="me-5 flex justify-end space-x-4">
					<EnableBook book={cell.row.original} />
				</div>
			),
	},
];
