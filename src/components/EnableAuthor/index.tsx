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
import type { AuthorProps } from "@/stores/AuthorStore";
import { useAuthorStore } from "@/stores/AuthorStore";
import { Button } from "../ui/button";

export default function EnableAuthor({ author }: { author: AuthorProps }) {
	const [open, setOpen] = useState(false);
	const { enableAuthor } = useAuthorStore();

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
						Esse processo irá habilitar esse(a) autor(a)! Confirme clicando nos
						botões abaixo.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild data-testid="close-button">
						<Button variant="ghost">Não</Button>
					</DialogClose>
					<Button
						onClick={async () => {
							try {
								await enableAuthor(author);

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
