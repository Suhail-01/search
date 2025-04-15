import { WaterIntake, InsertWaterIntake, HydrationGoal, InsertHydrationGoal } from "@shared/schema";

export interface IStorage {
  // Water intake methods
  getWaterIntakes(userId: number): Promise<WaterIntake[]>;
  getWaterIntakesByDate(userId: number, date: Date): Promise<WaterIntake[]>;
  createWaterIntake(waterIntake: InsertWaterIntake): Promise<WaterIntake>;
  
  // Hydration goals methods
  getHydrationGoal(userId: number): Promise<HydrationGoal | undefined>;
  createOrUpdateHydrationGoal(goal: InsertHydrationGoal): Promise<HydrationGoal>;
}

export class MemStorage implements IStorage {
  private waterIntakes: Map<number, WaterIntake>;
  private hydrationGoals: Map<number, HydrationGoal>;
  private waterIntakeCurrentId: number;
  private hydrationGoalCurrentId: number;

  constructor() {
    this.waterIntakes = new Map();
    this.hydrationGoals = new Map();
    this.waterIntakeCurrentId = 1;
    this.hydrationGoalCurrentId = 1;
  }

  async getWaterIntakes(userId: number): Promise<WaterIntake[]> {
    const intakes: WaterIntake[] = [];
    
    for (const intake of this.waterIntakes.values()) {
      if (intake.userId === userId) {
        intakes.push(intake);
      }
    }
    
    // Sort by timestamp (newest first)
    return intakes.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async getWaterIntakesByDate(userId: number, date: Date): Promise<WaterIntake[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const intakes = await this.getWaterIntakes(userId);
    
    return intakes.filter(intake => {
      const intakeDate = new Date(intake.timestamp);
      return intakeDate >= startOfDay && intakeDate <= endOfDay;
    });
  }

  async createWaterIntake(waterIntake: InsertWaterIntake): Promise<WaterIntake> {
    const id = this.waterIntakeCurrentId++;
    const newIntake: WaterIntake = {
      ...waterIntake,
      id,
      timestamp: waterIntake.timestamp || new Date()
    };
    
    this.waterIntakes.set(id, newIntake);
    return newIntake;
  }

  async getHydrationGoal(userId: number): Promise<HydrationGoal | undefined> {
    for (const goal of this.hydrationGoals.values()) {
      if (goal.userId === userId) {
        return goal;
      }
    }
    return undefined;
  }

  async createOrUpdateHydrationGoal(goal: InsertHydrationGoal): Promise<HydrationGoal> {
    // Check if goal already exists for this user
    const existingGoal = await this.getHydrationGoal(goal.userId);
    
    if (existingGoal) {
      // Update existing goal
      const updatedGoal: HydrationGoal = {
        ...existingGoal,
        ...goal
      };
      
      this.hydrationGoals.set(existingGoal.id, updatedGoal);
      return updatedGoal;
    } else {
      // Create new goal
      const id = this.hydrationGoalCurrentId++;
      const newGoal: HydrationGoal = {
        ...goal,
        id
      };
      
      this.hydrationGoals.set(id, newGoal);
      return newGoal;
    }
  }
}

// Export a singleton instance
export const storage = new MemStorage();