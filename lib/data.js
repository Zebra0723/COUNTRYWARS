// ---------------------------------------------------------------------------
// Deuce — tour data
//
// NOTE: The numbers below are *illustrative* snapshots meant to make the app
// fully functional out of the box. They are structured exactly like a live
// feed would be, so swapping in a real ATP/WTA data source later is a
// drop-in replacement for this file (see README "Wiring a live feed").
// ---------------------------------------------------------------------------

// The tournament the Ranking Lab is currently centred on.
export const TOURNAMENT = {
  id: "wimbledon-2026",
  name: "Wimbledon",
  year: 2026,
  category: "Grand Slam",
  surface: "Grass",
  location: "London, GB",
  // Round the draw has progressed to (matches for this round are being played).
  currentRound: "R16",
};

// Points awarded for reaching each round at a Grand Slam.
// The "reached" value is the points banked for making it *to* that round.
export const GRAND_SLAM_POINTS = [
  { round: "R128", label: "1st Round", points: 10 },
  { round: "R64", label: "2nd Round", points: 45 },
  { round: "R32", label: "3rd Round", points: 90 },
  { round: "R16", label: "4th Round", points: 180 },
  { round: "QF", label: "Quarterfinal", points: 360 },
  { round: "SF", label: "Semifinal", points: 720 },
  { round: "F", label: "Final", points: 1200 },
  { round: "W", label: "Champion", points: 2000 },
];

// Ordered list of round ids, earliest to latest.
export const ROUND_ORDER = GRAND_SLAM_POINTS.map((r) => r.round);

export function pointsForRound(round) {
  const entry = GRAND_SLAM_POINTS.find((r) => r.round === round);
  return entry ? entry.points : 0;
}

export function roundLabel(round) {
  if (round === "OUT") return "Eliminated";
  const entry = GRAND_SLAM_POINTS.find((r) => r.round === round);
  return entry ? entry.label : round;
}

// ---------------------------------------------------------------------------
// Players
//
// Each player carries what we need to reason about the rankings:
//   rank         current live ranking
//   points       total ranking points right now (before this event's outcome)
//   defending    points earned at THIS event last year (dropping off the total)
//   reached      round they have already reached in this year's draw
//                ("OUT" = already lost; otherwise still alive at that round)
//   careerHigh   best ranking ever (for career-high alerts)
// ---------------------------------------------------------------------------

