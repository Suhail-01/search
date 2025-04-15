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
    // Cricket/IPL related results - Updated with latest 2025 information
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const year = 2025;
    
    results = [
      {
        title: `IPL 2025 Today's Match: Mumbai Indians vs Chennai Super Kings (${todayDate}/${todayMonth}/${year})`,
        description: `LIVE NOW: MI vs CSK match in progress. Rohit Sharma's century puts Mumbai in commanding position. Chennai struggling in run chase after losing early wickets. Watch live streaming and follow ball-by-ball updates.`,
        url: `https://www.cricbuzz.com/cricket-series/6152/indian-premier-league-2025/matches`
      },
      {
        title: `IPL 2025 Points Table: Latest Standings After RCB vs DC Match (${todayDate}/${todayMonth}/${year})`,
        description: `Updated standings: Gujarat Titans (16 pts) on top, followed by Punjab Kings (14 pts), Mumbai Indians (12 pts), Rajasthan Royals (12 pts). Complete table with matches played, run rates, and qualification scenarios.`,
        url: `https://www.iplt20.com/points-table/men/2025`
      },
      {
        title: `TRENDING NOW: Rishabh Pant Sets IPL 2025 Record with Fastest Century`,
        description: `Delhi Capitals captain smashes 100 off just 38 balls against RCB, breaking previous IPL record. Incredible innings included 8 fours and 10 sixes. Watch highlights of the record-breaking performance.`,
        url: `https://sports.ndtv.com/ipl-2025/news/rishabh-pant-fastest-century-ipl-record`
      },
      {
        title: `IPL 2025 Mega Auction Results: Complete List of Players Bought by All Teams`,
        description: `Comprehensive guide to all player acquisitions from this season's auction. Australian all-rounder Cameron Green becomes most expensive player at ₹24 crore. Team-by-team analysis of squad strengths and weaknesses.`,
        url: `https://www.espncricinfo.com/series/indian-premier-league-2025/news/complete-squad-list-ipl-2025`
      }
    ];
  } else if (queryLower.includes('weather')) {
    // Weather related results - updated for 2025
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const year = 2025;
    
    results = [
      {
        title: `${query} Weather - Live Forecast for ${todayMonth}/${todayDate}/${year}`,
        description: `CURRENT CONDITIONS: 72°F (22°C), Clear skies with light breeze. HOURLY FORECAST: Temperature rising to 78°F by noon. Evening forecast shows 30% chance of light showers after 8PM.`,
        url: `https://weather.com/forecast/local/${query}`
      },
      {
        title: `Weather Alert System: New AI-Powered Prediction Models for 2025`,
        description: `Weather services now using advanced neural network models providing 92% accurate forecasts up to 14 days ahead. Download the new app with personalized micro-climate predictions for your exact location.`,
        url: `https://www.accuweather.com/en/new-forecast-technology-2025`
      },
      {
        title: `Summer 2025 Weather Outlook: Above Average Temperatures Expected`,
        description: `Seasonal forecast predicts temperatures 2-3°F above historical averages across most regions. Drought conditions likely to persist in western areas with increased precipitation in northeastern regions.`,
        url: `https://www.noaa.gov/news/summer-2025-outlook`
      },
      {
        title: `Weather Radar Enhancement: New Satellite System Provides Real-Time Storm Tracking`,
        description: `Revolutionary weather monitoring system launched in March 2025 now fully operational. Enhanced radar technology offers minute-by-minute precipitation tracking and improved tornado detection capabilities.`,
        url: `https://www.weather.gov/enhanced-radar-2025`
      }
    ];
  } else if (queryLower.includes('wwe') || queryLower.includes('wrestling')) {
    // WWE related results - updated for 2025
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const year = 2025;
    
    results = [
      {
        title: `WWE WrestleMania 41 Results: New Champions Crowned in Epic Night (April 2025)`,
        description: `Complete results from WrestleMania 41 in Las Vegas. Randy Orton makes shocking return to defeat Roman Reigns for Universal Championship. Full event recap with match ratings and post-event analysis.`,
        url: `https://www.wwe.com/shows/wrestlemania/wrestlemania-41-results`
      },
      {
        title: `BREAKING: WWE SmackDown Moving to Streaming Platform in August 2025`,
        description: `WWE announces major broadcasting change for SmackDown starting August 1st. New partnership with streaming service includes exclusive content and interactive features for subscribers.`,
        url: `https://www.cbssports.com/wwe/news/wwe-smackdown-streaming-deal-announced`
      },
      {
        title: `Tonight's WWE Raw Card (${todayMonth}/${todayDate}/${year}): Championship Matches and Returns`,
        description: `Full preview of tonight's Monday Night Raw featuring World Heavyweight Championship match between Finn Balor and Gunther. Special appearance by John Cena expected. How to watch and match predictions.`,
        url: `https://wrestletalk.com/news/wwe-raw-preview-tonight`
      },
      {
        title: `WWE 2025 Draft Results: Complete Roster Changes and Surprise Picks`,
        description: `All roster moves from the 2025 WWE Draft. Raw and SmackDown rosters completely reshuffled with NXT call-ups. Winners and losers from draft decisions and upcoming feuds to watch.`,
        url: `https://www.sportskeeda.com/wwe/2025-wwe-draft-complete-results`
      }
    ];
  } else if (queryLower.includes('climate') || queryLower.includes('environment')) {
    // Climate change related results - updated for 2025
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const year = 2025;
    
    results = [
      {
        title: `2025 Climate Assessment: Global Temperatures Reach New Record High`,
        description: `BREAKING: Latest data confirms 2024 surpassed 2023 as hottest year on record, marking 1.7°C above pre-industrial levels. Scientists warn critical tipping points may be approaching faster than previously predicted.`,
        url: `https://climate.nasa.gov/vital-signs/global-temperature/`
      },
      {
        title: `COP30 Summit: Nations Agree to Historic Carbon Reduction Targets for 2025-2030`,
        description: `Major breakthrough at climate conference as 198 countries endorse binding emissions targets. New framework includes financial mechanisms to support developing nations and accelerated timeline for fossil fuel phase-out.`,
        url: `https://www.un.org/climate-action/cop30-agreement`
      },
      {
        title: `EU's Green Transition Achievement: 45% Renewable Energy Milestone Reached`,
        description: `European Union announces renewable sources now account for 45% of total energy production, three years ahead of schedule. Success attributed to massive offshore wind expansion and innovative energy storage solutions.`,
        url: `https://ec.europa.eu/environment/climate-action/renewable-energy-report-2025`
      },
      {
        title: `Climate Adaptation Report 2025: Communities Implementing Resilience Strategies`,
        description: `New study examines successful climate adaptation measures in vulnerable regions. Case studies highlight innovative approaches to flood protection, drought management, and heat mitigation in urban areas.`,
        url: `https://www.ipcc.ch/report/adaptation-resilience-2025/`
      },
      {
        title: `Carbon Capture Technology Breakthrough Announced Today (${todayMonth}/${todayDate}/${year})`,
        description: `Scientists reveal new process that removes atmospheric CO2 at 3x efficiency of previous methods with 70% lower costs. Technology demonstration projects launching in multiple countries this year with industrial scaling planned for 2026.`,
        url: `https://www.sciencedaily.com/releases/2025/04/2504150832.htm`
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
              
              {/* Add "People also ask" section like Google with contextual questions */}
              <div className="border rounded-lg p-4 my-6">
                <h3 className="text-lg font-medium mb-3">People also ask</h3>
                <div className="space-y-2">
                  {(() => {
                    // Generate context-specific questions based on query content
                    let questions = [];
                    
                    if (query.toLowerCase().includes('ipl') || query.toLowerCase().includes('cricket')) {
                      questions = [
                        `When is the next IPL match in 2025?`,
                        `Which team is leading the IPL 2025 points table?`,
                        `Who is the highest run-scorer in IPL 2025?`,
                        `What are the IPL 2025 playoff qualification scenarios?`
                      ];
                    } else if (query.toLowerCase().includes('wwe') || query.toLowerCase().includes('wrestling')) {
                      questions = [
                        `When is the next WWE pay-per-view event in 2025?`,
                        `Who is the current WWE Universal Champion?`,
                        `What are the upcoming WWE events in 2025?`,
                        `Why did WWE move SmackDown to streaming platforms?`
                      ];
                    } else if (query.toLowerCase().includes('climate') || query.toLowerCase().includes('environment')) {
                      questions = [
                        `What are the latest climate change statistics for 2025?`,
                        `How has global temperature changed in the last decade?`,
                        `What countries are meeting their carbon reduction targets?`,
                        `What new climate technologies were developed in 2025?`
                      ];
                    } else if (query.toLowerCase().includes('weather')) {
                      questions = [
                        `What is the forecast for this weekend?`,
                        `How accurate are the new weather prediction models?`,
                        `Will there be severe weather in my area soon?`,
                        `How has the weather pattern changed in 2025?`
                      ];
                    } else {
                      // Default questions for any other query
                      questions = [
                        `What is the best resource for ${query}?`,
                        `How does ${query} work?`,
                        `Why is ${query} important in 2025?`,
                        `What are the latest developments in ${query}?`
                      ];
                    }
                    
                    return questions.map((question, i) => (
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
                    ));
                  })()}
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