"use client";

import { useState } from "react";
import { countryCode, roundLabel, TOURNAMENT } from "@/lib/data";
import { project, possibleOutcomes, fragility } from "@/lib/ranking";
import { StarIcon, RiseIcon, FallIcon } from "@/components/icons";

function Delta({ delta }) {
  if (delta > 0)
    return (
      <span className="v delta-up">
        <RiseIcon /> {delta}
      </span>
    );
  if (delta < 0)
    return (
      <span className="v delta-down">
        <FallIcon /> {-delta}
      </span>
    );
  return <span className="v delta-flat">no change</span>;
}

export default function RankingLab({ player, tour, onToggle }) {
  const outcomes = possibleOutcomes(player);
  const isOut = player.reached === "OUT";

  // Default the selector to the most optimistic still-possible outcome for an
  // alive player, or to the frozen result for someone already out.
  const [outcome, setOutcome] = useState(outcomes[outcomes.length - 1]);

  const proj = project(player, tour, outcome);
  const frag = fragility(player, tour);

  return (
    <div className="lab-card">
      <div className="lab-head">
        <span className="country" aria-label={player.country}>
          {countryCode(player.country)}
        </span>
        <span className="name">{player.name}</span>
        <button
          className="star on lab-unfollow"
          onClick={() => onToggle(player.id)}
          title="Unfollow"
          aria-label="Unfollow"
        >
          <StarIcon filled size={18} />
        </button>
      </div>

      <div className="lab-current">
        now <b>#{player.rank}</b> · {player.points.toLocaleString()} pts
      </div>

      <div className="status-line">
        At {TOURNAMENT.name}:{" "}
        {isOut ? (
          <span className="out">Eliminated</span>
        ) : (
          <span className="alive">
            Still in — reached {roundLabel(player.reached)}
          </span>
        )}
      </div>

      {!isOut && (
        <>
          <div className="micro-title">If they finish as…</div>
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
          <Delta delta={proj.delta} />
        </div>
        <div className="cell">
          <div className="k">Points</div>
          <div className="v" style={{ fontSize: 20 }}>
            {proj.points.toLocaleString()}
          </div>
        </div>
      </div>

      {proj.isCareerHigh && (
        <div className="ch-row">
          <span className="ch-badge">
            New career high — beats #{player.careerHigh}
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
