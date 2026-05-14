import type { ColumnDef } from "@tanstack/react-table";
import type { GenreProps } from "@/stores/GenreStore";
import { includesString } from "../../lib/utils";
import DisableGenre from "../DisableGenre";
import EnableGenre from "../EnableGenre";
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
		cell: ({ row }) => (
			<span
				className={row.original.deleted_at ? "text-red-800 opacity-80" : ""}
			>
				{row.original.id}
			</span>
		),
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
		cell: ({ row }) => (
			<span
				className={row.original.deleted_at ? "text-red-800 opacity-80" : ""}
			>
				{row.original.name}
			</span>
		),
		filterFn: includesString,
	},
	{
		accessorKey: "actions",
		header: () => <p className="me-5 text-right">Ações</p>,
		cell: (cell) =>
			!cell.row.original.deleted_at ? (
				<div className="me-5 flex justify-end space-x-4">
					<UpdateGenre {...cell.row.original} />
					<DisableGenre genre={cell.row.original} />
				</div>
			) : (
				<div className="me-5 flex justify-end space-x-4">
					<EnableGenre genre={cell.row.original} />
				</div>
			),
	},
];
