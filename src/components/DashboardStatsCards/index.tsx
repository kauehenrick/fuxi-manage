import { PiBookOpenLight, PiPenNibLight, PiTagLight } from "react-icons/pi";
import { useAuthorStore } from "@/stores/AuthorStore";
import { useBookStore } from "@/stores/BookStore";
import { useGenreStore } from "@/stores/GenreStore";

export default function DashboardStatsCards() {
	const authors = useAuthorStore((state) => state.authors);
	const books = useBookStore((state) => state.books);
	const genres = useGenreStore((state) => state.genres);

	const statsCards = [
		{
			label: "Total de Livros",
			value: books.length,
			icon: PiBookOpenLight,
			trend: "+12%",
			color: "#3f5e56",
		},
		{
			label: "Total de Autores",
			value: authors.length,
			icon: PiPenNibLight,
			trend: "+8%",
			color: "#5d7a72",
		},
		{
			label: "Total de Gêneros",
			value: genres.length,
			icon: PiTagLight,
			trend: "+2%",
			color: "#6b3e1e",
		},
		// {
		// 	label: "Total de Usuários",
		// 	value: "89",
		// 	icon: PiUserCircleLight,
		// 	trend: "+15%",
		// 	color: "#9ca3af",
		// },
		// {
		// 	label: "Cadastros Este Mês",
		// 	value: "127",
		// 	icon: PiTrendUpLight,
		// 	trend: "+24%",
		// 	color: "#3f5e56",
		// },
		// {
		// 	label: "Livros Emprestados",
		// 	value: "234",
		// 	icon: PiBookBookmarkLight,
		// 	trend: "-5%",
		// 	color: "#5d7a72",
		// },
		// {
		// 	label: "Livros Disponíveis",
		// 	value: "1,013",
		// 	icon: PiBooksLight,
		// 	trend: "+7%",
		// 	color: "#6b3e1e",
		// },
	];

	return (
		<div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{statsCards.map((card, index) => {
				const Icon = card.icon;
				return (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: index is stable here
						key={index}
						className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
					>
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<p className="text-muted-foreground text-sm">{card.label}</p>
								<p className="mt-2 font-semibold text-3xl text-foreground">
									{card.value}
								</p>
								{/* <div className="mt-2 flex items-center gap-1">
									<span
										className={`font-medium text-sm ${
											card.trend.startsWith("+")
												? "text-green-600"
												: "text-red-600"
										}`}
									>
										{card.trend}
									</span>
									<span className="text-muted-foreground text-xs">
										vs mês anterior
									</span>
								</div> */}
							</div>
							<div
								className="flex h-12 w-12 items-center justify-center rounded-lg"
								style={{ backgroundColor: `${card.color}20` }}
							>
								<Icon className="h-6 w-6" style={{ color: card.color }} />
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
