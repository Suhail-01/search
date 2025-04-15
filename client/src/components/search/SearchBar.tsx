import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSuggestions } from "@/hooks/use-suggestions";
import SearchSuggestions from "./SearchSuggestions";
import TrendingSuggestions from "./TrendingSuggestions";

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { suggestions, loading } = useSuggestions(query);
  
  const showSuggestions = isFocused && (suggestions.length > 0 || query.trim() === "");
  
  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Handle arrow key navigation
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        // Use the selected suggestion
        handleSuggestionClick(suggestions[selectedIndex].word);
        // Submit the form or perform search
        handleSearch();
      } else {
        // Just search with the current query
        handleSearch();
      }
    } else if (e.key === "Escape") {
      // Close suggestions and blur input
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };
  
  const handleSearch = () => {
    if (query.trim()) {
      console.log(`Searching for: ${query}`);
      // Here you would typically redirect to a search results page or perform a search
      // For this example, we'll just log the query
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
    // Optional: automatically perform search on selection
    // handleSearch();
  };
  
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay hiding suggestions to allow for clicks
            setTimeout(() => setIsFocused(false), 200);
          }}
          onKeyDown={handleKeyDown}
          className="pr-12 h-12 text-base rounded-full border-2 focus-visible:ring-2 focus-visible:ring-offset-0"
        />
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="absolute right-1"
          onClick={handleSearch}
        >
          <Search className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
      
      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute w-full mt-2 rounded-lg border bg-background shadow-lg z-50 overflow-hidden">
          {query.trim() ? (
            <SearchSuggestions 
              suggestions={suggestions} 
              query={query}
              selectedIndex={selectedIndex}
              onSuggestionClick={handleSuggestionClick}
            />
          ) : (
            <TrendingSuggestions onSuggestionClick={handleSuggestionClick} />
          )}
        </div>
      )}
    </div>
  );
}