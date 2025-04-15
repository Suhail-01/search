import React from "react";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/search/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 pt-12 sm:pt-24 pb-12">
        <div className="w-full max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              AI Smart Search
            </h1>
            <p className="text-lg text-muted-foreground">
              Intelligent auto-complete with real-time AI suggestions
            </p>
          </div>
          
          <SearchBar />
          
          <div className="mt-16 px-4 py-8 bg-muted/30 rounded-lg border border-border">
            <h2 className="text-lg font-medium mb-3">About This Project</h2>
            <p className="text-muted-foreground mb-3">
              This search app features real-time AI-powered suggestions using the Datamuse API.
              The search experience is enhanced with:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Real-time auto-complete suggestions</li>
              <li>Debounced API requests (300ms delay)</li>
              <li>Keyboard navigation (↑ ↓ Enter)</li>
              <li>Highlighting of matched terms</li>
              <li>Trending suggestions</li>
              <li>Dark/light mode toggle</li>
              <li>Mobile responsive design</li>
            </ul>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            Powered by <a href="https://www.datamuse.com/api/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">Datamuse API</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
