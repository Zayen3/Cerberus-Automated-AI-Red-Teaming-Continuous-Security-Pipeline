import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vortex Labs // SUPPORT_AI — VEX Assistant" },
      {
        name: "description",
        content:
          "Chat with VEX, the AI support assistant for Vortex Labs cyber-streetwear: drop schedules, shipping times, order tracking and returns.",
      },
      { property: "og:title", content: "Vortex Labs // SUPPORT_AI — VEX Assistant" },
      {
        property: "og:description",
        content:
          "Cyber-streetwear support, handled. Ask VEX about drops, shipping and returns.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const API_URL = "http://localhost:3000/api/chat";

const CHIPS = [
  "Drop Schedule",
  "Order Tracking",
  "Return Policy",
  "Shipping Times",
  "Size Guide",
];

type Msg = { role: "user" | "bot"; text: string };

function Index() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "yo — welcome to Vortex Labs ⚡ I'm VEX, your support AI. Drops, shipping, returns, sizing — ask away.",
    },
  ]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function ask(message: string) {
    setMessages((m) => [...m, { role: "user", text: message }]);
    setBusy(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = (await res.json()) as { response?: string; error?: string };
      setMessages((m) => [
        ...m,
        { role: "bot", text: data.response || data.error || "No response received." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "⚠️ Can't reach the local server. Run `node server.js` (port 3000) and make sure Ollama is up.",
        },
      ]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const msg = value.trim();
    if (!msg || busy) return;
    setValue("");
    void ask(msg);
  }

  return (
    <main className="relative h-dvh overflow-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-55">
        <span className="vx-mesh-blob vx-float-a -left-[10vw] -top-[12vw] h-[46vw] w-[46vw] bg-vx-indigo" />
        <span className="vx-mesh-blob vx-float-b -right-[8vw] top-[8vh] h-[38vw] w-[38vw] bg-vx-lavender" />
        <span className="vx-mesh-blob vx-float-c bottom-[-18vw] left-[28vw] h-[34vw] w-[34vw] bg-vx-mint opacity-50" />
      </div>

      <div className="relative z-10 mx-auto flex h-dvh max-w-[880px] flex-col px-4 pb-4 pt-5">
        <header className="vx-glass flex items-center justify-between gap-4 rounded-[18px] px-5 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="vx-spin-slow h-[34px] w-[34px] flex-none rounded-[11px] bg-[conic-gradient(from_140deg,var(--vx-indigo),var(--vx-lavender),var(--vx-mint),var(--vx-indigo))] shadow-[0_0_22px_var(--vx-indigo)]" />
            <h1 className="truncate text-[14.5px] font-semibold uppercase tracking-[0.16em]">
              Vortex Labs <span className="text-vx-lavender">// Support_AI</span>
            </h1>
          </div>
          <div className="flex flex-none items-center gap-2 rounded-full border border-vx-mint/30 bg-vx-mint/8 px-3 py-1.5 font-mono text-[11px] tracking-[0.06em] text-vx-mint">
            <span className="vx-pulse-dot h-[7px] w-[7px] rounded-full bg-vx-mint" />
            <span className="hidden sm:inline">ONLINE | Llama-3.2 (Local)</span>
          </div>
        </header>

        <div
          ref={logRef}
          className="vx-scroll mt-4 flex flex-1 flex-col gap-3.5 overflow-y-auto px-1 py-1.5"
        >
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex"}>
              <div
                className={
                  m.role === "user"
                    ? "vx-rise max-w-[80%] rounded-[18px] rounded-tr-md border border-vx-lavender/40 bg-[linear-gradient(135deg,var(--vx-indigo),var(--vx-lavender))] px-4 py-3 text-[14.5px] leading-relaxed whitespace-pre-wrap text-primary-foreground shadow-[0_8px_32px_var(--vx-indigo)]/30"
                    : "vx-glass vx-rise max-w-[80%] rounded-[18px] rounded-tl-md px-4 py-3 text-[14.5px] leading-relaxed whitespace-pre-wrap"
                }
              >
                {m.role === "bot" && (
                  <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    VEX
                  </p>
                )}
                {m.text}
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex">
              <div className="vx-glass vx-rise rounded-[18px] rounded-tl-md px-4 py-3">
                <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  VEX
                </p>
                <span className="flex gap-1.5">
                  <i className="vx-dot-1 h-[7px] w-[7px] rounded-full bg-vx-lavender" />
                  <i className="vx-dot-2 h-[7px] w-[7px] rounded-full bg-vx-lavender" />
                  <i className="vx-dot-3 h-[7px] w-[7px] rounded-full bg-vx-lavender" />
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="my-3 flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              disabled={busy}
              onClick={() => void ask(c)}
              className="vx-glass rounded-full px-3.5 py-2 text-[12.5px] text-muted-foreground transition hover:-translate-y-px hover:border-vx-lavender/50 hover:text-foreground hover:shadow-[0_6px_20px_var(--vx-indigo)]/25 disabled:opacity-50"
            >
              {c}
            </button>
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          className="vx-glass flex items-center gap-2.5 rounded-[20px] p-2 transition focus-within:border-vx-lavender/55 focus-within:shadow-[0_0_0_4px_var(--vx-indigo)]/15"
        >
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask VEX anything about the drop…"
            className="flex-1 bg-transparent px-3.5 py-3 text-[14.5px] outline-none placeholder:text-muted-foreground/70"
          />
          <button
            type="submit"
            disabled={busy || !value.trim()}
            className="flex-none rounded-[14px] bg-[linear-gradient(135deg,var(--vx-mint),var(--vx-lavender))] px-5 py-3 text-[13.5px] font-semibold text-accent-foreground transition hover:brightness-110 disabled:opacity-45"
          >
            Send
          </button>
        </form>

        <p className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/60">
          Vortex Labs © 2026 — local build
        </p>
      </div>
    </main>
  );
}
