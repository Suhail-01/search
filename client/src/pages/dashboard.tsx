import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Cup, Droplet, Plus, RefreshCw, Trash2 } from "lucide-react";
import { HydrationGoal, WaterIntake, containerTypeEnum, activityTypeEnum } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [date, setDate] = useState<Date>(new Date());
  
  // Form state for adding new water intake
  const [amount, setAmount] = useState<number>(250);
  const [containerType, setContainerType] = useState<string>("bottle");
  const [activityType, setActivityType] = useState<string>("hiking");
  const [notes, setNotes] = useState<string>("");

  // Query for hydration goal
  const { data: hydrationGoal } = useQuery<HydrationGoal>({
    queryKey: ['/api/hydration-goal'],
  });

  // Query for water intakes for selected date
  const { data: intakes = [], isLoading } = useQuery<WaterIntake[]>({
    queryKey: ['/api/water-intakes/date', format(date, 'yyyy-MM-dd')],
    queryFn: () => 
      fetch(`/api/water-intakes/date/${format(date, 'yyyy-MM-dd')}`).then(res => res.json()),
  });

  // Mutation for adding new water intake
  const addIntakeMutation = useMutation({
    mutationFn: (newIntake: any) => 
      apiRequest('/api/water-intakes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIntake),
      }),
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/water-intakes/date'] });
      toast({
        title: "Water intake added",
        description: `Added ${amount}ml of water`,
      });
      
      // Reset form
      setAmount(250);
      setNotes("");
    },
    onError: (error) => {
      toast({
        title: "Failed to add water intake",
        description: "Please try again.",
        variant: "destructive",
      });
      console.error("Error adding water intake:", error);
    },
  });

  // Calculate total intake for the day
  const totalIntake = intakes.reduce((sum, intake) => sum + intake.amount, 0);
  
  // Calculate progress percentage
  const progressPercentage = hydrationGoal 
    ? Math.min(Math.round((totalIntake / hydrationGoal.dailyGoal) * 100), 100)
    : 0;

  // Handle form submission
  const handleAddIntake = (e: React.FormEvent) => {
    e.preventDefault();
    addIntakeMutation.mutate({
      amount,
      containerType,
      activityType,
      notes: notes || null,
      timestamp: new Date(),
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 container py-6 px-4 md:py-10">
        <div className="flex flex-col gap-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Hydration Dashboard</h1>
              <p className="text-muted-foreground">Track and manage your daily water intake</p>
            </div>
            
            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10 justify-start text-left font-normal w-auto md:w-[240px]">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Hydration Progress Card */}
          <Card className="col-span-3">
            <CardHeader className="pb-2">
              <CardTitle>Daily Hydration Progress</CardTitle>
              <CardDescription>
                Your goal: {hydrationGoal?.dailyGoal ? `${hydrationGoal.dailyGoal}ml` : "Loading..."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">{totalIntake}ml</span>
                    <span className="text-muted-foreground">of {hydrationGoal?.dailyGoal || 0}ml</span>
                  </div>
                  <span className="text-sm font-medium">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Add Intake Form */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Add Water Intake</CardTitle>
                <CardDescription>Record your hydration</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddIntake} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Amount (ml)
                    </label>
                    <Input 
                      type="number" 
                      min={1}
                      value={amount} 
                      onChange={(e) => setAmount(parseInt(e.target.value) || 0)} 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Container Type
                    </label>
                    <Select 
                      value={containerType}
                      onValueChange={setContainerType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select container" />
                      </SelectTrigger>
                      <SelectContent>
                        {containerTypeEnum.enumValues.map(type => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Activity Type
                    </label>
                    <Select 
                      value={activityType} 
                      onValueChange={setActivityType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select activity" />
                      </SelectTrigger>
                      <SelectContent>
                        {activityTypeEnum.enumValues.map(type => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Notes (optional)
                    </label>
                    <Input 
                      type="text" 
                      value={notes} 
                      onChange={(e) => setNotes(e.target.value)} 
                      placeholder="Add notes..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={addIntakeMutation.isPending}
                  >
                    {addIntakeMutation.isPending ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Water Intake
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Water Intake History */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Today's Hydration</CardTitle>
                <CardDescription>
                  Your water intake history for {format(date, "MMMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : intakes.length > 0 ? (
                  <div className="space-y-4">
                    {intakes.map((intake) => (
                      <div 
                        key={intake.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full",
                            "bg-primary/10 text-primary"
                          )}>
                            <Cup className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{intake.amount}ml</p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(intake.timestamp), "h:mm a")} - {intake.containerType.replace('_', ' ')}
                              {intake.activityType && ` (${intake.activityType})`}
                            </p>
                          </div>
                        </div>
                        {intake.notes && (
                          <p className="text-sm text-muted-foreground hidden md:block max-w-[200px] truncate">
                            {intake.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Droplet className="h-12 w-12 text-muted-foreground mb-3 opacity-20" />
                    <h3 className="text-lg font-medium">No water intake recorded</h3>
                    <p className="text-muted-foreground">
                      Start tracking your hydration by adding water intake.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}