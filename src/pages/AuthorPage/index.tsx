import AddAuthor from "@/components/AddAuthor";
import AuthorsDataTable from "@/components/AuthorsDataTable";
import ExportButton from "@/components/ExportButton";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function AuthorPage() {
	return (
		<div className="flex">
			<Sidebar />

			<div className="flex w-full flex-col items-start">
				<Header pageName="Autores" />

				<main className="w-full px-6">
					<div className="mt-4 space-x-2">
						<AddAuthor />
						<ExportButton />
					</div>

					<AuthorsDataTable />
				</main>
			</div>
		</div>
	);
}
