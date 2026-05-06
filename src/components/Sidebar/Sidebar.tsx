import {
	PiBook,
	PiCirclesThreePlusLight,
	PiFlyingSaucerLight,
	PiGearLight,
	PiHouseLight,
	PiPenNibLight,
	PiUserCircleFill,
} from "react-icons/pi";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useSidebarStore } from "@/stores/SidebarStore";
import logoAcarosImg from "../../assets/logo.webp";
import MenuOption from "../ui/menu-option";

export default function Sidebar() {
	const { selectedOption } = useSidebarStore();

	const registerOptions = [
		{
			title: "Livros",
			url: "/books",
			icon: PiBook,
			value: "products",
		},
		{
			title: "Autores",
			url: "/authors",
			icon: PiPenNibLight,
			value: "authors",
		},
		{
			title: "Gêneros",
			url: "/genres",
			icon: PiFlyingSaucerLight,
			value: "genres",
		},
		/*{ title: "Pessoas", url: "/people", icon: PiUserLight, value: "people" },*/
	];

	const isRegisterSelected = registerOptions.some(
		(option) => option.title === selectedOption,
	);

	return (
		<aside className="flex h-dvh w-64 flex-col justify-between border-e">
			<div className="flex flex-col gap-7">
				<img
					className="mt-5 w-4/6 self-center brightness-0"
					src={logoAcarosImg}
					alt="Logo da Acaros"
				/>

				<section>
					<MenuOption
						title="Tela inicial"
						url="/"
						icon={PiHouseLight}
						value="home"
					/>

					<Accordion
						type="single"
						collapsible
						defaultValue={isRegisterSelected ? "item-1" : ""}
					>
						<AccordionItem value="item-1">
							<AccordionTrigger className="rounded-none px-4 py-2 pb-1 duration-500 hover:ps-5 hover:text-green-700">
								<div className="flex items-center space-x-2">
									<PiCirclesThreePlusLight size={"17px"} />
									<p>Cadastros</p>
								</div>
							</AccordionTrigger>
							{registerOptions.map((option) => (
								<AccordionContent className="p-0" key={option.value}>
									<MenuOption
										title={option.title}
										url={option.url}
										icon={option.icon}
										value={option.value}
										extraClassName="ps-8 hover:ps-9"
									/>
								</AccordionContent>
							))}
						</AccordionItem>
					</Accordion>

					<MenuOption
						title="Configurações"
						url="/settings"
						icon={PiGearLight}
						value="settings"
					/>
				</section>
			</div>

			<footer className="ms-4 mb-4 flex items-center gap-3 text-xs">
				<PiUserCircleFill className="cursor-pointer" size={"2.5rem"} />
				<div>
					<p>Usuário</p>
					<p>versão: 0.0.1</p>
				</div>
			</footer>
		</aside>
	);
}
