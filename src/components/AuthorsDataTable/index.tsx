import { useEffect } from "react";
import { useAuthorStore } from "@/stores/AuthorStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function AuthorsDataTable() {
	const authors = useAuthorStore((state) => state.authors);
	const getAuthors = useAuthorStore((state) => state.getAuthors);

	useEffect(() => {
		getAuthors();
	}, [getAuthors]);

	return (
		<div className="container mt-4">
			<DataTable columns={columns} data={authors} />
		</div>
	);
}
