import { getSupabase } from "../../../../db";
import { isAdminRequest, isSameOrigin } from "../../../../lib/admin-auth";

const allowedStatuses = new Set(["pending", "confirmed", "completed", "cancelled"]);

export async function GET(request: Request) {
  try {
    if (!(await isAdminRequest(request))) return Response.json({ error: "Não autorizado." }, { status: 401 });
    const { data, error } = await getSupabase().from("bookings").select("*").order("created_at", { ascending: false }).limit(250);
    if (error) throw error;
    const bookings = (data ?? []).map((booking) => ({
      id: booking.id,
      name: booking.name,
      serviceId: booking.service_id,
      serviceTitle: booking.service_title,
      date: booking.date,
      time: booking.time,
      note: booking.note,
      status: booking.status,
      createdAt: booking.created_at,
    }));
    return Response.json({ bookings });
  } catch (error) {
    console.error("Unable to list bookings", error);
    return Response.json({ error: "Não foi possível carregar os agendamentos." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Origem inválida." }, { status: 403 });
  try {
    if (!(await isAdminRequest(request))) return Response.json({ error: "Não autorizado." }, { status: 401 });
    const { id, status } = (await request.json()) as { id?: number; status?: string };
    if (!Number.isInteger(id) || !status || !allowedStatuses.has(status)) {
      return Response.json({ error: "Atualização inválida." }, { status: 400 });
    }
    const { data, error } = await getSupabase().from("bookings").update({ status }).eq("id", id!).select("id, status").maybeSingle();
    if (error) throw error;
    if (!data) return Response.json({ error: "Agendamento não encontrado." }, { status: 404 });
    return Response.json({ booking: data });
  } catch (error) {
    console.error("Unable to update booking", error);
    return Response.json({ error: "Não foi possível atualizar o agendamento." }, { status: 500 });
  }
}
