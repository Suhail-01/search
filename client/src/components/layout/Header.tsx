import React from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <div className="flex items-center space-x-2 mr-4">
          <Search className="h-5 w-5 text-primary" />
          <span className="font-medium hidden sm:inline-block">AI Smart Search</span>
        </div>
        
        <div className="flex-1" />
        
        <div className="flex items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              GitHub
            </a>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
