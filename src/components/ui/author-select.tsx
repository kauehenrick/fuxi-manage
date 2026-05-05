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
import { useAuthorStore } from "@/stores/AuthorStore";

type AuthorSelectProps = {
	value?: number;
	onChange: (value: number) => void;
};

export default function AuthorSelect({ value, onChange }: AuthorSelectProps) {
	const { authors } = useAuthorStore();
	const [open, setOpen] = useState(false);

	const items = authors.filter((e) => !e.deleted_at);

	const selectedAuthor = items.find((g) => g.id === value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					className="w-50 justify-between"
				>
					{selectedAuthor?.name ?? "Selecione o autor..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="max-w-62.5 p-0">
				<Command>
					<CommandInput placeholder="Buscar autor..." />
					<CommandEmpty>Nenhum autor encontrado.</CommandEmpty>

					<CommandGroup>
						<CommandList>
							{items.map((author) => (
								<CommandItem
									key={author.id}
									value={author.name}
									onSelect={() => {
										onChange(author.id || 0);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === author.id ? "opacity-100" : "opacity-0",
										)}
									/>
									{author.name}
								</CommandItem>
							))}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
