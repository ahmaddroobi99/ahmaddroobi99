import { Braces, Database, GitBranch, Radar, ShieldCheck } from "lucide-react";
import { apiPrinciples, apiStack } from "../data/apiData.js";

const icons = [GitBranch, Radar, Braces, Database];

function ApiStackPanel() {
  return (
    <section className="api-stack-panel" aria-labelledby="api-stack-title">
      <div className="api-stack-heading">
        <span className="eyebrow">
          <ShieldCheck size={15} aria-hidden="true" />
          API Layer
        </span>
        <h2 id="api-stack-title">The dashboard should fail politely.</h2>
        <p>
          This panel is here to show how the page handles public APIs: load what is available, cache useful data,
          and say clearly when a source is down.
        </p>
      </div>
      <div className="api-stack-grid">
        {apiStack.map((api, index) => {
          const Icon = icons[index % icons.length];

          return (
            <article className="api-endpoint-card" key={api.name}>
              <div className="api-endpoint-topline">
                <span>
                  <Icon size={18} aria-hidden="true" />
                  {api.method}
                </span>
                <strong>{api.name}</strong>
              </div>
              <code>{api.endpoint}</code>
              <p>{api.purpose}</p>
              <small>{api.resilience}</small>
            </article>
          );
        })}
      </div>
      <div className="api-principles" aria-label="API design principles">
        {apiPrinciples.map((principle) => (
          <span key={principle}>{principle}</span>
        ))}
      </div>
    </section>
  );
}

export default ApiStackPanel;
