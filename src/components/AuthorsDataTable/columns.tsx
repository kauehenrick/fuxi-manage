import type { ColumnDef } from "@tanstack/react-table";
import type { AuthorProps } from "@/stores/AuthorStore";
import { includesString } from "../../lib/utils";
import DisableAuthor from "../DisableAuthor";
import EnableAuthor from "../EnableAuthor";
import UpdateAuthor from "../UpdateAuthor";

export const columns: ColumnDef<AuthorProps>[] = [
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
				Nome do Autor
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
					<UpdateAuthor {...cell.row.original} />
					<DisableAuthor author={cell.row.original} />
				</div>
			) : (
				<div className="me-5 flex justify-end space-x-4">
					<EnableAuthor author={cell.row.original} />
				</div>
			),
	},
];
