import { useCallback, useEffect, useMemo, useState } from "react";
import { profile, publications } from "../data/profileData.js";

const CACHE_KEY = "macos-portfolio-live-dashboard-v1";
const CACHE_TTL = 30 * 60 * 1000;
const VANCOUVER = {
  latitude: 49.2827,
  longitude: -123.1207,
  timezone: "America/Vancouver"
};

function readCache() {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.timestamp || Date.now() - parsed.timestamp > CACHE_TTL) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
  } catch {
    // Storage can be disabled in private browsing. The dashboard still works without caching.
  }
}

function normalizeTitle(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function fetchGitHub() {
  const headers = {
    Accept: "application/vnd.github+json"
  };
  const [user, repos] = await Promise.all([
    fetchJson(`https://api.github.com/users/${profile.githubUsername}`, { headers }),
    fetchJson(`https://api.github.com/users/${profile.githubUsername}/repos?per_page=30&sort=updated`, { headers })
  ]);

  const visibleRepos = repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 8);

  const languageEntries = await Promise.all(
    visibleRepos.map(async (repo) => {
      try {
        return [repo.name, await fetchJson(repo.languages_url, { headers })];
      } catch {
        return [repo.name, repo.language ? { [repo.language]: 1 } : {}];
      }
    })
  );

  const languageTotals = languageEntries.reduce((acc, [, languages]) => {
    Object.entries(languages).forEach(([language, bytes]) => {
      acc[language] = (acc[language] || 0) + bytes;
    });
    return acc;
  }, {});

  const languages = Object.entries(languageTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return {
    profileUrl: user.html_url,
    publicRepos: user.public_repos || repos.length,
    followers: user.followers || 0,
    stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    forks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
    repos: visibleRepos.map((repo) => ({
      name: repo.name,
      language: repo.language || "Mixed",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      url: repo.html_url
    })),
    languages
  };
}

async function fetchWeather() {
  const params = new URLSearchParams({
    latitude: VANCOUVER.latitude,
    longitude: VANCOUVER.longitude,
    current: "temperature_2m,wind_speed_10m,precipitation",
    hourly: "temperature_2m,precipitation_probability",
    forecast_days: "2",
    timezone: VANCOUVER.timezone
  });
  const data = await fetchJson(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
  const hours = data.hourly?.time?.slice(0, 48).map((time, index) => ({
    time,
    temperature: data.hourly.temperature_2m[index],
    precipitationProbability: data.hourly.precipitation_probability[index]
  })) || [];

  return {
    location: "Vancouver",
    timezone: data.timezone,
    current: data.current,
    hours
  };
}

async function fetchPublicationMetric(publication) {
  if (publication.doi) {
    const result = await fetchJson(`https://api.crossref.org/works/${encodeURIComponent(publication.doi)}`);
    const item = result.message;
    return {
      title: publication.title,
      citations: item["is-referenced-by-count"],
      doi: item.DOI,
      matched: true
    };
  }

  const params = new URLSearchParams({
    "query.title": publication.title,
    rows: "5",
    select: "DOI,title,author,is-referenced-by-count"
  });
  const result = await fetchJson(`https://api.crossref.org/works?${params.toString()}`);
  const exact = result.message.items.find((item) => {
    const title = item.title?.[0] || "";
    const hasDroobi = item.author?.some((author) => normalizeTitle(author.family || "") === "droobi");
    return normalizeTitle(title) === normalizeTitle(publication.title) && hasDroobi;
  });

  if (!exact) {
    return {
      title: publication.title,
      matched: false
    };
  }

  return {
    title: publication.title,
    citations: exact["is-referenced-by-count"],
    doi: exact.DOI,
    matched: true
  };
}

async function fetchResearch() {
  const metrics = await Promise.all(
    publications.map(async (publication) => {
      try {
        return fetchPublicationMetric(publication);
      } catch {
        return {
          title: publication.title,
          matched: false
        };
      }
    })
  );

  return metrics;
}

async function fetchIss() {
  const data = await fetchJson("https://api.wheretheiss.at/v1/satellites/25544");
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    altitude: data.altitude,
    velocity: data.velocity,
    visibility: data.visibility,
    timestamp: data.timestamp
  };
}

async function fetchQuakes() {
  const data = await fetchJson(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"
  );
  const features = (data.features || []).slice(0, 8).map((feature) => ({
    id: feature.id,
    magnitude: feature.properties.mag,
    place: feature.properties.place,
    time: feature.properties.time,
    url: feature.properties.url,
    depth: feature.geometry?.coordinates?.[2] ?? null
  }));

  return {
    count: data.metadata?.count ?? features.length,
    features
  };
}

async function fetchSpaceNews() {
  const data = await fetchJson("https://api.spaceflightnewsapi.net/v4/articles/?limit=5");
  return (data.results || []).map((article) => ({
    id: article.id,
    title: article.title,
    source: article.news_site,
    url: article.url,
    publishedAt: article.published_at
  }));
}

async function fetchDashboardData() {
  const [github, weather, research, quakes, news] = await Promise.allSettled([
    fetchGitHub(),
    fetchWeather(),
    fetchResearch(),
    fetchQuakes(),
    fetchSpaceNews()
  ]);

  return {
    github: github.status === "fulfilled" ? github.value : null,
    weather: weather.status === "fulfilled" ? weather.value : null,
    research: research.status === "fulfilled" ? research.value : [],
    quakes: quakes.status === "fulfilled" ? quakes.value : null,
    news: news.status === "fulfilled" ? news.value : [],
    errors: {
      github: github.status === "rejected" ? github.reason.message : null,
      weather: weather.status === "rejected" ? weather.reason.message : null,
      research: research.status === "rejected" ? research.reason.message : null,
      quakes: quakes.status === "rejected" ? quakes.reason.message : null,
      news: news.status === "rejected" ? news.reason.message : null
    },
    updatedAt: new Date().toISOString()
  };
}

const ISS_POLL_MS = 5000;

function useLiveDashboardData() {
  const cached = useMemo(() => readCache(), []);
  const [refreshId, setRefreshId] = useState(0);
  const [state, setState] = useState({
    status: cached ? "cached" : "loading",
    data: cached?.data || null,
    error: null
  });
  const [iss, setIss] = useState(null);

  const refresh = useCallback(() => setRefreshId((id) => id + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchDashboardData();
        if (cancelled) return;
        writeCache(data);
        setState({ status: "ready", data, error: null });
      } catch (error) {
        if (cancelled) return;
        setState((current) => ({
          status: current.data ? "cached" : "error",
          data: current.data,
          error: error.message
        }));
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [refreshId]);

  // Real-time loop: the ISS moves ~7.6 km/s, so re-poll its position frequently.
  useEffect(() => {
    let cancelled = false;
    let timer;

    async function tick() {
      try {
        const position = await fetchIss();
        if (!cancelled) setIss(position);
      } catch {
        // Keep the last known position if a single poll fails.
      }
      if (!cancelled) timer = window.setTimeout(tick, ISS_POLL_MS);
    }

    tick();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return { ...state, iss, refresh };
}

export default useLiveDashboardData;
