import AddGenre from "@/components/AddGenre";
import GenresDataTable from "@/components/GenresDataTable";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Button } from "@/components/ui/button";

export default function GenrePage() {
	return (
		<div className="flex">
			<Sidebar />

			<div className="flex w-full flex-col items-start">
				<Header pageName="Gêneros" />

				<main className="w-full px-6">
					<div className="mt-4 space-x-2">
						<AddGenre />
						<Button>Exportar</Button>
					</div>

					<GenresDataTable />
				</main>
			</div>
		</div>
	);
}
