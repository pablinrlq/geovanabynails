"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Booking = {
  id: number;
  name: string;
  serviceId: string;
  serviceTitle: string;
  date: string;
  time: string;
  note: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: number;
};

const statusLabels = {
  pending: "Pendente",
  confirmed: "Confirmado",
  completed: "Concluído",
  cancelled: "Cancelado",
};

export default function AdminDashboard() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<"all" | Booking["status"]>("all");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const loadBookings = useCallback(async () => {
    const response = await fetch("/api/admin/bookings", { cache: "no-store" });
    if (response.status === 401) {
      setAuthenticated(false);
      return;
    }
    const data = await response.json() as { bookings?: Booking[]; error?: string };
    if (!response.ok) throw new Error(data.error ?? "Não foi possível carregar os agendamentos.");
    setBookings(data.bookings ?? []);
  }, []);

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => response.json() as Promise<{ authenticated: boolean }>)
      .then(async (session) => {
        setAuthenticated(session.authenticated);
        if (session.authenticated) await loadBookings();
      })
      .catch(() => setError("Não foi possível abrir o painel."))
      .finally(() => setChecking(false));
  }, [loadBookings]);

  const visibleBookings = useMemo(
    () => filter === "all" ? bookings : bookings.filter((booking) => booking.status === filter),
    [bookings, filter],
  );

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Não foi possível entrar.");
      setAuthenticated(true);
      setPassword("");
      await loadBookings();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Não foi possível entrar.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthenticated(false);
    setBookings([]);
  }

  async function updateStatus(id: number, status: Booking["status"]) {
    setError("");
    const previous = bookings;
    setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, status } : booking));
    const response = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!response.ok) {
      setBookings(previous);
      setError("Não foi possível atualizar este agendamento.");
    }
  }

  if (checking) return <div className="admin-loading">Abrindo painel...</div>;

  if (!authenticated) {
    return (
      <main className="admin-login-page">
        <a className="admin-logo" href="/">Geovanna <span>Alves</span></a>
        <form className="admin-login-card" onSubmit={login}>
          <p>ÁREA ADMINISTRATIVA</p>
          <h1>Bem-vinda,<br /><em>Geovanna.</em></h1>
          <label><span>Senha de acesso</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>
          {error && <div className="admin-error" role="alert">{error}</div>}
          <button type="submit" disabled={busy}>{busy ? "Entrando..." : "Entrar no painel"}</button>
          <a href="/">← Voltar para o site</a>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-header"><div><span className="admin-logo">Geovanna <b>Alves</b></span><small>Painel de agendamentos</small></div><div><a href="/" target="_blank">Ver site ↗</a><button type="button" onClick={logout}>Sair</button></div></header>
      <section className="admin-content">
        <div className="admin-title"><div><p>VISÃO GERAL</p><h1>Agendamentos</h1></div><button type="button" onClick={() => loadBookings()}>Atualizar</button></div>
        <div className="admin-metrics">
          <div><span>Pedidos pendentes</span><strong>{bookings.filter((booking) => booking.status === "pending").length}</strong></div>
          <div><span>Confirmados</span><strong>{bookings.filter((booking) => booking.status === "confirmed").length}</strong></div>
          <div><span>Total de pedidos</span><strong>{bookings.length}</strong></div>
        </div>
        <div className="admin-toolbar">
          {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((status) => (
            <button type="button" className={filter === status ? "active" : ""} onClick={() => setFilter(status)} key={status}>
              {status === "all" ? "Todos" : statusLabels[status]}
            </button>
          ))}
        </div>
        {error && <div className="admin-error" role="alert">{error}</div>}
        <div className="booking-table-wrap">
          <table className="booking-table">
            <thead><tr><th>Cliente</th><th>Procedimento</th><th>Data</th><th>Horário</th><th>Observação</th><th>Status</th></tr></thead>
            <tbody>
              {visibleBookings.map((booking) => (
                <tr key={booking.id}>
                  <td><strong>{booking.name}</strong><small>Pedido #{booking.id}</small></td>
                  <td>{booking.serviceTitle}</td>
                  <td>{new Date(`${booking.date}T12:00:00`).toLocaleDateString("pt-BR")}</td>
                  <td><strong>{booking.time}</strong></td>
                  <td className="booking-note">{booking.note || "—"}</td>
                  <td><select className={`status-select ${booking.status}`} value={booking.status} onChange={(event) => updateStatus(booking.id, event.target.value as Booking["status"])}><option value="pending">Pendente</option><option value="confirmed">Confirmado</option><option value="completed">Concluído</option><option value="cancelled">Cancelado</option></select></td>
                </tr>
              ))}
            </tbody>
          </table>
          {visibleBookings.length === 0 && <div className="empty-bookings">Nenhum agendamento nesta categoria.</div>}
        </div>
      </section>
    </main>
  );
}
