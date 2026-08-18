import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { bookings } from "../../../../db/schema";
import { isAdminRequest, isSameOrigin } from "../../../../lib/admin-auth";

const allowedStatuses = new Set(["pending", "confirmed", "completed", "cancelled"]);

export async function GET(request: Request) {
  try {
    if (!(await isAdminRequest(request))) return Response.json({ error: "Não autorizado." }, { status: 401 });
    const rows = await getDb().select().from(bookings).orderBy(desc(bookings.createdAt)).limit(250);
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
    const [updated] = await getDb().update(bookings).set({ status }).where(eq(bookings.id, id!)).returning();
    if (!updated) return Response.json({ error: "Agendamento não encontrado." }, { status: 404 });
    return Response.json({ booking: updated });
  } catch (error) {
    console.error("Unable to update booking", error);
    return Response.json({ error: "Não foi possível atualizar o agendamento." }, { status: 500 });
  }
}
