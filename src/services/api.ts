import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error.response?.status;
		const url = error.config?.url;

		const ignoredRoutes = ["/login", "/me"];

		if (status === 401 && !ignoredRoutes.includes(url)) {
			localStorage.removeItem("token");
			window.location.href = "/login";
		}

		return Promise.reject(error);
	},
);