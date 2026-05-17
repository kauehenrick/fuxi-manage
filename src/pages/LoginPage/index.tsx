import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginFormSchema, useAuthStore } from "@/stores/AuthStore";
import logoFuXiImg from "../../assets/fuxi-logo.svg";

export default function LoginPage() {
	const { login, user } = useAuthStore();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	if (user) {
		return <Navigate to="/" replace />;
	}

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		try {
			await login(values);

			form.reset();
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<Card className="w-full max-w-4xl p-10">
				<img className="w-30" src={logoFuXiImg} alt="Logo do FuXi" />

				<CardContent className="flex justify-between px-0">
					<div>
						<h1 className="font-medium text-3xl">Faça login na sua conta</h1>
						<p className="mt-2 font-light">Entre usando suas credenciais</p>
					</div>

					<div className="w-2/5">
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
										<Field
											data-invalid={fieldState.invalid}
											className="max-w-full"
										>
											<FieldLabel htmlFor="title">Email </FieldLabel>
											<Input
												{...field}
												id="email"
												type="email"
												aria-invalid={fieldState.invalid}
												placeholder="fuxi@example.com"
												autoComplete="on"
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>

								<Controller
									name="password"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field
											data-invalid={fieldState.invalid}
											className="max-w-full"
										>
											<FieldLabel htmlFor="title">Senha </FieldLabel>
											<Input
												{...field}
												id="password"
												type="password"
												aria-invalid={fieldState.invalid}
												placeholder="Insira sua senha."
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
							</div>

							<footer className="mt-6 flex justify-end gap-2">
								<Button variant="ghost" disabled>
									Criar conta
								</Button>
								<Button type="submit">Entrar</Button>
							</footer>
						</form>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
