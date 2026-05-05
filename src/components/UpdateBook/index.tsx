import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PiPencilLineThin } from "react-icons/pi";
import { z } from "zod";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
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
import {
	type BookProps,
	bookFormSchema,
	useBookStore,
} from "@/stores/BookStore";
import AuthorSelect from "../ui/author-select";
import { Button } from "../ui/button";
import GenreSelect from "../ui/genre-select";
import { Input } from "../ui/input";

export default function UpdateBook(book: BookProps) {
	const [open, setOpen] = useState(false);
	const { updateBook } = useBookStore();

	const form = useForm<z.infer<typeof bookFormSchema>>({
		resolver: zodResolver(bookFormSchema),
		defaultValues: {
			id: book.id,
			title: book.title,
			author_id: book.author_id,
			genre_id: book.genre_id,
			published_year: book.published_year,
			localization: book.localization,
			isbn: book.isbn,
		},
	});

	function onSubmit(values: z.infer<typeof bookFormSchema>) {
		updateBook(values);
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
			<DialogContent className="w-8/12">
				<DialogHeader>
					<DialogTitle>Editar Livro</DialogTitle>
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
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="title">Título</FieldLabel>
									<Input
										{...field}
										id="title"
										aria-invalid={fieldState.invalid}
										placeholder="Informe o título do livro"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="author_id"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Autor</FieldLabel>

									<AuthorSelect value={field.value} onChange={field.onChange} />

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="genre_id"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel>Gênero</FieldLabel>

									<GenreSelect value={field.value} onChange={field.onChange} />

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</section>

					<Accordion
						type="single"
						collapsible
						className="bg-white-300 border rounded-md px-3 py-2"
					>
						<AccordionItem value="item-1">
							<AccordionTrigger className="font-medium text-md">
								Outras Informações
							</AccordionTrigger>
							<AccordionContent className="mt-3">
								<div className="flex gap-3">
									<Controller
										name="published_year"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="year">Ano</FieldLabel>
												<Input
													{...field}
													id="year"
													type="text"
													value={field.value ?? ""}
													aria-invalid={fieldState.invalid}
													placeholder="Informe o ano de publicação"
													autoComplete="off"
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>

									<Controller
										name="localization"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="localization">
													Localização
												</FieldLabel>
												<Input
													{...field}
													id="localization"
													value={field.value ?? ""}
													aria-invalid={fieldState.invalid}
													placeholder="Informe a localização do livro"
													autoComplete="off"
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>

									<Controller
										name="isbn"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<FieldLabel htmlFor="isbn">ISBN</FieldLabel>
												<Input
													{...field}
													id="isbn"
													value={field.value ?? ""}
													aria-invalid={fieldState.invalid}
													placeholder="Informe o ISBN do livro"
													autoComplete="off"
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>

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
