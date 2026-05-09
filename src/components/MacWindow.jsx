function MacWindow({ title, children }) {
  return (
    <section className="mac-window" aria-label={`${title} window`}>
      <div className="mac-window-titlebar">
        <div className="window-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="mac-window-title">
          <span>{title}</span>
        </div>
      </div>
      <div className="mac-window-body">{children}</div>
    </section>
  );
}

export default MacWindow;
