// Define the shape of suggestion items returned from the API
export interface Suggestion {
  word: string;
  score: number;
}

/**
 * Fetches auto-complete suggestions from the Datamuse API
 * 
 * @param query The search query to get suggestions for
 * @returns A promise that resolves to an array of suggestions
 */
export async function getSuggestions(query: string): Promise<Suggestion[]> {
  if (!query.trim()) {
    return [];
  }
  
  try {
    const response = await fetch(`https://api.datamuse.com/sug?s=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch suggestions: ${response.status} ${response.statusText}`);
    }
    
    const data: Suggestion[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
}
