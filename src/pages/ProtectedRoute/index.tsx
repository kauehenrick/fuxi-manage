import { Navigate, Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/stores/AuthStore";

export default function ProtectedRoute() {
	const { user, loading } = useAuthStore();

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Button disabled size="sm">
					<Spinner data-icon="inline-start" />
					Carregando...
				</Button>
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
