import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/search/SearchBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { highlightText } from "@/utils/highlight-text";

// Type definition for search result
interface SearchResult {
  title: string;
  description: string;
  url: string;
}

// Function to generate mock search results based on the query
function generateSearchResults(query: string): SearchResult[] {
  if (!query.trim()) return [];
  
  // Create a few search results based on the query
  const results: SearchResult[] = [
    {
      title: `${query} - Definition, Meaning & Usage`,
      description: `Learn about ${query} and its various meanings and usages. Find comprehensive information and examples to enhance your understanding.`,
      url: `https://example.com/definition-${query}`
    },
    {
      title: `The Complete Guide to ${query}`,
      description: `Explore everything you need to know about ${query}. This comprehensive guide covers all aspects from basics to advanced topics.`,
      url: `https://example.com/guide-${query}`
    },
    {
      title: `Latest News on ${query}`,
      description: `Stay updated with the latest news, developments, and trending topics related to ${query}. Get accurate and timely information.`,
      url: `https://example.com/news-${query}`
    },
    {
      title: `${query} Resources and Tools`,
      description: `Access free resources, tools, and utilities for ${query}. Find helpful materials to improve your knowledge and skills.`,
      url: `https://example.com/resources-${query}`
    },
    {
      title: `Top 10 Facts About ${query} You Should Know`,
      description: `Discover interesting and surprising facts about ${query} that most people don't know. Expand your knowledge with these insights.`,
      url: `https://example.com/facts-${query}`
    }
  ];
  
  return results;
}

export default function SearchResults() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Parse the query from the URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryParam = searchParams.get("q") || "";
    setQuery(queryParam);
  }, []);
  
  // Generate search results based on the query
  useEffect(() => {
    if (query) {
      setLoading(true);
      // Simulate API delay
      const timer = setTimeout(() => {
        setResults(generateSearchResults(query));
        setLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [query]);
  
  // Handle a new search from the results page
  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() === query.trim()) return;
    
    setLocation(`/search?q=${encodeURIComponent(newQuery)}`);
    setQuery(newQuery);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 container py-6 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Search bar at the top */}
          <div className="mb-8">
            <SearchBar initialQuery={query} onSearch={handleSearch} />
          </div>
          
          {/* Search information */}
          <div className="mb-6 text-sm text-muted-foreground">
            {!loading && results.length > 0 && (
              <p>About {results.length} results for "{query}"</p>
            )}
          </div>
          
          {/* Search results */}
          {loading ? (
            // Loading skeleton
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            // Results list
            <div className="space-y-8">
              {results.map((result, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    {result.url}
                  </div>
                  <h2 className="text-xl font-medium text-primary hover:underline">
                    {highlightText(result.title, query)}
                  </h2>
                  <p className="text-muted-foreground">
                    {highlightText(result.description, query)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            // No results
            <div className="text-center py-12">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">No results found</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find any results for "{query}". Please try a different search.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setLocation("/")}
                className="mx-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <footer className="w-full py-6 bg-background border-t mt-8">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Smart Search
          </p>
        </div>
      </footer>
    </div>
  );
}