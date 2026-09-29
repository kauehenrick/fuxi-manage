import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/stores/AuthStore";

import logoFuXiImg from "../../assets/fuxi-logo.svg";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginPage() {
	const [isRegister, setIsRegister] = useState(false);

	const { user } = useAuthStore();
	const navigate = useNavigate();

	if (user) {
		return <Navigate to="/" replace />;
	}

	const handleSuccess = () => {
		navigate("/");
	};

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<Card className="w-full max-w-4xl p-10">
				<img className="w-30" src={logoFuXiImg} alt="Logo do FuXi" />

				<CardContent className="flex justify-between px-0">
					<div>
						<h1 className="font-medium text-3xl">
							{isRegister ? "Crie sua conta" : "Faça login na sua conta"}
						</h1>

						<p className="mt-2 font-light">
							{isRegister
								? "Preencha os dados para continuar"
								: "Entre usando suas credenciais"}
						</p>
					</div>

					<div className="w-2/5">
						{isRegister ? (
							<RegisterForm
								onSuccess={handleSuccess}
								onLoginClick={() => setIsRegister(false)}
							/>
						) : (
							<LoginForm
								onSuccess={handleSuccess}
								onRegisterClick={() => setIsRegister(true)}
							/>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
