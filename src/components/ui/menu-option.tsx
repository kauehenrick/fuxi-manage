import type { IconType } from "react-icons";
import { useNavigate } from "react-router";
import { useSidebarStore } from "@/stores/SidebarStore";

type MenuOptionProps = {
	title: string;
	url: string;
	icon: IconType;
	value: string;
	extraClassName?: string;
};

export default function MenuOption(props: MenuOptionProps) {
	const navigate = useNavigate();
	const { selectedOption, setSelectedOption } = useSidebarStore();

	const isSelected = selectedOption === props.title;

	const defineClassNames = () =>
		[
			"flex text-center space-x-2 px-4 py-2 text-sm cursor-pointer duration-500",
			"hover:ps-5 hover:text-green-primary",
			isSelected ? "ps-5 text-green-primary" : "",
			props.extraClassName,
			isSelected && props.extraClassName ? "ps-9" : "",
		].join(" ");

	return (
		<div
			className={defineClassNames()}
			onClick={() => {
				navigate(props.url);
				setSelectedOption(props.title);
			}}
			key={props.title}
		>
			<props.icon size="17px" />
			<p>{props.title}</p>
		</div>
	);
}
