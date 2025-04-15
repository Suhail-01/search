import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Droplet, ArrowRight, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";

export default function Home() {
  // Fetch hydration goal to display on home page
  const { data: hydrationGoal } = useQuery({
    queryKey: ['/api/hydration-goal'],
    // Default fetcher is already set up
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                    Stay Hydrated on Every Adventure
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Track your water intake, set goals, and receive reminders to stay hydrated during all your outdoor activities.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button size="lg" className="gap-1.5">
                      Start Tracking
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button size="lg" variant="outline">
                      Set Your Goals
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-b from-primary/20 to-primary/5 p-8">
                  <Droplet className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary h-48 w-48 opacity-70" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Features For Outdoor Enthusiasts
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to stay hydrated while exploring the outdoors
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {/* Feature 1 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Droplet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Track Water Intake</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Record water intake with different container types: bottles, hydration packs, cups
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mountain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold">Activity Tracking</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Tag your hydration entries with different outdoor activities
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-6 w-6 text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Hydration Reminders</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Set customizable reminders to drink water throughout your adventure
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="w-full py-6 bg-background border-t">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HydroTracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}