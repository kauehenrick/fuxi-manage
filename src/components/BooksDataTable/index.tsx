import { useEffect } from "react";
import { useBookStore } from "@/stores/BookStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function BooksDataTable() {
	const books = useBookStore((state) => state.books);
	const getBooks = useBookStore((state) => state.getBooks);

	useEffect(() => {
		getBooks();
	}, [getBooks]);

	return (
		<div className="container mt-4">
			<DataTable columns={columns} data={books} />
		</div>
	);
}