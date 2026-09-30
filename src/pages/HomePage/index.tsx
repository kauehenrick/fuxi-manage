import { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardStatsCards from "@/components/DashboardStatsCards";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useAuthorStore } from "@/stores/AuthorStore";
import { useAuthStore } from "@/stores/AuthStore";
import { useBookStore } from "@/stores/BookStore";
import { useDashboardStore } from "@/stores/DashboardStore";
import { useGenreStore } from "@/stores/GenreStore";

export default function HomePage() {
  const getDashboard = useDashboardStore((state) => state.getDashboard);
  const booksByGenre = useDashboardStore((state) => state.booksByGenre);
  const topAuthors = useDashboardStore((state) => state.topAuthors);
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    useAuthorStore.getState().getAuthors();
    useGenreStore.getState().getGenres();
    useBookStore.getState().getBooks();
    getDashboard();
  }, [loading, user, getDashboard]);

  const todaysDate = new Date()
    .toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(
      /^[a-z]|\bde [a-z]/g,
      (match) => match.slice(0, -1) + match.slice(-1).toUpperCase(),
    );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex w-full flex-col items-start">
        <Header pageName="Tela inicial" />

        <main className="mt-4 w-full px-6">
          <h1 className="font-light">{todaysDate}</h1>

          <DashboardStatsCards />

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold text-foreground text-lg">
                Livros por Gênero
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={booksByGenre}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
                  <YAxis tick={{ fill: "#6b7280" }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3f5e56" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-semibold text-foreground text-lg">
                Top Autores
              </h3>
              <div className="space-y-3">
                {topAuthors.map((author, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: index is stable here
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 text-center">
                      <span className="font-semibold text-muted-foreground text-sm">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-medium text-foreground text-sm">
                          {author.name}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {author.books} livros
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(author.books / 45) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
