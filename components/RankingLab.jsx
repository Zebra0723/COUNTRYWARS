"use client";

import { useState } from "react";
import { flagEmoji, roundLabel, TOURNAMENT } from "@/lib/data";
import { project, possibleOutcomes, fragility } from "@/lib/ranking";

function deltaText(delta) {
  if (delta > 0) return { cls: "delta-up", txt: `▲ ${delta}` };
  if (delta < 0) return { cls: "delta-down", txt: `▼ ${-delta}` };
  return { cls: "delta-flat", txt: "— 0" };
}

export default function RankingLab({ player, tour, onToggle }) {
  const outcomes = possibleOutcomes(player);
  const isOut = player.reached === "OUT";

  // Default the selector to the most optimistic still-possible outcome for an
  // alive player, or to the frozen result for someone already out.
  const [outcome, setOutcome] = useState(outcomes[outcomes.length - 1]);

  const proj = project(player, tour, outcome);
  const d = deltaText(proj.delta);
  const frag = fragility(player, tour);

  return (
    <div className="lab-card">
      <div className="lab-head">
        <span className="flag" aria-hidden>
          {flagEmoji(player.country)}
        </span>
        <span className="name">{player.name}</span>
        <span className="cur">
          now <b>#{player.rank}</b> · {player.points.toLocaleString()} pts
        </span>
      </div>

      <div className="status-line">
        At {TOURNAMENT.name}:{" "}
        {isOut ? (
          <span className="out">Eliminated ({roundLabel(player.reached)})</span>
        ) : (
          <span className="alive">Still in — reached {roundLabel(player.reached)}</span>
        )}
        <button
          className="star on"
          onClick={() => onToggle(player.id)}
          style={{ marginLeft: "auto" }}
          title="Unfollow"
          aria-label="Unfollow"
        >
          ★
        </button>
      </div>

      {!isOut && (
        <>
          <div className="section-title" style={{ margin: "0 0 8px" }}>
            If they finish as…
          </div>
          <div className="outcomes">
            {outcomes.map((r) => (
              <button
                key={r}
                className={`outcome-btn ${r === outcome ? "active" : ""}`}
                onClick={() => setOutcome(r)}
              >
                {roundLabel(r)}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="proj">
        <div className="cell">
          <div className="k">Projected rank</div>
          <div className="v">
            <small>#</small>
            {proj.rank}
          </div>
        </div>
        <div className="cell">
          <div className="k">Move</div>
          <div className={`v ${d.cls}`}>{d.txt}</div>
        </div>
        <div className="cell">
          <div className="k">Points</div>
          <div className="v" style={{ fontSize: 20 }}>
            {proj.points.toLocaleString()}
          </div>
        </div>
      </div>

      {proj.isCareerHigh && (
        <div style={{ textAlign: "center" }}>
          <span className="ch-badge">
            🏆 New career high — beats #{player.careerHigh}
          </span>
        </div>
      )}

      <div className="defend-note">
        Defending <b>{player.defending.toLocaleString()} pts</b> from{" "}
        {TOURNAMENT.name} {TOURNAMENT.year - 1}.{" "}
        {frag.label === "House of cards" || frag.label === "Exposed" ? (
          <>
            Fragility: <b>{frag.label}</b> — if they lose now they fall to about{" "}
            <b>#{frag.worstRankIfOutNow}</b>.
          </>
        ) : (
          <>Low ranking risk at this event.</>
        )}
      </div>
    </div>
  );
}
