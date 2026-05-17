import type { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { create } from "zustand";
import { api } from "../services/api";

export const loginFormSchema = z.object({
	email: z.email({ message: "Informe um email válido." }),
	password: z.string().min(6, {
		message: "A senha deve ter no mínimo 6 caracteres.",
	}),
});

export const userSchema = z.object({
	id: z.number(),
	name: z.string(),
	email: z.email(),
});

export type LoginFormProps = z.infer<typeof loginFormSchema>;
export type UserProps = z.infer<typeof userSchema>;

type AuthStoreProps = {
	user: UserProps | null;
	error: null | string | unknown;
	loading: boolean;
	initialized: boolean;

	login: (credentials: LoginFormProps) => Promise<void>;
	logout: () => Promise<void>;
	getMe: () => Promise<void>;
};

export const useAuthStore = create<AuthStoreProps>((set) => ({
	user: null,
	error: null,
	loading: false,
	initialized: false,

	login: async (credentials) => {
		try {
			set({
				error: null,
				loading: true,
			});

			const { data } = await api.post("/login", credentials);

			set({
				user: data.user,
			});

			toast.success("Login realizado com sucesso.");
		} catch (err) {
			const error = err as AxiosError<{
				message?: string;
				errors?: Record<string, string[]>;
			}>;

			const message =
				error?.response?.data?.message || "Erro inesperado ao realizar login.";

			toast.error(message);

			set({
				error: err,
				user: null,
			});

			throw err;
		} finally {
			set({
				loading: false,
			});
		}
	},

	logout: async () => {
		try {
			set({
				error: null,
				loading: true,
			});

			await api.post("/logout");

			set({
				user: null,
			});

			toast.success("Logout realizado com sucesso.");
		} catch (err) {
			const error = err as AxiosError<{
				message?: string;
			}>;

			const message =
				error?.response?.data?.message || "Erro inesperado ao realizar logout.";

			toast.error(message);

			set({
				error: err,
			});

			throw err;
		} finally {
			set({
				loading: false,
			});
		}
	},

	getMe: async () => {
		try {
			set({
				error: null,
				loading: true,
			});

			const { data } = await api.get("/me");

			set({
				user: data,
			});
		} catch (err) {
			const error = err as AxiosError;

			if (error.response?.status !== 401) {
				set({
					error: err,
				});
			}

			set({
				user: null,
			});
		} finally {
			set({
				loading: false,
				initialized: true,
			});
		}
	},
}));
