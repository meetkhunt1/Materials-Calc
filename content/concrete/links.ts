import type { RelatedArticle, Reference } from "@/types";
import {
  Calculator,
  Square,
  Ruler,
  BrickWall,
  Columns3,
  BookOpen,
  DollarSign,
  Scale,
  Grid3x3,
  FlaskConical,
  Droplets,
  GitCompareArrows,
} from "lucide-react";

/**
 * Single source of truth for concrete-cluster internal links.
 * Every page imports from here so links never rot.
 */

export const CONCRETE = {
  hub: "/concrete",
  calculator: "/concrete/concrete-calculator",
  slab: "/concrete/concrete-slab-calculator",
  footing: "/concrete/concrete-footing-calculator",
  wall: "/concrete/concrete-wall-calculator",
  column: "/concrete/concrete-column-calculator",
  howTo: "/concrete/how-to-calculate-concrete",
  cost: "/concrete/concrete-cost-guide",
  density: "/concrete/concrete-density-chart",
  coverage: "/concrete/concrete-coverage-guide",
  mixRatio: "/concrete/concrete-mix-ratio-guide",
  curing: "/concrete/concrete-curing-guide",
  vsAsphalt: "/concrete/concrete-vs-asphalt",
} as const;

export const calculatorLinks: RelatedArticle[] = [
  {
    title: "Concrete Calculator",
    href: CONCRETE.calculator,
    description: "Volume, weight and bags for any rectangular pour.",
    category: "Calculator",
    icon: Calculator,
  },
  {
    title: "Concrete Slab Calculator",
    href: CONCRETE.slab,
    description: "Patios, garage floors, shed bases and driveways.",
    category: "Calculator",
    icon: Square,
  },
  {
    title: "Concrete Footing Calculator",
    href: CONCRETE.footing,
    description: "Strip footings by total run, width and depth.",
    category: "Calculator",
    icon: Ruler,
  },
  {
    title: "Concrete Wall Calculator",
    href: CONCRETE.wall,
    description: "Foundation and retaining walls, minus openings.",
    category: "Calculator",
    icon: BrickWall,
  },
  {
    title: "Concrete Column Calculator",
    href: CONCRETE.column,
    description: "Round sonotubes and square piers, any count.",
    category: "Calculator",
    icon: Columns3,
  },
];

export const guideLinks: RelatedArticle[] = [
  {
    title: "How to Calculate Concrete",
    href: CONCRETE.howTo,
    description: "The full method: measure, convert, add waste, order.",
    category: "Guide",
    icon: BookOpen,
  },
  {
    title: "Concrete Cost Guide",
    href: CONCRETE.cost,
    description: "Ready-mix, bagged and delivered prices with real math.",
    category: "Guide",
    icon: DollarSign,
  },
  {
    title: "Concrete Density Chart",
    href: CONCRETE.density,
    description: "Unit weights for every common concrete type.",
    category: "Chart",
    icon: Scale,
  },
  {
    title: "Concrete Coverage Guide",
    href: CONCRETE.coverage,
    description: "What a yard — or a bag — actually covers.",
    category: "Guide",
    icon: Grid3x3,
  },
  {
    title: "Concrete Mix Ratio Guide",
    href: CONCRETE.mixRatio,
    description: "Nominal mixes from 1:3:6 to 1:1:2, with yields.",
    category: "Guide",
    icon: FlaskConical,
  },
  {
    title: "Concrete Curing Guide",
    href: CONCRETE.curing,
    description: "Strength gain timeline and curing methods that work.",
    category: "Guide",
    icon: Droplets,
  },
  {
    title: "Concrete vs Asphalt",
    href: CONCRETE.vsAsphalt,
    description: "Cost, lifespan and maintenance compared honestly.",
    category: "Comparison",
    icon: GitCompareArrows,
  },
];

/** Pick a subset of links by href — keeps per-page related lists short and curated. */
export function pickLinks(from: RelatedArticle[], ...hrefs: string[]): RelatedArticle[] {
  return hrefs
    .map((href) => from.find((l) => l.href === href))
    .filter((l): l is RelatedArticle => Boolean(l));
}

/** Frequently cited standards — reuse instead of retyping. */
export const REFS: Record<string, Reference> = {
  aci318: {
    title: "ACI 318-19: Building Code Requirements for Structural Concrete",
    publisher: "American Concrete Institute",
    url: "https://www.concrete.org/store/productdetail.aspx?ItemID=318U19",
    year: 2019,
  },
  aci308: {
    title: "ACI 308R-16: Guide to External Curing of Concrete",
    publisher: "American Concrete Institute",
    url: "https://www.concrete.org/store/productdetail.aspx?ItemID=30816",
    year: 2016,
  },
  aci347: {
    title: "ACI 347R-14: Guide to Formwork for Concrete",
    publisher: "American Concrete Institute",
    url: "https://www.concrete.org/store/productdetail.aspx?ItemID=34714",
    year: 2014,
  },
  astmC94: {
    title: "ASTM C94/C94M: Standard Specification for Ready-Mixed Concrete",
    publisher: "ASTM International",
    url: "https://www.astm.org/c0094_c0094m-24.html",
    year: 2024,
  },
  astmC150: {
    title: "ASTM C150/C150M: Standard Specification for Portland Cement",
    publisher: "ASTM International",
    url: "https://www.astm.org/c0150_c0150m-22.html",
    year: 2022,
  },
  is456: {
    title: "IS 456:2000 — Plain and Reinforced Concrete: Code of Practice",
    publisher: "Bureau of Indian Standards",
    url: "https://law.resource.org/pub/in/bis/S03/is.456.2000.pdf",
    year: 2000,
  },
  is10262: {
    title: "IS 10262:2019 — Concrete Mix Proportioning Guidelines",
    publisher: "Bureau of Indian Standards",
    url: "https://law.resource.org/pub/in/bis/S03/is.10262.2019.pdf",
    year: 2019,
  },
  irc: {
    title: "2021 International Residential Code, Ch. 4: Foundations",
    publisher: "International Code Council",
    url: "https://codes.iccsafe.org/content/IRC2021P2/chapter-4-foundations",
    year: 2021,
  },
  pca: {
    title: "Design and Control of Concrete Mixtures, 17th ed.",
    publisher: "Portland Cement Association",
    url: "https://www.cement.org/learn/education/design-control-of-concrete-mixtures",
    year: 2021,
  },
};
