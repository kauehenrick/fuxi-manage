import { useEffect } from "react";
import { useAuthorStore } from "@/stores/AuthorStore";
import { useAuthStore } from "@/stores/AuthStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function AuthorsDataTable() {
	const authors = useAuthorStore((state) => state.authors);
	const getAuthors = useAuthorStore((state) => state.getAuthors);
	const { user, loading } = useAuthStore();

	useEffect(() => {
		if (loading || !user) {
			return;
		}

		getAuthors();
	}, [loading, user, getAuthors]);

	return (
		<div className="container mt-4">
			<DataTable columns={columns} data={authors} />
		</div>
	);
}
