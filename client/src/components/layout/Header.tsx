import React from "react";
import { Link } from "wouter";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
      <div className="container flex h-14 items-center px-4">
        <div className="flex items-center space-x-2 mr-4">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <Search className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">AI Smart Search</span>
            </div>
          </Link>
        </div>
        
        <div className="flex-1" />
        
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}