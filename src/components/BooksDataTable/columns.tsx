import type { ColumnDef } from "@tanstack/react-table";
import { useAuthorStore } from "@/stores/AuthorStore";
import type { BookProps } from "@/stores/BookStore";
import { useGenreStore } from "@/stores/GenreStore";
import DisableBook from "../DisableBook";
import UpdateBook from "../UpdateBook";

export const columns: ColumnDef<BookProps>[] = [
	{
		id: "index",
		sortingFn: (rowA, rowB) => rowA.index - rowB.index,
		header: ({ column }) => (
			<p
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				#
			</p>
		),
		cell: ({ row }) => <span>{row.index + 1}</span>,
	},
	{
		accessorKey: "title",
		header: ({ column }) => (
			<p
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Título
			</p>
		),
	},
	{
		accessorKey: "author",
		header: ({ column }) => (
			<p
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Autor
			</p>
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
			<p
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Gênero
			</p>
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
			<p
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Ano
			</p>
		),
	},
	{
		accessorKey: "location",
		header: ({ column }) => (
			<p
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Localização
			</p>
		),
	},
	{
		accessorKey: "isbn",
		header: ({ column }) => (
			<p
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				ISBN
			</p>
		),
	},
	{
		accessorKey: "actions",
		header: "Ações",
		cell: (cell) => (
			<div className="flex space-x-4">
				<UpdateBook {...cell.row.original} />
				<DisableBook book={cell.row.original} />
			</div>
		),
	},
];
