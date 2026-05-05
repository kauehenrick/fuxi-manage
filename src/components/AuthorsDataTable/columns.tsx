import type { ColumnDef } from "@tanstack/react-table";
import type { AuthorProps } from "@/stores/AuthorStore";
import DisableAuthor from "../DisableAuthor";
import UpdateAuthor from "../UpdateAuthor";

export const columns: ColumnDef<AuthorProps>[] = [
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
		accessorKey: "name",
		header: ({ column }) => (
			<p
				className="cursor-pointer"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Nome do Autor
			</p>
		),
	},
	{
		accessorKey: "actions",
		header: "Ações",
		cell: (cell) => (
			<div className="flex space-x-4">
				<UpdateAuthor {...cell.row.original} />
				<DisableAuthor author={cell.row.original} />
			</div>
		),
	},
];
