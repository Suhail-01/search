import React from "react";

/**
 * Highlights portions of text that match a query
 * 
 * @param text - The full text to display
 * @param query - The search query to highlight
 * @returns React elements with highlighted matching text
 */
export function highlightText(text: string, query: string) {
  if (!query.trim()) {
    return text;
  }
  
  try {
    // Using case-insensitive regular expression to find matches
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) ? (
            <span key={i} className="bg-yellow-200 dark:bg-yellow-800 font-medium">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  } catch (e) {
    // Fallback in case of regex error
    console.error("Error highlighting text:", e);
    return text;
  }
}
