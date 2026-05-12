import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
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
import { authorFormSchema, useAuthorStore } from "@/stores/AuthorStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AddAuthor() {
	const [open, setOpen] = useState(false);
	const { addAuthor } = useAuthorStore();

	const form = useForm<z.infer<typeof authorFormSchema>>({
		resolver: zodResolver(authorFormSchema),
		defaultValues: {
			name: "",
		},
	});

	async function onSubmit(values: z.infer<typeof authorFormSchema>) {
		try {
			await addAuthor(values);

			setOpen(false);
			form.reset();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					onClick={() => {
						form.reset();
					}}
				>
					Adicionar
				</Button>
			</DialogTrigger>
			<DialogContent className="w-4/12">
				<DialogHeader>
					<DialogTitle>Cadastrar Autor</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
					<section className="flex items-start gap-3 rounded-md border bg-white-300 px-3 py-2">
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="name">Nome do Autor(a)</FieldLabel>
									<Input
										{...field}
										id="name"
										aria-invalid={fieldState.invalid}
										placeholder="Informe o nome do autor(a)"
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
							<Button
								variant="ghost"
								type="button"
								onClick={() => form.reset()}
							>
								Cancelar
							</Button>
						</DialogClose>
						<Button type="submit">Salvar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
