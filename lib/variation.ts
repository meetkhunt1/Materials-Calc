/**
 * Deterministic layout-variation engine.
 *
 * Every page passes its slug through these helpers to pick layout variants,
 * section ordering, callout styles, image placement, etc. The same slug always
 * produces the same variation (stable across builds → SSG-safe, no hydration
 * mismatch), but different slugs land on different combinations — so no two
 * pages look identical while each page stays consistent forever.
 */

/** FNV-1a string hash — fast, well distributed, deterministic. */
export function hashSeed(seed: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** Mulberry32 PRNG — tiny seeded generator for repeatable sequences. */
export function seededRandom(seed: string): () => number {
  let state = hashSeed(seed);
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Pick one variant deterministically: pick("concrete-calculator", ["a","b","c"]) */
export function pick<T>(seed: string, variants: readonly T[]): T {
  if (variants.length === 0) throw new Error("pick() needs at least one variant");
  return variants[hashSeed(seed) % variants.length];
}

/** Deterministic integer in [min, max] inclusive. */
export function pickInt(seed: string, min: number, max: number): number {
  return min + (hashSeed(seed) % (max - min + 1));
}

/** Deterministic boolean with optional probability (default 50%). */
export function chance(seed: string, probability = 0.5): boolean {
  return seededRandom(seed)() < probability;
}

/** Deterministic Fisher–Yates shuffle — reorder page sections per slug. */
export function shuffle<T>(seed: string, items: readonly T[]): T[] {
  const result = [...items];
  const random = seededRandom(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Named variant sets used across the site. Pages call e.g.
 *   pick(slug, CALCULATOR_LAYOUTS) → "split" | "hero-flow" | "sidebar"
 */
export const CALCULATOR_LAYOUTS = ["split", "hero-flow", "sidebar"] as const;
export type CalculatorLayoutVariant = (typeof CALCULATOR_LAYOUTS)[number];

export const HERO_VARIANTS = ["standard", "centered", "compact", "stat-strip"] as const;
export type HeroVariant = (typeof HERO_VARIANTS)[number];

export const FAQ_POSITIONS = ["after-content", "before-related", "mid-content"] as const;
export const RELATED_STYLES = ["cards", "list", "inline-strip"] as const;
export const TABLE_STYLES = ["striped", "bordered", "minimal"] as const;
