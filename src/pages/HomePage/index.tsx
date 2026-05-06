import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function HomePage() {
	return (
		<div className="flex">
			<Sidebar />

			<div className="flex w-full flex-col items-start">
				<Header pageName="Tela inicial" />

				<main className="mt-4 w-full px-6">
					<h1>Olá usuário, seja bem-vindo!</h1>
				</main>
			</div>
		</div>
	);
}
