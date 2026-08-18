import { and, eq, ne } from "drizzle-orm";
import { getDb } from "../../../db";
import { bookings } from "../../../db/schema";
import { isSameOrigin } from "../../../lib/admin-auth";

const allowedServices: Record<string, string> = {
  fibra: "Fibra de vidro",
  manutencao: "Manutenção",
  molde: "Alongamento no molde",
  gel: "Esmaltação em gel",
};

const allowedTimes = new Set(["09:00", "11:30", "14:00", "16:30", "19:00"]);

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return Response.json({ error: "Data inválida." }, { status: 400 });
  try {
    const rows = await getDb()
      .select({ time: bookings.time })
      .from(bookings)
      .where(and(eq(bookings.date, date), ne(bookings.status, "cancelled")));
    return Response.json({ occupiedTimes: rows.map((booking) => booking.time) });
  } catch (error) {
    console.error("Unable to load availability", error);
    return Response.json({ error: "Não foi possível consultar os horários." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ error: "Origem inválida." }, { status: 403 });

  try {
    const payload = (await request.json()) as { name?: string; serviceId?: string; date?: string; time?: string; note?: string };
    const name = payload.name?.trim() ?? "";
    const serviceId = payload.serviceId ?? "";
    const date = payload.date ?? "";
    const time = payload.time ?? "";
    const note = payload.note?.trim() ?? "";

    if (name.length < 2 || name.length > 80) return Response.json({ error: "Informe um nome válido." }, { status: 400 });
    if (!allowedServices[serviceId]) return Response.json({ error: "Procedimento inválido." }, { status: 400 });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return Response.json({ error: "Data inválida." }, { status: 400 });
    if (!allowedTimes.has(time)) return Response.json({ error: "Horário inválido." }, { status: 400 });
    if (note.length > 500) return Response.json({ error: "A observação está muito longa." }, { status: 400 });

    const requestedDate = new Date(`${date}T23:59:59Z`);
    if (Number.isNaN(requestedDate.valueOf()) || requestedDate.valueOf() < Date.now()) {
      return Response.json({ error: "Escolha uma data futura." }, { status: 400 });
    }

    const [booking] = await getDb().insert(bookings).values({
      name,
      serviceId,
      serviceTitle: allowedServices[serviceId],
      date,
      time,
      note,
    }).returning({ id: bookings.id });

    return Response.json({ id: booking.id }, { status: 201 });
  } catch (error) {
    console.error("Unable to create booking", error);
    const message = error instanceof Error ? error.message : "";
    if (message.includes("UNIQUE constraint failed") || message.includes("idx_bookings_date_time_unique")) {
      return Response.json({ error: "Este horário acabou de ser reservado. Escolha outro." }, { status: 409 });
    }
    return Response.json({ error: "Não foi possível salvar o pedido agora." }, { status: 500 });
  }
}
