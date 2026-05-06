import type { ColumnDef } from "@tanstack/react-table";
import type { AuthorProps } from "@/stores/AuthorStore";
import DisableAuthor from "../DisableAuthor";
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
				Nome do Autor
			</button>
		),
	},
	{
		accessorKey: "actions",
		header: () => <p className="me-5 text-right">Ações</p>,
		cell: (cell) => (
			<div className="me-5 flex justify-end space-x-4">
				<UpdateAuthor {...cell.row.original} />
				<DisableAuthor author={cell.row.original} />
			</div>
		),
	},
];
