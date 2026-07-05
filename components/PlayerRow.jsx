"use client";

import { flagEmoji } from "@/lib/data";
import { fragility } from "@/lib/ranking";

const FRAG_CLASS = {
  "Steady": "steady",
  "Something to defend": "defend",
  "Exposed": "exposed",
  "House of cards": "cards",
};

export default function PlayerRow({ player, tour, following, onToggle }) {
  const frag = fragility(player, tour);
  return (
    <div className="player-row">
      <div className="rank-badge">
        {player.rank}
        <small>{tour}</small>
      </div>
      <span className="flag" aria-hidden>
        {flagEmoji(player.country)}
      </span>
      <div className="p-main">
        <div className="p-name">{player.name}</div>
        <div className="p-sub">
          <span>{player.points.toLocaleString()} pts</span>
          <span className={`frag ${FRAG_CLASS[frag.label] || "steady"}`}>
            {frag.label}
          </span>
        </div>
      </div>
      <button
        className={`star ${following ? "on" : ""}`}
        onClick={() => onToggle(player.id)}
        aria-label={following ? "Unfollow" : "Follow"}
        title={following ? "Unfollow" : "Follow"}
      >
        {following ? "★" : "☆"}
      </button>
    </div>
  );
}
