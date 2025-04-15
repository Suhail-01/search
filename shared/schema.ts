import { pgTable, serial, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enumeration for water container types
export const containerTypeEnum = pgEnum("container_type", [
  "bottle",
  "hydration_pack",
  "cup",
  "other"
]);

// Enumeration for activity types
export const activityTypeEnum = pgEnum("activity_type", [
  "hiking",
  "running",
  "cycling",
  "camping",
  "climbing",
  "other"
]);

// Water intake logs
export const waterIntakes = pgTable("water_intakes", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(), // Amount in milliliters (ml)
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  containerType: containerTypeEnum("container_type").notNull(),
  activityType: activityTypeEnum("activity_type"),
  notes: text("notes"),
  userId: integer("user_id").notNull() // In a real app, this would be a foreign key to users table
});

// User settings for hydration goals
export const hydrationGoals = pgTable("hydration_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  dailyGoal: integer("daily_goal").notNull(), // Goal in milliliters (ml)
  reminderEnabled: integer("reminder_enabled").default(1), // 1 for true, 0 for false
  reminderInterval: integer("reminder_interval").default(60), // Reminder interval in minutes
});

// Insert schemas
export const insertWaterIntakeSchema = createInsertSchema(waterIntakes).omit({
  id: true,
});

export const insertHydrationGoalSchema = createInsertSchema(hydrationGoals).omit({
  id: true,
});

// Types
export type InsertWaterIntake = z.infer<typeof insertWaterIntakeSchema>;
export type WaterIntake = typeof waterIntakes.$inferSelect;

export type InsertHydrationGoal = z.infer<typeof insertHydrationGoalSchema>;
export type HydrationGoal = typeof hydrationGoals.$inferSelect;