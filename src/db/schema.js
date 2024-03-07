const { serial } = require("drizzle-orm/mysql-core");
const { pgTable, text, timestamp, integer } = require("drizzle-orm/pg-core");

const CarSchema = pgTable("cars", {
  id: serial("id").primaryKey().notNull(),
  companyName: text("company_name").notNull(),
  description: text("description").default("This is a car"),
  model: text("model").notNull(),
  yearOfManufacture: text("year").notNull(),
  color: text("color").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  milage: integer("milage"),
});

module.exports.CarSchema = CarSchema;
