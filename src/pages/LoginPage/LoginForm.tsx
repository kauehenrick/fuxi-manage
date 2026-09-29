import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginFormSchema, useAuthStore } from "@/stores/AuthStore";

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
	onSuccess: () => void;
	onRegisterClick: () => void;
}

export default function LoginForm({
	onSuccess,
	onRegisterClick,
}: LoginFormProps) {
	const { login } = useAuthStore();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: LoginFormValues) => {
		try {
			await login(values);

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
								autoComplete="current-password"
							/>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</div>

			<footer className="mt-6 flex justify-end gap-2">
				<Button type="button" variant="ghost" onClick={onRegisterClick}>
					Criar conta
				</Button>

				<Button type="submit">Entrar</Button>
			</footer>
		</form>
	);
}
