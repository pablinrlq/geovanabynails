import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const bookings = sqliteTable(
  "bookings",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    serviceId: text("service_id").notNull(),
    serviceTitle: text("service_title").notNull(),
    date: text("date").notNull(),
    time: text("time").notNull(),
    note: text("note").notNull().default(""),
    status: text("status").notNull().default("pending"),
    createdAt: integer("created_at").notNull().$defaultFn(() => Date.now()),
  },
  (table) => [
    index("idx_bookings_created_at").on(table.createdAt),
    uniqueIndex("idx_bookings_date_time_unique")
      .on(table.date, table.time)
      .where(sql`${table.status} != 'cancelled'`),
  ],
);
