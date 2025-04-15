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

// Helper function to get the domain from a URL
const getDomain = (url: string) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return 'example.com';
  }
};

// Function to generate dynamic search results based on the query
function generateSearchResults(query: string): SearchResult[] {
  if (!query.trim()) return [];
  
  // Lower case the query for case-insensitive comparisons
  const queryLower = query.toLowerCase();
  
  // Prepare different types of results based on the query content
  let results: SearchResult[] = [];
  
  if (queryLower.includes('ipl') || queryLower.includes('cricket')) {
    // Cricket/IPL related results
    results = [
      {
        title: `IPL 2024: Latest Scores, Schedule and Team Rankings`,
        description: `Get today's IPL match updates, live scores, team standings, and upcoming fixtures for the 2024 Indian Premier League season. Find player stats and team performance analysis.`,
        url: `https://www.cricbuzz.com/cricket-series/5945/indian-premier-league-2024`
      },
      {
        title: `MI vs CSK Highlights: Chennai Super Kings win by 20 runs`,
        description: `Watch full match highlights of Mumbai Indians vs Chennai Super Kings. Ravindra Jadeja's all-round performance helps CSK secure crucial victory in yesterday's thrilling encounter.`,
        url: `https://www.iplt20.com/matches/results`
      },
      {
        title: `IPL 2024 Points Table: RCB moves to 4th position after win against DC`,
        description: `Updated IPL standings after yesterday's matches. Royal Challengers Bangalore climbs to playoff position with impressive run chase. Check the complete points table and playoff scenarios.`,
        url: `https://sports.ndtv.com/ipl-2024/points-table`
      }
    ];
  } else if (queryLower.includes('weather')) {
    // Weather related results
    results = [
      {
        title: `${query} - Current Weather Forecast, Hourly & 10-Day Outlook`,
        description: `See the latest weather conditions for your area. Today's forecast: Partly cloudy with high of 75°F (24°C). 20% chance of precipitation. Wind: 5-10 mph.`,
        url: `https://weather.com/forecast/local/${query}`
      },
      {
        title: `Severe Weather Alert: Thunderstorms Expected This Weekend`,
        description: `Weather service issues advisory for potential severe storms in multiple regions. Prepare for heavy rainfall and possible flash flooding in low-lying areas.`,
        url: `https://www.accuweather.com/en/weather-news`
      },
      {
        title: `Climate Patterns: How ${query} Weather Has Changed Over 50 Years`,
        description: `Research shows significant shifts in seasonal patterns and temperature averages. Scientists track climate indicators including precipitation levels and extreme weather events.`,
        url: `https://www.climate.gov/weather-trends`
      }
    ];
  } else if (queryLower.includes('wwe') || queryLower.includes('wrestling')) {
    // WWE related results
    results = [
      {
        title: `WWE WrestleMania 40 Results: Complete Match Card Outcomes and Highlights`,
        description: `Cody Rhodes defeats Roman Reigns to become new WWE Universal Champion. Full recap of all matches, surprise appearances, and biggest moments from the two-night event.`,
        url: `https://www.wwe.com/shows/wrestlemania/wrestlemania-40-results`
      },
      {
        title: `WWE Raw Results: Updated Matches and Top Moments from Last Night`,
        description: `Catch up on all the action from Monday Night Raw. Drew McIntyre confronts World Heavyweight Champion. Two championship matches announced for next week's show.`,
        url: `https://www.cbssports.com/wwe/news/`
      },
      {
        title: `Seth Rollins Injury Update: Timeline for WWE Superstar's Return`,
        description: `Former champion provides latest on recovery progress after surgery. Medical team estimates potential return date. Impact on upcoming WWE premium live events and storylines.`,
        url: `https://wrestlingnews.com/seth-rollins-injury-status`
      }
    ];
  } else if (queryLower.includes('climate') || queryLower.includes('environment')) {
    // Climate change related results
    results = [
      {
        title: `Climate Change: Latest Data Shows Accelerating Global Temperature Rise`,
        description: `New research confirms 2023 as hottest year on record with 1.5°C increase above pre-industrial levels. Scientists warn of potential tipping points in climate systems if trends continue.`,
        url: `https://climate.nasa.gov/evidence/`
      },
      {
        title: `UN Climate Report: Urgent Action Needed to Limit Warming to 1.5°C`,
        description: `IPCC findings show current policies insufficient to meet Paris Agreement goals. Report outlines critical steps needed in next decade to prevent worst climate scenarios.`,
        url: `https://www.ipcc.ch/reports/`
      },
      {
        title: `How Climate Change Is Affecting Weather Patterns Worldwide`,
        description: `Scientists link increasing frequency of extreme weather events to climate change. Studies show connections between warming temperatures and intensified hurricanes, droughts, and flooding.`,
        url: `https://www.noaa.gov/climate-change-impacts`
      },
      {
        title: `Renewable Energy Growth Accelerates in Response to Climate Crisis`,
        description: `Solar and wind capacity doubled in past five years. Countries announce ambitious targets to reduce carbon emissions. Investment in clean technology reaches record levels.`,
        url: `https://www.iea.org/topics/renewables`
      }
    ];
  } else {
    // Generic results for other queries
    results = [
      {
        title: `${query} - Latest Information, Research and Complete Guide`,
        description: `Comprehensive overview of ${query} with expert analysis and insights. Find authoritative information, recent developments, and frequently asked questions all in one place.`,
        url: `https://en.wikipedia.org/wiki/${query.replace(/\s+/g, '_')}`
      },
      {
        title: `Today's Top News about ${query}: Breaking Updates`,
        description: `Stay informed with the latest developments, breaking news, and trending stories related to ${query}. Updated hourly with verified information from trusted sources.`,
        url: `https://news.google.com/search?q=${query}`
      },
      {
        title: `${query}: Definition, Examples & Practical Applications`,
        description: `Clear explanations of ${query} with real-world examples and practical applications. Includes related concepts, historical background, and modern interpretations.`,
        url: `https://www.britannica.com/search?query=${query}`
      },
      {
        title: `"${query}" Research: Recent Studies and Scientific Findings`,
        description: `Review of latest research publications, academic studies, and scientific breakthroughs related to ${query}. Access peer-reviewed articles and expert analysis.`,
        url: `https://scholar.google.com/scholar?q=${query}`
      }
    ];
  }
  
  // Add a YouTube result for any query
  results.push({
    title: `${query} - Top Videos and Channels | YouTube`,
    description: `Watch videos, tutorials, and documentaries about ${query}. Find popular creators, trending content, and educational material all related to your search topic.`,
    url: `https://www.youtube.com/results?search_query=${query.replace(/\s+/g, '+')}`
  });
  
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
                  <div className="flex gap-2 items-center">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-40" /> 
                  </div>
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            // Results list - Google style
            <div className="space-y-8">
              {results.map((result, index) => {
                const domain = getDomain(result.url);
                // Get first letter of domain for favicon placeholder
                const domainFirstLetter = domain.charAt(0).toUpperCase();
                
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                        {domainFirstLetter}
                      </div>
                      <span>{domain}</span>
                    </div>
                    <a href={result.url} target="_blank" rel="noopener noreferrer" className="block">
                      <h2 className="text-xl font-medium text-primary hover:underline">
                        {highlightText(result.title, query)}
                      </h2>
                    </a>
                    <div className="text-xs text-green-700 dark:text-green-500 mb-1">{result.url}</div>
                    <p className="text-sm text-muted-foreground">
                      {highlightText(result.description, query)}
                    </p>
                  </div>
                );
              })}
              
              {/* Add "People also ask" section like Google */}
              <div className="border rounded-lg p-4 my-6">
                <h3 className="text-lg font-medium mb-3">People also ask</h3>
                <div className="space-y-2">
                  {["What is the best resource for " + query + "?", 
                    "How does " + query + " work?", 
                    "Why is " + query + " important?"].map((question, i) => (
                    <div key={i} className="border-b pb-2 last:border-b-0">
                      <button className="flex justify-between items-center w-full text-left hover:bg-muted/50 rounded p-2">
                        <span>{question}</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
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