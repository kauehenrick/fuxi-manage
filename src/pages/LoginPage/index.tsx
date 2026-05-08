import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoFuXiImg from "../../assets/fuxi-logo.svg";

export default function LoginPage() {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<Card className="w-full max-w-4xl p-10">
				<img className="w-40" src={logoFuXiImg} alt="Logo do FuXi" />

				<CardContent className="flex justify-between px-0">
					<div>
						<h1 className="font-medium text-3xl">Faça login na sua conta</h1>
						<p className="mt-2 font-light">Entre usando suas credenciais</p>
					</div>

					<div>
						<form>
							<div className="flex flex-col gap-6">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="fuxi@example.com"
										required
										className="min-w-90"
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Senha</Label>
									</div>
									<Input
										id="password"
										type="password"
										required
										className="min-w-90"
									/>
								</div>
							</div>
						</form>
						<footer className="mt-6 flex justify-end gap-2">
							<Button variant="ghost">Criar conta</Button>
							<Button>Entrar</Button>
						</footer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
