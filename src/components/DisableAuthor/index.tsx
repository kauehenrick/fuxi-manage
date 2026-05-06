import { useState } from "react";
import { PiTrashLight } from "react-icons/pi";
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
import type { AuthorProps } from "@/stores/AuthorStore";
import { useAuthorStore } from "@/stores/AuthorStore";
import { Button } from "../ui/button";

export default function DisableAuthor({ author }: { author: AuthorProps }) {
	const [open, setOpen] = useState(false);
	const { disableAuthor } = useAuthorStore();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<span
					className="cursor-pointer duration-300 hover:text-red-600"
					data-testid="dialog-trigger"
				>
					<PiTrashLight size="20px" />
				</span>
			</DialogTrigger>

			<DialogContent className="w-4/12">
				<DialogHeader>
					<DialogTitle>Você tem certeza?</DialogTitle>
					<DialogDescription>
						Esse processo irá desativar esse(a) autor(a)! Confirme clicando nos
						botões abaixo.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild data-testid="close-button">
						<Button variant="ghost">Não</Button>
					</DialogClose>

					<Button
						onClick={() => {
							disableAuthor(author);
							setOpen(false);
						}}
					>
						Sim
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
