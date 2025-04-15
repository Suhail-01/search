import React from "react";
import { Search, ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/search/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-36">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI-Powered Search <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Auto-Complete</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Smart search suggestions powered by the Datamuse API. Type, select with keyboard navigation, and find what you're looking for faster.
                </p>
              </div>
              
              <div className="w-full max-w-2xl mx-auto pt-8">
                <SearchBar />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Smart Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need for a modern search experience
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {/* Feature 1 */}
              <Card>
                <CardContent className="flex flex-col items-center p-6 pt-8">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Real-time Suggestions</h3>
                  <p className="text-center text-muted-foreground">
                    Instant word suggestions from the Datamuse API as you type
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 2 */}
              <Card>
                <CardContent className="flex flex-col items-center p-6 pt-8">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M3 13h4" />
                      <path d="M3 8h4" />
                      <path d="M13 16v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1z" />
                      <path d="M8 16v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                      <path d="M18 8V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z" />
                      <path d="M8 8V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Keyboard Navigation</h3>
                  <p className="text-center text-muted-foreground">
                    Navigate suggestions with arrow keys and select with Enter
                  </p>
                </CardContent>
              </Card>
              
              {/* Feature 3 */}
              <Card>
                <CardContent className="flex flex-col items-center p-6 pt-8">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a8 8 0 0 0 0 16" />
                      <path d="M12 2v2" />
                      <path d="M12 14v2" />
                      <path d="M9 2.8l1 1.73" />
                      <path d="M14 14.47l1 1.73" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Dark Mode</h3>
                  <p className="text-center text-muted-foreground">
                    Toggle between light and dark themes with one click
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* API Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Powered by Datamuse API
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    This application leverages the free Datamuse API for word suggestions, helping you find the words you're looking for faster.
                  </p>
                </div>
                <div>
                  <a 
                    href="https://api.datamuse.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="mt-4">
                      Learn More About Datamuse API
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-xl overflow-hidden bg-muted p-2 w-full max-w-md">
                  <div className="bg-background p-4 rounded-lg">
                    <code className="text-sm font-mono text-muted-foreground">https://api.datamuse.com/sug?s=</code>
                    <code className="text-sm font-mono text-primary">your_query</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="w-full py-6 bg-background border-t">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Smart Search. Built with React, Shadcn UI, and Datamuse API.
          </p>
        </div>
      </footer>
    </div>
  );
}