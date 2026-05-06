import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function SettingsPage() {
	return (
		<div className="flex">
			<Sidebar />

			<main className="flex w-full flex-col items-start">
				<Header pageName="Configurações" />
			</main>
		</div>
	);
}