export const PLAYERS = {
  ATP: [
    { id: "sinner", name: "Jannik Sinner", country: "IT", rank: 1, points: 11500, defending: 720, reached: "R16", careerHigh: 1 },
    { id: "alcaraz", name: "Carlos Alcaraz", country: "ES", rank: 2, points: 9900, defending: 2000, reached: "R16", careerHigh: 1 },
    { id: "zverev", name: "Alexander Zverev", country: "DE", rank: 3, points: 7000, defending: 180, reached: "R16", careerHigh: 2 },
    { id: "draper", name: "Jack Draper", country: "GB", rank: 4, points: 5200, defending: 90, reached: "R16", careerHigh: 4 },
    { id: "fritz", name: "Taylor Fritz", country: "US", rank: 5, points: 4900, defending: 1200, reached: "R16", careerHigh: 5 },
    { id: "djokovic", name: "Novak Djokovic", country: "RS", rank: 6, points: 4600, defending: 720, reached: "R16", careerHigh: 1 },
    { id: "rune", name: "Holger Rune", country: "DK", rank: 7, points: 3800, defending: 180, reached: "OUT", careerHigh: 4 },
    { id: "musetti", name: "Lorenzo Musetti", country: "IT", rank: 8, points: 3650, defending: 720, reached: "R16", careerHigh: 6 },
    { id: "medvedev", name: "Daniil Medvedev", country: "RU", rank: 9, points: 3500, defending: 720, reached: "OUT", careerHigh: 1 },
    { id: "deminaur", name: "Alex de Minaur", country: "AU", rank: 10, points: 3350, defending: 360, reached: "R16", careerHigh: 6 },
    { id: "shelton", name: "Ben Shelton", country: "US", rank: 11, points: 3150, defending: 90, reached: "R16", careerHigh: 11 },
    { id: "paul", name: "Tommy Paul", country: "US", rank: 12, points: 3000, defending: 360, reached: "OUT", careerHigh: 9 },
    { id: "ruud", name: "Casper Ruud", country: "NO", rank: 13, points: 2850, defending: 45, reached: "R16", careerHigh: 2 },
    { id: "tsitsipas", name: "Stefanos Tsitsipas", country: "GR", rank: 14, points: 2600, defending: 180, reached: "OUT", careerHigh: 3 },
    { id: "rublev", name: "Andrey Rublev", country: "RU", rank: 15, points: 2500, defending: 360, reached: "R16", careerHigh: 5 },
    { id: "hurkacz", name: "Hubert Hurkacz", country: "PL", rank: 16, points: 2400, defending: 180, reached: "OUT", careerHigh: 6 },
    { id: "dimitrov", name: "Grigor Dimitrov", country: "BG", rank: 17, points: 2200, defending: 360, reached: "R16", careerHigh: 3 },
    { id: "cerundolo", name: "Francisco Cerundolo", country: "AR", rank: 18, points: 2000, defending: 45, reached: "OUT", careerHigh: 18 },
    { id: "humbert", name: "Ugo Humbert", country: "FR", rank: 19, points: 1900, defending: 90, reached: "R16", careerHigh: 13 },
    { id: "fonseca", name: "Joao Fonseca", country: "BR", rank: 20, points: 1820, defending: 10, reached: "R16", careerHigh: 20 },
    { id: "machac", name: "Tomas Machac", country: "CZ", rank: 21, points: 1700, defending: 90, reached: "OUT", careerHigh: 21 },
    { id: "tiafoe", name: "Frances Tiafoe", country: "US", rank: 22, points: 1650, defending: 180, reached: "OUT", careerHigh: 10 },
    { id: "lehecka", name: "Jiri Lehecka", country: "CZ", rank: 23, points: 1600, defending: 90, reached: "R16", careerHigh: 23 },
    { id: "khachanov", name: "Karen Khachanov", country: "RU", rank: 24, points: 1550, defending: 45, reached: "OUT", careerHigh: 8 },
  ],
  WTA: [
    { id: "sabalenka", name: "Aryna Sabalenka", country: "BY", rank: 1, points: 10200, defending: 720, reached: "R16", careerHigh: 1 },
    { id: "gauff", name: "Coco Gauff", country: "US", rank: 2, points: 8400, defending: 180, reached: "R16", careerHigh: 2 },
    { id: "swiatek", name: "Iga Swiatek", country: "PL", rank: 3, points: 7600, defending: 2000, reached: "R16", careerHigh: 1 },
    { id: "zheng", name: "Zheng Qinwen", country: "CN", rank: 4, points: 5400, defending: 90, reached: "OUT", careerHigh: 4 },
    { id: "paolini", name: "Jasmine Paolini", country: "IT", rank: 5, points: 5000, defending: 1200, reached: "R16", careerHigh: 4 },
    { id: "rybakina", name: "Elena Rybakina", country: "KZ", rank: 6, points: 4800, defending: 360, reached: "R16", careerHigh: 3 },
    { id: "andreeva", name: "Mirra Andreeva", country: "RU", rank: 7, points: 4600, defending: 360, reached: "R16", careerHigh: 5 },
    { id: "keys", name: "Madison Keys", country: "US", rank: 8, points: 4100, defending: 180, reached: "R16", careerHigh: 7 },
    { id: "navarro", name: "Emma Navarro", country: "US", rank: 9, points: 3500, defending: 360, reached: "OUT", careerHigh: 8 },
    { id: "anisimova", name: "Amanda Anisimova", country: "US", rank: 10, points: 3300, defending: 90, reached: "R16", careerHigh: 10 },
    { id: "krejcikova", name: "Barbora Krejcikova", country: "CZ", rank: 11, points: 3000, defending: 2000, reached: "OUT", careerHigh: 2 },
    { id: "kasatkina", name: "Daria Kasatkina", country: "AU", rank: 12, points: 2900, defending: 90, reached: "R16", careerHigh: 8 },
    { id: "ostapenko", name: "Jelena Ostapenko", country: "LV", rank: 13, points: 2750, defending: 180, reached: "R16", careerHigh: 5 },
    { id: "collins", name: "Danielle Collins", country: "US", rank: 14, points: 2500, defending: 90, reached: "OUT", careerHigh: 7 },
    { id: "muchova", name: "Karolina Muchova", country: "CZ", rank: 15, points: 2400, defending: 45, reached: "R16", careerHigh: 8 },
    { id: "shnaider", name: "Diana Shnaider", country: "RU", rank: 16, points: 2300, defending: 90, reached: "R16", careerHigh: 12 },
    { id: "fernandez", name: "Leylah Fernandez", country: "CA", rank: 17, points: 2100, defending: 45, reached: "OUT", careerHigh: 13 },
    { id: "vekic", name: "Donna Vekic", country: "HR", rank: 18, points: 2000, defending: 720, reached: "R16", careerHigh: 18 },
    { id: "kostyuk", name: "Marta Kostyuk", country: "UA", rank: 19, points: 1900, defending: 180, reached: "R16", careerHigh: 18 },
    { id: "pegula", name: "Jessica Pegula", country: "US", rank: 20, points: 1850, defending: 90, reached: "OUT", careerHigh: 3 },
    { id: "svitolina", name: "Elina Svitolina", country: "UA", rank: 21, points: 1800, defending: 360, reached: "R16", careerHigh: 3 },
    { id: "alexandrova", name: "Ekaterina Alexandrova", country: "RU", rank: 22, points: 1700, defending: 180, reached: "OUT", careerHigh: 15 },
    { id: "samsonova", name: "Liudmila Samsonova", country: "RU", rank: 23, points: 1650, defending: 90, reached: "R16", careerHigh: 12 },
    { id: "badosa", name: "Paula Badosa", country: "ES", rank: 24, points: 1600, defending: 360, reached: "OUT", careerHigh: 2 },
  ],
};

export const TOURS = ["ATP", "WTA"];

// ISO 3166-1 alpha-2 country code -> flag emoji.
export function flagEmoji(code) {
  if (!code || code.length !== 2) return "🎾";
  const A = 0x1f1e6;
  const base = "A".charCodeAt(0);
  return String.fromCodePoint(
    A + code.toUpperCase().charCodeAt(0) - base,
    A + code.toUpperCase().charCodeAt(1) - base
  );
}

export function findPlayer(id) {
  for (const tour of TOURS) {
    const p = PLAYERS[tour].find((x) => x.id === id);
    if (p) return { ...p, tour };
  }
  return null;
}
