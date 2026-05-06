import type { ColumnDef } from "@tanstack/react-table";
import type { GenreProps } from "@/stores/GenreStore";
import DisableGenre from "../DisableGenre";
import UpdateGenre from "../UpdateGenre";

export const columns: ColumnDef<GenreProps>[] = [
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
		accessorKey: "name",
		header: ({ column }) => (
			<button
				type="button"
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Gênero
			</button>
		),
	},
	{
		accessorKey: "actions",
		header: () => <p className="me-5 text-right">Ações</p>,
		cell: (cell) => (
			<div className="me-5 flex justify-end space-x-4">
				<UpdateGenre {...cell.row.original} />
				<DisableGenre genre={cell.row.original} />
			</div>
		),
	},
];
