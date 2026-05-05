import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PiPencilLineThin } from "react-icons/pi";
import { z } from "zod";
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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { AuthorProps } from "@/stores/AuthorStore";
import { authorFormSchema, useAuthorStore } from "@/stores/AuthorStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function UpdateAuthor(author: AuthorProps) {
	const [open, setOpen] = useState(false);
	const { updateAuthor } = useAuthorStore();

	const form = useForm<z.infer<typeof authorFormSchema>>({
		resolver: zodResolver(authorFormSchema),
		defaultValues: {
			id: author.id,
			name: author.name,
		},
	});

	function onSubmit(values: z.infer<typeof authorFormSchema>) {
		updateAuthor(values);
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<span
					className="hover:text-green-700 duration-300 cursor-pointer"
					data-testid="dialog-trigger"
				>
					<PiPencilLineThin size="20px" />
				</span>
			</DialogTrigger>
			<DialogContent className="w-4/12">
				<DialogHeader>
					<DialogTitle>Atualizar Autor</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<form
					className="space-y-6"
					onSubmit={form.handleSubmit(onSubmit, (errors) => {
						console.error("ERROS:", errors);
					})}
				>
					<section className="flex items-start gap-3 bg-white-300 border rounded-md px-3 py-2">
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="name">Nome do Autor</FieldLabel>
									<Input
										{...field}
										id="name"
										aria-invalid={fieldState.invalid}
										placeholder="Informe o nome do autor"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</section>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="ghost" type="button">
								Cancelar
							</Button>
						</DialogClose>
						<Button type="submit">Atualizar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
