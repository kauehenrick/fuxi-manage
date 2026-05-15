import { PiFilePdf, PiMicrosoftExcelLogo } from "react-icons/pi";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../../components/ui/button";

export default function ExportButton() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button>Exportar</Button>
			</PopoverTrigger>
			<PopoverContent side="right" className="w-50 p-0">
				<button
					type="button"
					className="flex w-full cursor-pointer items-center space-x-2 rounded-t-lg p-2 transition duration-300 hover:bg-white-300"
				>
					<PiMicrosoftExcelLogo />
					<p className="text-sm">Exportar para Excel</p>
				</button>

				<button
					type="button"
					className="flex w-full cursor-pointer items-center space-x-2 rounded-b-lg p-2 transition duration-300 hover:bg-white-300"
				>
					<PiFilePdf />
					<p className="text-sm">Exportar para PDF</p>
				</button>
			</PopoverContent>
		</Popover>
	);
}
