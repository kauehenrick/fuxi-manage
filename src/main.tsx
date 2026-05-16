import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import StoresLayout from "./layout";
import AuthorPage from "./pages/AuthorPage";
import BookPage from "./pages/BookPage";
import GenrePage from "./pages/GenrePage";
import LoginPage from "./pages/LoginPage";
import PeoplePage from "./pages/PeoplePage";

const router = createBrowserRouter([
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
	{
		path: "/login",
		Component: LoginPage,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<StoresLayout />
		<RouterProvider router={router} />
		<Toaster />
	</StrictMode>,
);
