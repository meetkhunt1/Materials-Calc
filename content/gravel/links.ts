import type { RelatedArticle, Reference } from "@/types";
import {
  Calculator,
  Circle,
  Hammer,
  Car,
  DollarSign,
  BookOpen,
  Scale,
  Grid3x3,
  Ruler,
  GitCompareArrows,
  HelpCircle,
  Wrench,
  Layers,
  Sprout,
  Database,
  Table2,
  ArrowLeftRight,
  PiggyBank,
  Truck,
} from "lucide-react";

/**
 * Single source of truth for gravel-cluster internal links.
 * Five calculator sets plus the standalone reference pages.
 */

export const GRAVEL = {
  hub: "/gravel",
  // Calculators
  calculator: "/gravel/gravel-calculator",
  pea: "/gravel/pea-gravel-calculator",
  crushed: "/gravel/crushed-stone-calculator",
  driveway: "/gravel/driveway-gravel-calculator",
  cost: "/gravel/gravel-cost-calculator",
  // Core set (Gravel Calculator)
  howTo: "/gravel/how-to-calculate-gravel",
  densityChart: "/gravel/gravel-density-chart",
  coverage: "/gravel/gravel-coverage-guide",
  weightChart: "/gravel/gravel-weight-chart",
  volumeFormula: "/gravel/gravel-volume-formula",
  measurement: "/gravel/gravel-measurement-guide",
  faq: "/gravel/gravel-faq",
  // Pea gravel set
  whatIsPea: "/gravel/what-is-pea-gravel",
  peaSizes: "/gravel/pea-gravel-sizes",
  peaCost: "/gravel/pea-gravel-cost",
  peaCoverage: "/gravel/pea-gravel-coverage",
  peaLandscaping: "/gravel/pea-gravel-landscaping-guide",
  peaInstall: "/gravel/pea-gravel-installation-guide",
  peaFaq: "/gravel/pea-gravel-faq",
  // Crushed stone set
  stoneSizes: "/gravel/crushed-stone-sizes",
  stoneWeight: "/gravel/crushed-stone-weight",
  stoneCost: "/gravel/crushed-stone-cost",
  stoneVsGravel: "/gravel/crushed-stone-vs-gravel",
  stoneUses: "/gravel/crushed-stone-best-uses",
  stoneCoverage: "/gravel/crushed-stone-coverage-chart",
  stoneFaq: "/gravel/crushed-stone-faq",
  // Driveway gravel set
  drivewayDepth: "/gravel/driveway-gravel-depth",
  drivewayLayers: "/gravel/driveway-gravel-base-layers",
  drivewayTypes: "/gravel/best-gravel-for-driveways",
  drivewayCost: "/gravel/gravel-driveway-cost",
  drivewayInstall: "/gravel/gravel-driveway-installation",
  drivewayMaintenance: "/gravel/gravel-driveway-maintenance",
  drivewayFaq: "/gravel/gravel-driveway-faq",
  // Cost set
  priceGuide: "/gravel/gravel-price-guide",
  deliveryCost: "/gravel/gravel-delivery-cost",
  costPerTon: "/gravel/gravel-cost-per-ton",
  costPerYard: "/gravel/gravel-cost-per-cubic-yard",
  laborCost: "/gravel/gravel-labor-cost",
  budgetTips: "/gravel/gravel-budget-tips",
  costFaq: "/gravel/gravel-cost-faq",
  // Standalone reference pages
  refDensity: "/gravel/gravel-density-database",
  refSizes: "/gravel/gravel-size-chart",
  refWeight: "/gravel/gravel-weight-table",
  refCoverage: "/gravel/gravel-coverage-chart",
  refConversion: "/gravel/gravel-conversion-chart",
} as const;

export const gravelCalculatorLinks: RelatedArticle[] = [
  { title: "Gravel Calculator", href: GRAVEL.calculator, description: "Tons and cubic yards for any gravel type.", category: "Calculator", icon: Calculator },
  { title: "Pea Gravel Calculator", href: GRAVEL.pea, description: "Patios, paths and play areas — tons, yards, bags.", category: "Calculator", icon: Circle },
  { title: "Crushed Stone Calculator", href: GRAVEL.crushed, description: "#57, crusher run and more, loose or compacted.", category: "Calculator", icon: Hammer },
  { title: "Driveway Gravel Calculator", href: GRAVEL.driveway, description: "Layer-by-layer tonnage for a proper gravel drive.", category: "Calculator", icon: Car },
  { title: "Gravel Cost Calculator", href: GRAVEL.cost, description: "Material, delivery and total budget from dimensions.", category: "Calculator", icon: DollarSign },
];

