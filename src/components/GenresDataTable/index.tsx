import { useEffect } from "react";
import { useGenreStore } from "@/stores/GenreStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function GenresDataTable() {
	const genres = useGenreStore((state) => state.genres);
	const getGenres = useGenreStore((state) => state.getGenres);

	useEffect(() => {
		getGenres();
	}, [getGenres]);

	return (
		<div className="container mt-4">
			<DataTable columns={columns} data={genres} />
		</div>
	);
}
