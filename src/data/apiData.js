export const apiStack = [
  {
    name: "GitHub REST",
    method: "GET",
    endpoint: "/users/:username, /repos, /languages",
    purpose: "Public repo activity, language totals, stars, forks, and recent commits.",
    resilience: "Public endpoints only, filters out forks, and stays useful if a language request fails."
  },
  {
    name: "wheretheiss.at",
    method: "GET",
    endpoint: "/v1/satellites/25544",
    purpose: "Real-time International Space Station latitude, longitude, altitude, and velocity \u2014 re-polled every 5 seconds.",
    resilience: "Keeps the last known position if a single poll fails, so the live track never blanks out."
  },
  {
    name: "Open-Meteo",
    method: "GET",
    endpoint: "/v1/forecast?current&hourly",
    purpose: "Vancouver weather, hourly temperature, rain probability, and wind.",
    resilience: "Small response fields, cached dashboard state, and a simple fallback while values reload."
  },
  {
    name: "USGS Earthquakes",
    method: "GET",
    endpoint: "/feed/v1.0/summary/2.5_day.geojson",
    purpose: "Global seismic events (M2.5+) from the last 24 hours \u2014 real sensor-network telemetry.",
    resilience: "Reads a pre-aggregated GeoJSON feed and degrades to a quiet state when unavailable."
  },
  {
    name: "Spaceflight News",
    method: "GET",
    endpoint: "/v4/articles?limit=5",
    purpose: "Latest robotics, spaceflight, and engineering headlines for live context.",
    resilience: "Hides the widget cleanly if the feed is empty or unreachable."
  },
  {
    name: "Crossref Works",
    method: "GET",
    endpoint: "/works?query.title=...",
    purpose: "Publication metadata and citation counts when the match is unambiguous.",
    resilience: "Falls back to static publication records when the match is not clear, so the page stays honest."
  },
  {
    name: "Browser Cache",
    method: "local",
    endpoint: "localStorage:live-dashboard",
    purpose: "Keeps the dashboard useful when a public API is slow, rate-limited, or temporarily down.",
    resilience: "Stores data briefly, refreshes in the background, and still works if storage is disabled."
  }
];

export const apiPrinciples = [
  "Fetch only what the interface needs.",
  "Poll fast for real-time data, cache the rest.",
  "Keep failures inside the affected widget.",
  "Show cached data before fresh data arrives."
];
