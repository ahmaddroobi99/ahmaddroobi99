import {
  ArrowUpRight,
  CloudSun,
  Code2,
  FlaskConical,
  MapPinned,
  Newspaper,
  RefreshCw,
  Satellite,
  Waves
} from "lucide-react";
import ApiStackPanel from "../components/ApiStackPanel.jsx";
import PageHero from "../components/PageHero.jsx";
import Section from "../components/Section.jsx";
import { publications } from "../data/profileData.js";
import useLiveDashboardData from "../hooks/useLiveDashboardData.js";
import { useEffect, useState } from "react";

const chartColors = ["#0e8bbf", "#1bbf8f", "#ff8a3d", "#7c5cff", "#34c7e6", "#ff6b6b"];

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value || 0);
}

function formatTime(value) {
  if (!value) return "Unavailable";
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function daysAgo(value) {
  const difference = Date.now() - new Date(value).getTime();
  return Math.max(0, Math.round(difference / 86_400_000));
}

function timeAgo(value) {
  if (!value) return "";
  const seconds = Math.round((Date.now() - new Date(value).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function makeLinePoints(values, width = 320, height = 116) {
  if (!values.length) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = values.length === 1 ? width / 2 : (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 18) - 9;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function WidgetHeader({ icon: Icon, label, title, onAsk }) {
  return (
    <div className="widget-header">
      <span>
        <Icon size={18} aria-hidden="true" />
        {label}
      </span>
      <div className="widget-header-title">
        <h3>{title}</h3>
        {onAsk && (
          <button type="button" className="widget-action-button" onClick={onAsk}>
            Ask Copilot
          </button>
        )}
      </div>
    </div>
  );
}

function DonutChart({ items }) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  let cursor = 0;
  const gradient = items.length
    ? items.map((item, index) => {
        const start = cursor;
        const end = cursor + (item.value / total) * 100;
        cursor = end;
        return `${chartColors[index % chartColors.length]} ${start}% ${end}%`;
      }).join(", ")
    : "#d2d2d7 0% 100%";

  return (
    <div className="donut-wrap">
      <div className="donut-chart" style={{ background: `conic-gradient(${gradient})` }}>
        <span>{items.length}</span>
      </div>
      <div className="chart-legend">
        {items.map((item, index) => (
          <span key={item.name}>
            <i style={{ background: chartColors[index % chartColors.length] }} />
            {item.name}
          </span>
        ))}
        {!items.length && <span>No language data yet</span>}
      </div>
    </div>
  );
}

function GitHubWidget({ github, onAsk }) {
  if (!github) {
    return (
      <article className="dashboard-widget">
        <WidgetHeader icon={Code2} label="GitHub" title="Coding Activity" onAsk={onAsk} />
        <p className="widget-muted">GitHub data is unavailable right now. Cached or live values will appear after the API responds.</p>
      </article>
    );
  }

  return (
    <article className="dashboard-widget dashboard-widget-wide">
      <WidgetHeader icon={Code2} label="GitHub" title="Coding Activity" onAsk={onAsk} />
      <div className="metric-grid">
        <span><strong>{formatNumber(github.publicRepos)}</strong> Public repos</span>
        <span><strong>{formatNumber(github.stars)}</strong> Stars</span>
        <span><strong>{formatNumber(github.forks)}</strong> Forks</span>
        <span><strong>{formatNumber(github.followers)}</strong> Followers</span>
      </div>
      <div className="dashboard-split">
        <DonutChart items={github.languages} />
        <div className="activity-list">
          {github.repos.slice(0, 6).map((repo) => {
            const score = Math.max(12, 100 - daysAgo(repo.updatedAt) * 3);
            return (
              <a key={repo.name} href={repo.url} target="_blank" rel="noreferrer">
                <span>
                  <strong>{repo.name}</strong>
                  <small>{repo.language} - updated {daysAgo(repo.updatedAt)}d ago</small>
                </span>
                <i style={{ width: `${Math.min(score, 100)}%` }} />
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}

function WeatherWidget({ weather, onAsk }) {
  if (!weather) {
    return (
      <article className="dashboard-widget">
        <WidgetHeader icon={CloudSun} label="Weather" title="Vancouver" onAsk={onAsk} />
        <p className="widget-muted">Weather data is unavailable right now.</p>
      </article>
    );
  }

  const temperatures = weather.hours.map((hour) => hour.temperature).filter((value) => typeof value === "number");
  const precipitation = weather.hours.slice(0, 16);

  return (
    <article className="dashboard-widget dashboard-widget-wide">
      <WidgetHeader icon={CloudSun} label="Open-Meteo" title="Vancouver Forecast" />
      <div className="current-weather">
        <span><strong>{Math.round(weather.current.temperature_2m)}C</strong> Now</span>
        <span><strong>{Math.round(weather.current.wind_speed_10m)} km/h</strong> Wind</span>
        <span><strong>{weather.current.precipitation} mm</strong> Rain</span>
      </div>
      <svg className="line-chart" viewBox="0 0 320 116" role="img" aria-label="48 hour temperature trend">
        <polyline points={makeLinePoints(temperatures)} />
      </svg>
      <div className="precip-bars" aria-label="Precipitation probability">
        {precipitation.map((hour) => (
          <span key={hour.time}>
            <i style={{ height: `${Math.max(4, hour.precipitationProbability)}%` }} />
          </span>
        ))}
      </div>
      {onAsk && (
        <button type="button" className="dashboard-ask-button" onClick={onAsk}>
          Ask Copilot about weather
        </button>
      )}
    </article>
  );
}

function MapWidget({ onAsk }) {
  return (
    <article className="dashboard-widget">
      <WidgetHeader icon={MapPinned} label="Maps" title="Vancouver" onAsk={onAsk} />
      <div className="map-frame">
        <iframe
          title="OpenStreetMap view of Vancouver"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-123.2700%2C49.1800%2C-122.9800%2C49.3600&layer=mapnik&marker=49.2827%2C-123.1207"
          loading="lazy"
        />
      </div>
      {onAsk && (
        <button type="button" className="dashboard-ask-button" onClick={onAsk}>
          Ask Copilot about the map
        </button>
      )}
    </article>
  );
}

function ResearchWidget({ research, onAsk }) {
  const byTitle = new Map(research.map((item) => [item.title, item]));
  const matched = research.filter((item) => item.matched);

  return (
    <article className="dashboard-widget">
      <WidgetHeader icon={FlaskConical} label="Crossref" title="Research Metadata" onAsk={onAsk} />
      <div className="research-summary">
        <strong>{matched.length}</strong>
        <span>exact live matches</span>
      </div>
      <div className="research-list">
        {publications.slice(0, 4).map((publication) => {
          const metric = byTitle.get(publication.title);
          return (
            <a key={publication.title} href={publication.href} target="_blank" rel="noreferrer">
              <span>{publication.title}</span>
              {metric?.matched ? <strong>{metric.citations} refs</strong> : <small>static record</small>}
            </a>
          );
        })}
      </div>
    </article>
  );
}

function IssWidget({ iss, onAsk }) {
  if (!iss) {
    return (
      <article className="dashboard-widget">
        <WidgetHeader icon={Satellite} label="ISS - wheretheiss.at" title="Live Orbital Track" onAsk={onAsk} />
        <p className="widget-muted">Acquiring the International Space Station signal...</p>
      </article>
    );
  }

  const left = ((iss.longitude + 180) / 360) * 100;
  const top = ((90 - iss.latitude) / 180) * 100;

  return (
    <article className="dashboard-widget">
      <WidgetHeader icon={Satellite} label="ISS - live (5s)" title="International Space Station" />
      <div className="iss-map" role="img" aria-label="Live ISS ground track position">
        <span className="iss-marker" style={{ left: `${left}%`, top: `${top}%` }} />
      </div>
      <div className="metric-grid iss-metrics">
        <span><strong>{iss.latitude.toFixed(2)}&deg;</strong> Lat</span>
        <span><strong>{iss.longitude.toFixed(2)}&deg;</strong> Lon</span>
        <span><strong>{Math.round(iss.altitude)} km</strong> Altitude</span>
        <span><strong>{formatNumber(Math.round(iss.velocity))} km/h</strong> Speed</span>
      </div>
    </article>
  );
}

function QuakesWidget({ quakes, onAsk }) {
  if (!quakes) {
    return (
      <article className="dashboard-widget">
        <WidgetHeader icon={Waves} label="USGS" title="Seismic Activity" onAsk={onAsk} />
        <p className="widget-muted">Earthquake feed is unavailable right now.</p>
      </article>
    );
  }

  return (
    <article className="dashboard-widget">
      <WidgetHeader icon={Waves} label="USGS - last 24h" title="Seismic Activity (M2.5+)" />
      <div className="research-summary">
        <strong>{quakes.count}</strong>
        <span>events in the last day</span>
      </div>
      <div className="research-list">
        {quakes.features.slice(0, 5).map((quake) => (
          <a key={quake.id} href={quake.url} target="_blank" rel="noreferrer">
            <span>{quake.place || "Unknown location"}</span>
            <strong>M{quake.magnitude?.toFixed(1)} - {timeAgo(quake.time)}</strong>
          </a>
        ))}
      </div>
    </article>
  );
}

function NewsWidget({ news, onAsk }) {
  if (!news?.length) {
    return (
      <article className="dashboard-widget">
        <WidgetHeader icon={Newspaper} label="Spaceflight News" title="Robotics & Space Headlines" onAsk={onAsk} />
        <p className="widget-muted">Headlines are unavailable right now.</p>
      </article>
    );
  }

  return (
    <article className="dashboard-widget dashboard-widget-wide">
      <WidgetHeader icon={Newspaper} label="Spaceflight News API" title="Robotics & Space Headlines" />
      <div className="news-list">
        {news.map((article) => (
          <a key={article.id} href={article.url} target="_blank" rel="noreferrer">
            <strong>{article.title}</strong>
            <small>{article.source} - {timeAgo(article.publishedAt)}</small>
          </a>
        ))}
      </div>
    </article>
  );
}

function Dashboard() {
  const { status, data, error, refresh, iss } = useLiveDashboardData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [autoRefresh, setAutoRefresh] = useState(true);

  const updatedAt = data?.updatedAt;
  const hasApiError = data?.errors && Object.values(data.errors).some(Boolean);

  useEffect(() => {
    if (!autoRefresh) return undefined;
    const timer = window.setInterval(refresh, 30_000);
    return () => window.clearInterval(timer);
  }, [autoRefresh, refresh]);

  function openCopilotForTopic(question) {
    window.dispatchEvent(new CustomEvent("copilot-query", { detail: question }));
  }

  const widgetCategory = {
    GitHub: "Code",
    ISS: "Space",
    Weather: "Earth",
    Quakes: "Earth",
    News: "Space",
    Map: "Earth",
    Research: "Research"
  };

  function shouldShowWidget(key) {
    return selectedCategory === "All" || widgetCategory[key] === selectedCategory;
  }

  const categories = ["All", "Code", "Space", "Earth", "Research"];

  return (
    <>
      <PageHero
        kicker="Mission Control"
        title="Real-time signals from public science & engineering APIs."
        intro="Live widgets for code activity, the ISS orbital track (updated every 5 seconds), Vancouver weather, global seismic events, spaceflight headlines, and research metadata."
        path="/dashboard"
      />
      <Section className="compact-section dashboard-section">
        <div className="dashboard-toolbar">
          <div className="dashboard-status">
            <span>
              <RefreshCw size={16} aria-hidden="true" />
              {status === "loading" ? "Loading live APIs" : `Updated ${formatTime(updatedAt)}`}
            </span>
            <span className={`live-dot${iss ? " on" : ""}`}>{iss ? "ISS tracking live" : "Connecting to ISS"}</span>
          </div>
          <div className="dashboard-controls">
            <div className="dashboard-filter-buttons" role="group" aria-label="Dashboard data filters">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`dashboard-filter-button${selectedCategory === category ? " active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="dashboard-toggle-row">
              <button type="button" className="button secondary" onClick={refresh}>
                Refresh now
              </button>
              <button
                type="button"
                className={`button${autoRefresh ? " accent" : " secondary"}`}
                onClick={() => setAutoRefresh((current) => !current)}
              >
                Auto-refresh: {autoRefresh ? "On" : "Off"}
              </button>
            </div>
          </div>
        </div>
        <div className="dashboard-status notes">
          {status === "cached" && <span>Showing cached data while APIs refresh.</span>}
          {hasApiError && <span>Some APIs are temporarily unavailable.</span>}
          {error && <span>{error}</span>}
        </div>
        <div className="dashboard-grid">
          {shouldShowWidget("Code") && <GitHubWidget github={data?.github} onAsk={() => openCopilotForTopic("Explain Ahmad's coding activity and recent GitHub metrics.")} />}
          {shouldShowWidget("Space") && <IssWidget iss={iss} onAsk={() => openCopilotForTopic("Explain the ISS live orbital track widget and why it is included in the mission control dashboard.")} />}
          {shouldShowWidget("Earth") && <WeatherWidget weather={data?.weather} onAsk={() => openCopilotForTopic("Explain the weather widget and how environmental data supports robotics and perception work.")} />}
          {shouldShowWidget("Earth") && <QuakesWidget quakes={data?.quakes} onAsk={() => openCopilotForTopic("Explain the earthquake feed and how it relates to sensing and environmental monitoring.")} />}
          {shouldShowWidget("Space") && <NewsWidget news={data?.news} onAsk={() => openCopilotForTopic("Explain the space and robotics headlines feed in the dashboard.")} />}
          {shouldShowWidget("Earth") && <MapWidget onAsk={() => openCopilotForTopic("Explain the embedded map view and its connection to location-aware autonomy.")} />}
          {shouldShowWidget("Research") && <ResearchWidget research={data?.research || []} onAsk={() => openCopilotForTopic("Explain the research metadata widget and the publications tracked there.")} />}
        </div>
        <a className="dashboard-source-link" href="https://github.com/ahmaddroobi99" target="_blank" rel="noreferrer">
          Open GitHub profile <ArrowUpRight size={16} />
        </a>
      </Section>
      <Section className="compact-section">
        <ApiStackPanel />
      </Section>
    </>
  );
}

export default Dashboard;