export const coreGuideLinks: RelatedArticle[] = [
  { title: "How to Calculate Gravel", href: GRAVEL.howTo, description: "Area × depth × density, step by step.", category: "Guide", icon: BookOpen },
  { title: "Gravel Density Chart", href: GRAVEL.densityChart, description: "Unit weights for every common gravel type.", category: "Chart", icon: Scale },
  { title: "Gravel Coverage Guide", href: GRAVEL.coverage, description: "What a ton — and a yard — actually covers.", category: "Guide", icon: Grid3x3 },
  { title: "Gravel Weight Chart", href: GRAVEL.weightChart, description: "Pounds and tons per yard, foot and meter.", category: "Chart", icon: Scale },
  { title: "Gravel Volume Formula", href: GRAVEL.volumeFormula, description: "The math, with every unit trap flagged.", category: "Guide", icon: BookOpen },
  { title: "Gravel Measurement Guide", href: GRAVEL.measurement, description: "Measuring real sites, including irregular areas.", category: "Guide", icon: Ruler },
  { title: "Gravel FAQ", href: GRAVEL.faq, description: "The questions everyone asks before ordering.", category: "FAQ", icon: HelpCircle },
];

export const peaGuideLinks: RelatedArticle[] = [
  { title: "What Is Pea Gravel?", href: GRAVEL.whatIsPea, description: "The smooth, rounded stone — and where it belongs.", category: "Guide", icon: Circle },
  { title: "Pea Gravel Sizes", href: GRAVEL.peaSizes, description: "1/4 to 5/8 inch grades and what each suits.", category: "Guide", icon: Ruler },
  { title: "Pea Gravel Cost", href: GRAVEL.peaCost, description: "Per ton, per yard and per bag, priced honestly.", category: "Guide", icon: DollarSign },
  { title: "Pea Gravel Coverage", href: GRAVEL.peaCoverage, description: "Coverage tables at every practical depth.", category: "Guide", icon: Grid3x3 },
  { title: "Pea Gravel Landscaping Guide", href: GRAVEL.peaLandscaping, description: "Paths, patios, xeriscapes and drainage done right.", category: "Guide", icon: Sprout },
  { title: "Pea Gravel Installation Guide", href: GRAVEL.peaInstall, description: "Base, edging and depth — the 90-minute skill.", category: "Guide", icon: Wrench },
  { title: "Pea Gravel FAQ", href: GRAVEL.peaFaq, description: "Migration, weeds, dogs and other realities.", category: "FAQ", icon: HelpCircle },
];

export const stoneGuideLinks: RelatedArticle[] = [
  { title: "Crushed Stone Sizes", href: GRAVEL.stoneSizes, description: "#1 through #10 and stone dust, decoded.", category: "Guide", icon: Ruler },
  { title: "Crushed Stone Weight", href: GRAVEL.stoneWeight, description: "Loose vs compacted, by size and type.", category: "Guide", icon: Scale },
  { title: "Crushed Stone Cost", href: GRAVEL.stoneCost, description: "Per-ton pricing from crusher run to specialty.", category: "Guide", icon: DollarSign },
  { title: "Crushed Stone vs Gravel", href: GRAVEL.stoneVsGravel, description: "Angular vs rounded — why it changes everything.", category: "Comparison", icon: GitCompareArrows },
  { title: "Crushed Stone Best Uses", href: GRAVEL.stoneUses, description: "Matching stone size to job, from French drains to bases.", category: "Guide", icon: Hammer },
  { title: "Crushed Stone Coverage Chart", href: GRAVEL.stoneCoverage, description: "Coverage per ton at every depth.", category: "Chart", icon: Grid3x3 },
];

