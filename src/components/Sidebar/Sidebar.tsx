import {
	PiBook,
	PiCirclesThreePlusLight,
	PiFlyingSaucerLight,
	PiPenNibLight,
	PiSignOut,
	PiUserCircleFill,
} from "react-icons/pi";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useAuthStore } from "@/stores/AuthStore";
import { useSidebarStore } from "@/stores/SidebarStore";
import logoFuXiImg from "../../assets/fuxi-logo.svg";
import MenuOption from "../ui/menu-option";

export default function Sidebar() {
	const { selectedOption } = useSidebarStore();
	const { user, logout } = useAuthStore();

	const registerOptions = [
		{
			title: "Livros",
			url: "/",
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
	];

	const isRegisterSelected = registerOptions.some(
		(option) => option.title === selectedOption,
	);

	return (
		<aside className="flex h-dvh w-64 flex-col justify-between border-e">
			<div className="flex flex-col gap-7">
				<img
					className="mt-5 w-4/8 self-center"
					src={logoFuXiImg}
					alt="Logo do FuXi"
				/>

				<section>
					{/* <MenuOption
						title="Tela inicial"
						url="/"
						icon={PiHouseLight}
						value="home"
					/> */}

					<Accordion
						type="single"
						collapsible
						defaultValue={isRegisterSelected ? "item-1" : ""}
					>
						<AccordionItem value="item-1">
							<AccordionTrigger className="rounded-none px-4 py-2 pb-1 duration-500 hover:ps-5 hover:text-green-primary">
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

					{/* <MenuOption
						title="Configurações"
						url="/settings"
						icon={PiGearLight}
						value="settings"
					/> */}
				</section>
			</div>

			<footer className="ms-4 mb-4 flex items-center gap-3 text-xs">
				<Popover>
					<PopoverTrigger asChild>
						<PiUserCircleFill className="cursor-pointer" size={"2.5rem"} />
					</PopoverTrigger>
					<PopoverContent className="ms-2 w-30 p-0">
						<button
							type="button"
							className="flex w-full cursor-pointer items-center space-x-2 p-2 transition duration-300 hover:bg-white-300"
							onClick={logout}
						>
							<PiSignOut />
							<p className="text-sm">Sair</p>
						</button>
					</PopoverContent>
				</Popover>
				<div>
					<p>{user?.name ?? "Usuário"}</p>
					<p className="font-light">versão: {__APP_VERSION__}</p>
				</div>
			</footer>
		</aside>
	);
}
