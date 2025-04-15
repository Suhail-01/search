import { Express, Request, Response } from "express";
import { Server } from "http";
import { storage } from "./storage";
import { insertWaterIntakeSchema, insertHydrationGoalSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Default user ID - in a real app, this would come from authentication
  const DEFAULT_USER_ID = 1;

  // Get all water intakes for a user
  app.get("/api/water-intakes", async (req: Request, res: Response) => {
    try {
      const userId = DEFAULT_USER_ID;
      const intakes = await storage.getWaterIntakes(userId);
      res.json(intakes);
    } catch (error) {
      console.error("Error fetching water intakes:", error);
      res.status(500).json({ error: "Failed to fetch water intakes" });
    }
  });

  // Get water intakes for a specific date
  app.get("/api/water-intakes/date/:date", async (req: Request, res: Response) => {
    try {
      const userId = DEFAULT_USER_ID;
      const dateStr = req.params.date;
      const date = new Date(dateStr);
      
      if (isNaN(date.getTime())) {
        return res.status(400).json({ error: "Invalid date format" });
      }
      
      const intakes = await storage.getWaterIntakesByDate(userId, date);
      res.json(intakes);
    } catch (error) {
      console.error("Error fetching water intakes by date:", error);
      res.status(500).json({ error: "Failed to fetch water intakes" });
    }
  });

  // Create a new water intake record
  app.post("/api/water-intakes", async (req: Request, res: Response) => {
    try {
      const userId = DEFAULT_USER_ID;
      
      // Validate request body
      const validatedData = insertWaterIntakeSchema.parse({
        ...req.body,
        userId
      });
      
      const newIntake = await storage.createWaterIntake(validatedData);
      res.status(201).json(newIntake);
    } catch (error) {
      console.error("Error creating water intake:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      
      res.status(500).json({ error: "Failed to create water intake" });
    }
  });

  // Get user's hydration goal
  app.get("/api/hydration-goal", async (req: Request, res: Response) => {
    try {
      const userId = DEFAULT_USER_ID;
      const goal = await storage.getHydrationGoal(userId);
      
      if (!goal) {
        // Return default goal if none is set
        return res.json({
          userId,
          dailyGoal: 2500, // Default 2.5 liters
          reminderEnabled: 1,
          reminderInterval: 60
        });
      }
      
      res.json(goal);
    } catch (error) {
      console.error("Error fetching hydration goal:", error);
      res.status(500).json({ error: "Failed to fetch hydration goal" });
    }
  });

  // Create or update hydration goal
  app.post("/api/hydration-goal", async (req: Request, res: Response) => {
    try {
      const userId = DEFAULT_USER_ID;
      
      // Validate request body
      const validatedData = insertHydrationGoalSchema.parse({
        ...req.body,
        userId
      });
      
      const goal = await storage.createOrUpdateHydrationGoal(validatedData);
      res.status(201).json(goal);
    } catch (error) {
      console.error("Error creating/updating hydration goal:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      
      res.status(500).json({ error: "Failed to create/update hydration goal" });
    }
  });

  return app;
}