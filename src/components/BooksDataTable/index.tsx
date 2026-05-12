import { useEffect } from "react";
import { useBookStore } from "@/stores/BookStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function BooksDataTable() {
	const books = useBookStore((state) => state.books);
	const getBooks = useBookStore((state) => state.getBooks);
	const activeBooks = books.filter((book) => !book.deleted_at);

	useEffect(() => {
		getBooks();
	}, [getBooks]);

	return (
		<div className="container mt-4">
			<DataTable columns={columns} data={activeBooks} />
		</div>
	);
}
