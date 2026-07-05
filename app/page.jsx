"use client";

import { useEffect, useMemo, useState } from "react";
import { PLAYERS, TOURS, TOURNAMENT, findPlayer } from "@/lib/data";
import PlayerRow from "@/components/PlayerRow";
import RankingLab from "@/components/RankingLab";

const STORAGE_KEY = "deuce.following.v1";

export default function Home() {
  const [tour, setTour] = useState("ATP");
  const [query, setQuery] = useState("");
  const [following, setFollowing] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load follows from localStorage on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFollowing(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist follows.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(following));
    } catch {
      /* ignore */
    }
  }, [following, hydrated]);

  function toggle(id) {
    setFollowing((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PLAYERS[tour].filter((p) =>
      q ? p.name.toLowerCase().includes(q) : true
    );
  }, [tour, query]);

  // Followed players resolved to full records, sorted by current rank.
  const followed = useMemo(
    () =>
      following
        .map((id) => findPlayer(id))
        .filter(Boolean)
        .sort((a, b) => a.rank - b.rank),
    [following]
  );

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div className="brand">
            <h1>
              <span className="ball">●</span> Deuce
            </h1>
            <span className="tag">ATP / WTA tour tracker · ranking lab</span>
          </div>
          <div className="event-strip">
            <span className="live-dot" aria-hidden />
            <span className="event-name">
              {TOURNAMENT.name} {TOURNAMENT.year}
            </span>
            <span className="chip">{TOURNAMENT.category}</span>
            <span className="chip">{TOURNAMENT.surface}</span>
            <span className="chip">{TOURNAMENT.location}</span>
            <span className="chip">Round: {TOURNAMENT.currentRound}</span>
          </div>
        </div>
      </header>

      <main className="wrap">
        {/* ---------- Ranking Lab (followed players) ---------- */}
        <div className="section-title">
          Your Ranking Lab · {followed.length} following
        </div>
        {followed.length === 0 ? (
          <div className="lab-empty">
            <div style={{ fontSize: 26, marginBottom: 8 }}>🎾</div>
            Star players below to track them here. The Lab shows what each result
            at {TOURNAMENT.name} does to their ranking — live.
          </div>
        ) : (
          <div className="grid two">
            {followed.map((p) => (
              <RankingLab
                key={p.id}
                player={p}
                tour={p.tour}
                onToggle={toggle}
              />
            ))}
          </div>
        )}

        {/* ---------- Browse the field ---------- */}
        <div className="toolbar">
          <div className="toggle">
            {TOURS.map((t) => (
              <button
                key={t}
                className={t === tour ? "active" : ""}
                onClick={() => setTour(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <input
            className="search"
            placeholder="Search players…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="section-title">{tour} — Top of the field</div>
        <div className="grid">
          {list.map((p) => (
            <PlayerRow
              key={p.id}
              player={p}
              tour={tour}
              following={following.includes(p.id)}
              onToggle={toggle}
            />
          ))}
          {list.length === 0 && (
            <div className="lab-empty">No players match “{query}”.</div>
          )}
        </div>

        <div className="footer">
          <p>
            <b>Deuce</b> — follow the ATP &amp; WTA top 100 and see exactly what
            every result means for the rankings. Projections re-rank a player
            against the field held at current points, the standard live-ranking
            method used mid-event.
          </p>
          <p style={{ marginTop: 8 }}>
            Data here is illustrative and structured for a live feed — see{" "}
            <code>lib/data.js</code> and the README to wire one in.
          </p>
        </div>
      </main>
    </>
  );
}
