import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { PiMagnifyingGlassLight, PiSlidersThin } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [globalFilter, setGlobalFilter] = React.useState("");
	const [rowSelection, setRowSelection] = React.useState({});
	const [showDisabled, setShowDisabled] = React.useState(false);

	const filteredData = React.useMemo(() => {
		if (showDisabled) {
			return data;
		}

		return data.filter((item: any) => item.deleted_at === null);
	}, [data, showDisabled]);

	const table = useReactTable({
		data: filteredData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setGlobalFilter,
		state: {
			sorting,
			columnFilters,
			globalFilter,
			rowSelection,
		},
		initialState: {
			pagination: {
				pageSize: 15,
			},
		},
	});

	return (
		<div className="rounded-md border bg-white-800">
			<section className="flex items-center justify-between px-6 py-2">
				<p className="font-medium">Lista de Livros</p>

				<div className="flex gap-4">
					<Input
						type="text"
						placeholder="Pesquisar livros..."
						startIcon={<PiMagnifyingGlassLight />}
						value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn("title")?.setFilterValue(event.target.value)
						}
						className="h-7.5 min-w-70"
					/>

					<Popover>
						<PopoverTrigger asChild>
							<button type="button" className="cursor-pointer">
								<PiSlidersThin />
							</button>
						</PopoverTrigger>
						<PopoverContent side="left" className="w-50">
							<div className="flex items-center space-x-2">
								<Switch
									id="disabled-itens"
									size="sm"
									checked={showDisabled}
									onCheckedChange={setShowDisabled}
								/>
								<Label htmlFor="disabled-itens">Mostrar desativados</Label>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</section>
			<ScrollArea className="h-87.5 2xl:h-112.5">
				<Table>
					<TableHeader className="bg-white-300">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns?.length}
									className="h-24 text-center"
								>
									Nenhum registo encontrado.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</ScrollArea>

			<footer className="flex items-center justify-end space-x-2 py-4 pe-5">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Anterior
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Próximo
				</Button>
			</footer>
		</div>
	);
}
