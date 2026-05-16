import AddBook from "@/components/AddBook";
import BooksDataTable from "@/components/BooksDataTable";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function BookPage() {
	return (
		<div className="flex">
			<Sidebar />

			<div className="flex w-full flex-col items-start">
				<Header pageName="Livros" />

				<main className="w-full px-6">
					<div className="mt-4 space-x-2">
						<AddBook />
					</div>

					<BooksDataTable />
				</main>
			</div>
		</div>
	);
}