export const drivewayGuideLinks: RelatedArticle[] = [
  { title: "Driveway Gravel Depth", href: GRAVEL.drivewayDepth, description: "Total depth and per-layer thickness that lasts.", category: "Guide", icon: Ruler },
  { title: "Driveway Base Layers", href: GRAVEL.drivewayLayers, description: "The three-layer system, bottom to top.", category: "Guide", icon: Layers },
  { title: "Best Gravel for Driveways", href: GRAVEL.drivewayTypes, description: "Crusher run, #57 and what to avoid.", category: "Guide", icon: Car },
  { title: "Gravel Driveway Cost", href: GRAVEL.drivewayCost, description: "Installed pricing with real line items.", category: "Guide", icon: DollarSign },
  { title: "Gravel Driveway Installation", href: GRAVEL.drivewayInstall, description: "Grading, geotextile, layers and crowning.", category: "Guide", icon: Wrench },
];

export const costGuideLinks: RelatedArticle[] = [
  { title: "Gravel Price Guide", href: GRAVEL.priceGuide, description: "2026 pricing across every common type.", category: "Guide", icon: DollarSign },
  { title: "Gravel Delivery Cost", href: GRAVEL.deliveryCost, description: "Flat fees, minimums and free-delivery thresholds.", category: "Guide", icon: Truck },
  { title: "Gravel Cost Per Ton", href: GRAVEL.costPerTon, description: "Ton pricing and how to compare quotes.", category: "Guide", icon: Scale },
  { title: "Gravel Cost Per Cubic Yard", href: GRAVEL.costPerYard, description: "Yard pricing — and converting it to tons.", category: "Guide", icon: ArrowLeftRight },
  { title: "Gravel Labor Cost", href: GRAVEL.laborCost, description: "Spreading, grading and compaction rates.", category: "Guide", icon: Wrench },
];

/** Standalone reference pages — high-authority internal link targets. */
export const referenceLinks: RelatedArticle[] = [
  { title: "Gravel Density Database", href: GRAVEL.refDensity, description: "30+ aggregates with loose and compacted unit weights.", category: "Reference", icon: Database },
  { title: "Gravel Size Chart", href: GRAVEL.refSizes, description: "Every standard size number with dimensions and uses.", category: "Reference", icon: Table2 },
];

export const allGravelGuides: RelatedArticle[] = [
  ...coreGuideLinks,
  ...peaGuideLinks,
  ...stoneGuideLinks,
  ...drivewayGuideLinks,
  ...costGuideLinks,
];

/** Pick a subset of links by href — keeps per-page related lists short and curated. */
export function pickLinks(from: RelatedArticle[], ...hrefs: string[]): RelatedArticle[] {
  return hrefs
    .map((href) => from.find((l) => l.href === href))
    .filter((l): l is RelatedArticle => Boolean(l));
}

/** Frequently cited aggregate standards and references. */
export const GREFS: Record<string, Reference> = {
  astmC33: {
    title: "ASTM C33/C33M: Standard Specification for Concrete Aggregates",
    publisher: "ASTM International",
    url: "https://www.astm.org/c0033_c0033m-18.html",
    year: 2018,
  },
  astmD448: {
    title: "ASTM D448: Standard Classification for Sizes of Aggregate",
    publisher: "ASTM International",
    url: "https://www.astm.org/d0448-12r17.html",
    year: 2017,
  },
  astmC29: {
    title: "ASTM C29/C29M: Bulk Density (Unit Weight) and Voids in Aggregate",
    publisher: "ASTM International",
    url: "https://www.astm.org/c0029_c0029m-17a.html",
    year: 2017,
  },
  aashtoM43: {
    title: "AASHTO M 43: Sizes of Aggregate for Road and Bridge Construction",
    publisher: "AASHTO",
    url: "https://store.transportation.org/",
    year: 2018,
  },
  usgs: {
    title: "Crushed Stone and Sand & Gravel Statistics and Information",
    publisher: "US Geological Survey, Mineral Commodity Summaries",
    url: "https://www.usgs.gov/centers/national-minerals-information-center/crushed-stone-statistics-and-information",
    year: 2025,
  },
  fhwaGravel: {
    title: "Gravel Roads Construction & Maintenance Guide",
    publisher: "FHWA / South Dakota LTAP",
    url: "https://www.fhwa.dot.gov/construction/pubs/ots15002.pdf",
    year: 2015,
  },
  nssga: {
    title: "The Aggregates Handbook, 2nd ed.",
    publisher: "National Stone, Sand & Gravel Association",
    url: "https://www.nssga.org/",
    year: 2013,
  },
};
