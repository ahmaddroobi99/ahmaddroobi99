import { ArrowUpRight, CloudSun, Code2, FlaskConical, MapPinned, RefreshCw } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import Section from "../components/Section.jsx";
import { publications } from "../data/profileData.js";
import useLiveDashboardData from "../hooks/useLiveDashboardData.js";

const chartColors = ["#0a84ff", "#30d158", "#ff9f0a", "#bf5af2", "#64d2ff", "#ff453a"];

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

function WidgetHeader({ icon: Icon, label, title }) {
  return (
    <div className="widget-header">
      <span>
        <Icon size={18} aria-hidden="true" />
        {label}
      </span>
      <h3>{title}</h3>
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

function GitHubWidget({ github }) {
  if (!github) {
    return (
      <article className="dashboard-widget">
        <WidgetHeader icon={Code2} label="GitHub" title="Coding Activity" />
        <p className="widget-muted">GitHub data is unavailable right now. Cached or live values will appear after the API responds.</p>
      </article>
    );
  }

  return (
    <article className="dashboard-widget dashboard-widget-wide">
      <WidgetHeader icon={Code2} label="GitHub" title="Coding Activity" />
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

function WeatherWidget({ weather }) {
  if (!weather) {
    return (
      <article className="dashboard-widget">
        <WidgetHeader icon={CloudSun} label="Weather" title="Vancouver" />
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
    </article>
  );
}

function MapWidget() {
  return (
    <article className="dashboard-widget">
      <WidgetHeader icon={MapPinned} label="Maps" title="Vancouver" />
      <div className="map-frame">
        <iframe
          title="OpenStreetMap view of Vancouver"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-123.2700%2C49.1800%2C-122.9800%2C49.3600&layer=mapnik&marker=49.2827%2C-123.1207"
          loading="lazy"
        />
      </div>
    </article>
  );
}

function ResearchWidget({ research }) {
  const byTitle = new Map(research.map((item) => [item.title, item]));
  const matched = research.filter((item) => item.matched);

  return (
    <article className="dashboard-widget">
      <WidgetHeader icon={FlaskConical} label="Crossref" title="Research Metadata" />
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

function Dashboard() {
  const { status, data, error } = useLiveDashboardData();
  const updatedAt = data?.updatedAt;
  const hasApiError = data?.errors && Object.values(data.errors).some(Boolean);

  return (
    <>
      <PageHero
        kicker="Dashboard"
        title="Live signals in a macOS dashboard."
        intro="Public API widgets for code activity, Vancouver weather, map context, and exact-only research metadata."
        path="/dashboard"
      />
      <Section className="compact-section dashboard-section">
        <div className="dashboard-status">
          <span>
            <RefreshCw size={16} aria-hidden="true" />
            {status === "loading" ? "Loading live APIs" : `Updated ${formatTime(updatedAt)}`}
          </span>
          {status === "cached" && <span>Showing cached data while APIs refresh.</span>}
          {hasApiError && <span>Some APIs are temporarily unavailable.</span>}
          {error && <span>{error}</span>}
        </div>
        <div className="dashboard-grid">
          <GitHubWidget github={data?.github} />
          <WeatherWidget weather={data?.weather} />
          <MapWidget />
          <ResearchWidget research={data?.research || []} />
        </div>
        <a className="dashboard-source-link" href="https://github.com/ahmaddroobi99" target="_blank" rel="noreferrer">
          Open GitHub profile <ArrowUpRight size={16} />
        </a>
      </Section>
    </>
  );
}

export default Dashboard;
