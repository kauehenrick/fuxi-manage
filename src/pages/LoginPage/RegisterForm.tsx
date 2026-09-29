import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerFormSchema, useAuthStore } from "@/stores/AuthStore";

type RegisterFormValues = z.infer<typeof registerFormSchema>;

interface RegisterFormProps {
	onSuccess: () => void;
	onLoginClick: () => void;
}

export default function RegisterForm({
	onSuccess,
	onLoginClick,
}: RegisterFormProps) {
	const { register } = useAuthStore();

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (values: RegisterFormValues) => {
		try {
			await register(values);

			form.reset();
			onSuccess();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit, (errors) => {
				console.error("ERROS:", errors);
			})}
		>
			<div className="flex flex-col gap-6">
				<Controller
					name="name"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid} className="max-w-full">
							<FieldLabel htmlFor="name">Nome</FieldLabel>

							<Input
								{...field}
								id="name"
								aria-invalid={fieldState.invalid}
								placeholder="Seu nome"
								autoComplete="name"
							/>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid} className="max-w-full">
							<FieldLabel htmlFor="email">Email</FieldLabel>

							<Input
								{...field}
								id="email"
								type="email"
								aria-invalid={fieldState.invalid}
								placeholder="fuxi@example.com"
								autoComplete="email"
							/>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="password"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid} className="max-w-full">
							<FieldLabel htmlFor="password">Senha</FieldLabel>

							<Input
								{...field}
								id="password"
								type="password"
								aria-invalid={fieldState.invalid}
								placeholder="Insira sua senha."
								autoComplete="new-password"
							/>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Controller
					name="confirmPassword"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid} className="max-w-full">
							<FieldLabel htmlFor="confirmPassword">
								Confirme a senha
							</FieldLabel>

							<Input
								{...field}
								id="confirmPassword"
								type="password"
								aria-invalid={fieldState.invalid}
								placeholder="Confirme sua senha."
								autoComplete="new-password"
							/>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</div>

			<footer className="mt-6 flex justify-end gap-2">
				<Button type="button" variant="ghost" onClick={onLoginClick}>
					Já tenho conta
				</Button>

				<Button type="submit">Cadastrar</Button>
			</footer>
		</form>
	);
}
