// ---------------------------------------------------------------------------
// Deuce — live ranking projection engine
//
// A ranking is a rolling 52-week sum of points. During an event, a player's
// total moves as:
//
//     projected = current  - defending (last year here, dropping off)
//                          + earned    (this year's result at this event)
//
// We then re-rank against the rest of the field (held at their current points,
// the same simplification every live-ranking tracker uses mid-event) to turn a
// points total into a projected ranking number.
// ---------------------------------------------------------------------------

import { PLAYERS, TOURS, pointsForRound, ROUND_ORDER } from "./data";

// Every player across both tours, so cross-tour ids never collide.
function fieldFor(tour) {
  return PLAYERS[tour];
}

// Points a player has *already banked* at this event from the round reached so
// far this year (0 if they haven't started / lost in the opening round).
export function bankedPoints(player) {
  if (!player.reached || player.reached === "OUT") return 0;
  return pointsForRound(player.reached);
}

// The player's projected point total IF they finish the event at `round`.
// `round` should be a round id ("QF", "W", ...) or "OUT" to freeze them at
// what they've already banked.
export function projectedPoints(player, round) {
  const earned = round === "OUT" ? bankedPoints(player) : pointsForRound(round);
  return player.points - player.defending + earned;
}

// Turn a point total into a projected rank within the given tour's field,
// holding every other player at their current points.
export function projectedRank(player, tour, projPoints) {
  const field = fieldFor(tour).filter((p) => p.id !== player.id);
  let ahead = 0;
  for (const other of field) {
    if (other.points > projPoints) ahead += 1;
  }
  return ahead + 1;
}

// Convenience: full projection for a player finishing at `round`.
export function project(player, tour, round) {
  const points = projectedPoints(player, round);
  const rank = projectedRank(player, tour, points);
  return {
    round,
    points,
    rank,
    delta: player.rank - rank, // positive = climbing
    isCareerHigh: rank < player.careerHigh,
  };
}

// The rounds a player could still finish at, given where they already are.
// If they're OUT, the only outcome is OUT. If still alive at round R, they can
// finish anywhere from R through the title.
export function possibleOutcomes(player) {
  if (player.reached === "OUT") return ["OUT"];
  const startIdx = ROUND_ORDER.indexOf(player.reached);
  return ROUND_ORDER.slice(startIdx);
}

// Fragility: how exposed a player's ranking is at this event. A player
// defending a lot of points who is already out (or barely into the draw) is
// "fragile" — their ranking is a house of cards. Returns a 0–100 score plus a
// human label and the worst-case rank drop.
export function fragility(player, tour) {
  const worstRound = player.reached === "OUT" ? "OUT" : player.reached;
  const worst = project(player, tour, worstRound);
  const drop = player.rank - worst.rank; // negative when they fall
  const exposure = player.defending; // points at risk

  // Normalise: 2000 defended points (a Slam title) with a big drop = max.
  const exposureScore = Math.min(exposure / 2000, 1) * 60;
  const dropScore = Math.min(Math.max(-drop, 0) / 10, 1) * 40;
  const score = Math.round(exposureScore + dropScore);

  let label = "Steady";
  if (score >= 66) label = "House of cards";
  else if (score >= 33) label = "Exposed";
  else if (exposure >= 360) label = "Something to defend";

  return { score, label, exposure, worstRankIfOutNow: worst.rank, worstDrop: drop };
}

export { ROUND_ORDER, TOURS };
