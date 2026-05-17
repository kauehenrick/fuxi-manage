import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { useAuthStore } from "@/stores/AuthStore";
import AuthorPage from "./pages/AuthorPage";
import BookPage from "./pages/BookPage";
import GenrePage from "./pages/GenrePage";
import LoginPage from "./pages/LoginPage";
import PeoplePage from "./pages/PeoplePage";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
	{
		path: "/login",
		Component: LoginPage,
	},
	{
		Component: ProtectedRoute,
		children: [
			{
				path: "/",
				Component: BookPage,
			},
			{
				path: "/authors",
				Component: AuthorPage,
			},
			{
				path: "/genres",
				Component: GenrePage,
			},
			{
				path: "/people",
				Component: PeoplePage,
			},
		],
	},
]);

function App() {
	const { getMe, initialized } = useAuthStore();

	useEffect(() => {
		if (initialized) {
			return;
		}

		getMe();
	}, [initialized, getMe]);

	return (
		<>
			<RouterProvider router={router} />
			<Toaster />
		</>
	);
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
