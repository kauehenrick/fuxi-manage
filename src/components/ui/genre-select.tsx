import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGenreStore } from "@/stores/GenreStore";

type GenreSelectProps = {
	value?: number;
	onChange: (value: number) => void;
};

export default function GenreSelect({ value, onChange }: GenreSelectProps) {
	const { genres } = useGenreStore();
	const [open, setOpen] = useState(false);

	const items = genres.filter((e) => !e.deleted_at);

	const selectedGenre = items.find((g) => g.id === value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					className="w-50 justify-between"
				>
					{selectedGenre?.name ?? "Selecione o gênero..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="max-w-62.5 p-0">
				<Command>
					<CommandInput placeholder="Buscar gênero..." />
					<CommandEmpty>Nenhum gênero encontrado.</CommandEmpty>

					<CommandGroup>
						<CommandList>
							{items.map((genre) => (
								<CommandItem
									key={genre.id}
									value={String(genre.id)}
									onSelect={() => {
										onChange(genre.id || 0);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === genre.id ? "opacity-100" : "opacity-0",
										)}
									/>
									{genre.name}
								</CommandItem>
							))}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
