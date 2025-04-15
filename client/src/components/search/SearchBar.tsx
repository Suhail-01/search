import React, { useState, useRef, KeyboardEvent, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchSuggestions from "./SearchSuggestions";
import TrendingSuggestions from "./TrendingSuggestions";
import { useSuggestions } from "@/hooks/use-suggestions";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { suggestions, loading, error } = useSuggestions(query);
  
  // Clear selection when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };
  
  const handleClearClick = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);
    // In a real application, you might want to trigger a search here
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // No suggestions or dropdown not open
    if (!suggestions.length || !isOpen) return;
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
        
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
        
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          setQuery(suggestions[selectedIndex].word);
          setIsOpen(false);
        }
        break;
        
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    // In a real application, you might want to navigate to a search results page
    // or perform a search action
    console.log(`Searching for: ${query}`);
  };
  
  return (
    <div className="relative w-full">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search anything..."
            className="pr-10 pl-10 py-6 h-auto text-lg shadow-sm"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setIsOpen(true)}
            aria-label="Search"
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            aria-expanded={isOpen}
            role="combobox"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={handleClearClick}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button 
          type="submit" 
          className="mt-4 w-full sm:w-auto"
        >
          Search
        </Button>
      </form>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background shadow-md rounded-md border border-border overflow-hidden z-10">
          {loading ? (
            <div className="py-3 px-4 text-center text-muted-foreground">
              Loading suggestions...
            </div>
          ) : error ? (
            <div className="py-3 px-4 text-center text-red-500">
              Error loading suggestions
            </div>
          ) : suggestions.length > 0 ? (
            <SearchSuggestions 
              suggestions={suggestions} 
              query={query}
              selectedIndex={selectedIndex}
              onSuggestionClick={handleSuggestionClick}
            />
          ) : query ? (
            <div className="py-3 px-4 text-center text-muted-foreground">
              No suggestions found
            </div>
          ) : (
            <TrendingSuggestions onSuggestionClick={handleSuggestionClick} />
          )}
        </div>
      )}
    </div>
  );
}
