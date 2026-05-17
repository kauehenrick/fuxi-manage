import { useEffect } from "react";
import { useAuthorStore } from "@/stores/AuthorStore";
import { useAuthStore } from "@/stores/AuthStore";
import { useBookStore } from "@/stores/BookStore";
import { useGenreStore } from "@/stores/GenreStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function BooksDataTable() {
	const books = useBookStore((state) => state.books);
	const getBooks = useBookStore((state) => state.getBooks);
	const { user, loading } = useAuthStore();

	useEffect(() => {
		if (loading || !user) {
			return;
		}

		useAuthorStore.getState().getAuthors();
		useGenreStore.getState().getGenres();
		getBooks();
	}, [loading, user, getBooks]);

	return (
		<div className="container mt-4">
			<DataTable columns={columns} data={books} />
		</div>
	);
}
