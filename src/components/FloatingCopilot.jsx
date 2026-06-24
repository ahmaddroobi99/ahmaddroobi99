import { useEffect, useMemo, useState } from "react";
import { MessageSquare, Send, X, Sparkles } from "lucide-react";

const suggestions = [
  "Tell me about Ahmad's LiDAR work",
  "Explain the live mission control dashboard",
  "What skills does he have in perception?",
  "How does his portfolio connect robotics and autonomy?"
];

function ChatMessage({ message }) {
  return (
    <div className={`copilot-message ${message.role}`}>
      <div className="copilot-message-bubble">
        {message.role === "assistant" && <strong>Copilot</strong>}
        <p>{message.content}</p>
      </div>
    </div>
  );
}

function FloatingCopilot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Copilot. Ask me anything about Ahmad's work in robotics, perception, or autonomy."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    }

    function onCopilotQuery(event) {
      const question = event.detail;
      if (!question) return;
      setOpen(true);
      sendMessage(question);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("copilot-query", onCopilotQuery);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("copilot-query", onCopilotQuery);
    };
  }, [open]);

  const displayedMessages = useMemo(() => messages, [messages]);

  async function sendMessage(content) {
    if (!content.trim()) return;
    const userMessage = { role: "user", content: content.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: content.trim() })
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const result = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: result.answer || "Sorry, I couldn't answer that."
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.message || "Unable to get a response.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  function handleSuggestion(value) {
    sendMessage(value);
  }

  return (
    <div className="floating-copilot">
      <button
        type="button"
        className="copilot-launcher"
        aria-label="Open Ask Copilot chat"
        onClick={() => setOpen(true)}
      >
        <MessageSquare size={18} aria-hidden="true" />
        <span>Ask Copilot</span>
      </button>

      {open && (
        <div className="copilot-overlay" role="dialog" aria-modal="true" aria-label="Ask Copilot chat window">
          <div className="copilot-panel">
            <div className="copilot-panel-header">
              <div>
                <Sparkles size={18} aria-hidden="true" />
                <div>
                  <p>Ask Copilot</p>
                  <span>Robotics, perception, and autonomy assistant.</span>
                </div>
              </div>
              <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Close Copilot chat">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="copilot-body">
              <div className="copilot-suggestions" aria-label="Quick suggestions">
                {suggestions.map((text) => (
                  <button
                    key={text}
                    type="button"
                    className="copilot-chip"
                    onClick={() => handleSuggestion(text)}
                  >
                    {text}
                  </button>
                ))}
              </div>

              <div className="copilot-messages" aria-live="polite">
                {displayedMessages.map((message, index) => (
                  <ChatMessage key={`${message.role}-${index}`} message={message} />
                ))}
              </div>
            </div>

            <form className="copilot-input" onSubmit={handleSubmit}>
              <input
                type="text"
                aria-label="Type your question for Copilot"
                placeholder="Ask about Ahmad's projects, skills, or dashboard..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                disabled={loading}
              />
              <button type="submit" className="copilot-send" disabled={loading || !input.trim()}>
                {loading ? "Sending..." : <><Send size={16} aria-hidden="true" /> Send</>}
              </button>
            </form>
            {error && <p className="copilot-error">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default FloatingCopilot;
