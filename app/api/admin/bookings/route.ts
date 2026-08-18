import { getSql } from "../../../../db";
import { isAdminRequest, isSameOrigin } from "../../../../lib/admin-auth";

const allowedStatuses = new Set(["pending", "confirmed", "completed", "cancelled"]);

export async function GET(request: Request) {
  try {
    if (!(await isAdminRequest(request))) return Response.json({ error: "Não autorizado." }, { status: 401 });
    const sql = getSql();
    const rows = await sql`
      select id, name, service_id as "serviceId", service_title as "serviceTitle",
             to_char(date, 'YYYY-MM-DD') as date, time, note, status, created_at as "createdAt"
      from bookings
      order by created_at desc
      limit 250
    `;
    return Response.json({ bookings: rows });
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
    const sql = getSql();
    const rows = await sql`update bookings set status = ${status} where id = ${id!} returning id, status`;
    if (rows.length === 0) return Response.json({ error: "Agendamento não encontrado." }, { status: 404 });
    return Response.json({ booking: rows[0] });
  } catch (error) {
    console.error("Unable to update booking", error);
    return Response.json({ error: "Não foi possível atualizar o agendamento." }, { status: 500 });
  }
}
