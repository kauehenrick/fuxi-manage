import AddAuthor from "@/components/AddAuthor";
import AuthorsDataTable from "@/components/AuthorsDataTable";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Button } from "@/components/ui/button";

export default function AuthorPage() {
	return (
		<div className="flex">
			<Sidebar />

			<div className="flex w-full flex-col items-start">
				<Header pageName="Autores" />

				<main className="w-full px-6">
					<div className="mt-4 space-x-2">
						<AddAuthor />
						<Button>Exportar</Button>
					</div>

					<AuthorsDataTable />
				</main>
			</div>
		</div>
	);
}
