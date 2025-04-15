import React from "react";
import { Link } from "wouter";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center space-y-8 py-20">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <Search className="h-10 w-10 text-primary" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              404 - Page Not Found
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
              Sorry, we couldn't find the page you were looking for.
            </p>
          </div>
          
          <Link href="/">
            <Button size="lg" className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      
      <footer className="w-full py-6 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Smart Search
          </p>
        </div>
      </footer>
    </div>
  );
}