import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Droplet, RefreshCw, Save } from "lucide-react";
import { HydrationGoal } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Form state
  const [dailyGoal, setDailyGoal] = useState<number>(2500);
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(true);
  const [reminderInterval, setReminderInterval] = useState<number>(60);
  const [isSettingsChanged, setIsSettingsChanged] = useState<boolean>(false);

  // Query for hydration goal
  const { data: hydrationGoal, isLoading } = useQuery<HydrationGoal>({
    queryKey: ['/api/hydration-goal'],
  });

  // Update form values when data is loaded
  useEffect(() => {
    if (hydrationGoal) {
      setDailyGoal(hydrationGoal.dailyGoal);
      setReminderEnabled(hydrationGoal.reminderEnabled === 1);
      setReminderInterval(hydrationGoal.reminderInterval || 60);
      setIsSettingsChanged(false);
    }
  }, [hydrationGoal]);

  // Detect changes in settings
  useEffect(() => {
    if (hydrationGoal) {
      const isDailyGoalChanged = dailyGoal !== hydrationGoal.dailyGoal;
      const isReminderEnabledChanged = (reminderEnabled ? 1 : 0) !== hydrationGoal.reminderEnabled;
      const isReminderIntervalChanged = reminderInterval !== hydrationGoal.reminderInterval;
      
      setIsSettingsChanged(isDailyGoalChanged || isReminderEnabledChanged || isReminderIntervalChanged);
    }
  }, [dailyGoal, reminderEnabled, reminderInterval, hydrationGoal]);

  // Mutation for updating hydration goal
  const updateGoalMutation = useMutation({
    mutationFn: (updatedGoal: any) => 
      apiRequest('/api/hydration-goal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGoal),
      }),
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/hydration-goal'] });
      toast({
        title: "Settings saved",
        description: "Your hydration preferences have been updated.",
      });
      setIsSettingsChanged(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to save settings",
        description: "Please try again.",
        variant: "destructive",
      });
      console.error("Error updating hydration goal:", error);
    },
  });

  // Handle form submission
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateGoalMutation.mutate({
      dailyGoal,
      reminderEnabled: reminderEnabled ? 1 : 0,
      reminderInterval,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 container py-6 px-4 md:py-10">
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your hydration preferences</p>
          </div>
          
          {/* Hydration Goals Form */}
          <Card>
            <CardHeader>
              <CardTitle>Hydration Goals</CardTitle>
              <CardDescription>
                Set your daily water intake target and notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  {/* Daily Water Intake Goal */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dailyGoal" className="text-base">Daily Water Intake Goal</Label>
                      <p className="text-sm text-muted-foreground">
                        How much water you aim to drink each day (in milliliters)
                      </p>
                    </div>
                    
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Current goal: {dailyGoal}ml ({(dailyGoal / 1000).toFixed(1)} liters)
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => setDailyGoal(2000)}
                          >
                            2L
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => setDailyGoal(2500)}
                          >
                            2.5L
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => setDailyGoal(3000)}
                          >
                            3L
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Slider
                          id="dailyGoal"
                          min={500}
                          max={5000}
                          step={100}
                          value={[dailyGoal]}
                          onValueChange={(values) => setDailyGoal(values[0])}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={dailyGoal}
                          onChange={(e) => setDailyGoal(parseInt(e.target.value) || 0)}
                          min={500}
                          max={5000}
                          step={100}
                          className="w-20"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Reminder Settings */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base">Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Configure hydration reminders to help you stay on track
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="reminderEnabled">Enable Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications to drink water
                          </p>
                        </div>
                        <Switch
                          id="reminderEnabled"
                          checked={reminderEnabled}
                          onCheckedChange={setReminderEnabled}
                        />
                      </div>
                      
                      {reminderEnabled && (
                        <div className="space-y-2">
                          <Label htmlFor="reminderInterval">Reminder Interval (minutes)</Label>
                          <div className="flex items-center space-x-4">
                            <Slider
                              id="reminderInterval"
                              min={15}
                              max={120}
                              step={15}
                              value={[reminderInterval]}
                              onValueChange={(values) => setReminderInterval(values[0])}
                              disabled={!reminderEnabled}
                              className="flex-1"
                            />
                            <span className="w-12 text-center">{reminderInterval}</span>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>15 min</span>
                            <span>60 min</span>
                            <span>120 min</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (hydrationGoal) {
                    setDailyGoal(hydrationGoal.dailyGoal);
                    setReminderEnabled(hydrationGoal.reminderEnabled === 1);
                    setReminderInterval(hydrationGoal.reminderInterval || 60);
                  }
                }}
                disabled={!isSettingsChanged || updateGoalMutation.isPending}
              >
                Reset
              </Button>
              <Button
                type="button"
                onClick={handleSaveSettings}
                disabled={!isSettingsChanged || updateGoalMutation.isPending}
              >
                {updateGoalMutation.isPending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}