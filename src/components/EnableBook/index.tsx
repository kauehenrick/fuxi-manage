import { useState } from "react";
import { PiCheckCircleThin } from "react-icons/pi";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { BookProps } from "@/stores/BookStore";
import { useBookStore } from "@/stores/BookStore";
import { Button } from "../ui/button";

export default function EnableBook({ book }: { book: BookProps }) {
	const [open, setOpen] = useState(false);
	const { enableBook } = useBookStore();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<span
					className="cursor-pointer duration-300 hover:text-green-primary"
					data-testid="dialog-trigger"
				>
					<PiCheckCircleThin size="20px" />
				</span>
			</DialogTrigger>
			<DialogContent className="w-4/12">
				<DialogHeader>
					<DialogTitle>Você tem certeza?</DialogTitle>
					<DialogDescription>
						Esse processo irá habilitar esse livro! Confirme clicando nos botões
						abaixo.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild data-testid="close-button">
						<Button variant="ghost">Não</Button>
					</DialogClose>
					<Button
						onClick={async () => {
							try {
								await enableBook(book);

								setOpen(false);
							} catch (error) {
								console.error(error);
							}
						}}
					>
						Sim
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
