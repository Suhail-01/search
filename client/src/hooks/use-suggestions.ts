import { useState, useEffect } from "react";
import { getSuggestions, Suggestion } from "@/lib/datamuse";
import { useDebounce } from "./use-debounce";

export function useSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Debounce the query to avoid too many API calls
  const debouncedQuery = useDebounce(query, 300);
  
  useEffect(() => {
    const fetchSuggestions = async () => {
      // Don't fetch if the query is empty
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const results = await getSuggestions(debouncedQuery);
        setSuggestions(results);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch suggestions"));
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSuggestions();
  }, [debouncedQuery]);
  
  return { suggestions, loading, error };
}
