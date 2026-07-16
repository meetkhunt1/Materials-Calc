import type { RelatedArticle, Reference } from "@/types";
import {
  Calculator,
  Car,
  Weight,
  DollarSign,
  Box,
  BookOpen,
  Scale,
  Grid3x3,
  Ruler,
  GitCompareArrows,
  HelpCircle,
  Wrench,
  Clock,
  Truck,
  ArrowLeftRight,
  Flame,
  MapPin,
  PiggyBank,
  Pencil,
} from "lucide-react";

/**
 * Single source of truth for asphalt-cluster internal links.
 * Grouped by the calculator each supporting set belongs to.
 */

export const ASPHALT = {
  hub: "/asphalt",
  // Calculators
  calculator: "/asphalt/asphalt-calculator",
  driveway: "/asphalt/asphalt-driveway-calculator",
  weight: "/asphalt/asphalt-weight-calculator",
  cost: "/asphalt/asphalt-cost-calculator",
  volume: "/asphalt/asphalt-volume-calculator",
  // Core set (Asphalt Calculator)
  howTo: "/asphalt/how-to-calculate-asphalt",
  densityChart: "/asphalt/asphalt-density-chart",
  coverage: "/asphalt/asphalt-coverage-guide",
  costGuide: "/asphalt/asphalt-cost-guide",
  thickness: "/asphalt/asphalt-thickness-guide",
  vsConcrete: "/asphalt/asphalt-vs-concrete",
  faqs: "/asphalt/asphalt-faqs",
  // Driveway set
  drivewayDimensions: "/asphalt/standard-driveway-dimensions",
  drivewayThickness: "/asphalt/best-asphalt-thickness-for-driveways",
  drivewayInstall: "/asphalt/driveway-installation-guide",
  drivewayCost: "/asphalt/driveway-cost-guide",
  drivewayMaintenance: "/asphalt/driveway-maintenance",
  drivewayLifespan: "/asphalt/driveway-lifespan",
  drivewayFaqs: "/asphalt/driveway-faqs",
  // Weight set
  weightChart: "/asphalt/asphalt-weight-chart",
  tonsVsYards: "/asphalt/tons-vs-cubic-yards",
  densityExplained: "/asphalt/asphalt-density-explained",
  weightConversion: "/asphalt/weight-conversion-guide",
  truckCapacity: "/asphalt/truck-load-capacity",
  hotVsColdWeight: "/asphalt/hot-mix-vs-cold-mix-weight",
  weightFaqs: "/asphalt/asphalt-weight-faqs",
  // Cost set
  pricePerTon: "/asphalt/asphalt-price-per-ton",
  costPerSqft: "/asphalt/asphalt-cost-per-square-foot",
  laborCost: "/asphalt/asphalt-labor-cost-guide",
  equipmentCost: "/asphalt/asphalt-equipment-cost",
  costSaving: "/asphalt/asphalt-cost-saving-tips",
  regionalPrices: "/asphalt/regional-asphalt-price-factors",
  costFaqs: "/asphalt/asphalt-cost-faqs",
  // Volume set
  cubicYardGuide: "/asphalt/asphalt-cubic-yard-guide",
  cubicFootGuide: "/asphalt/asphalt-cubic-foot-guide",
  volumeFormula: "/asphalt/asphalt-volume-formula",
  densityAndVolume: "/asphalt/asphalt-density-and-volume",
  measurement: "/asphalt/asphalt-measurement-guide",
  unitConversion: "/asphalt/asphalt-unit-conversion",
  volumeFaqs: "/asphalt/asphalt-volume-faqs",
} as const;

export const asphaltCalculatorLinks: RelatedArticle[] = [
  {
    title: "Asphalt Calculator",
    href: ASPHALT.calculator,
    description: "Tons, cubic yards and weight for any paving area.",
    category: "Calculator",
    icon: Calculator,
  },
  {
    title: "Asphalt Driveway Calculator",
    href: ASPHALT.driveway,
    description: "Driveway tonnage plus the gravel base underneath.",
    category: "Calculator",
    icon: Car,
  },
  {
    title: "Asphalt Weight Calculator",
    href: ASPHALT.weight,
    description: "Convert any volume to tons for ordering and hauling.",
    category: "Calculator",
    icon: Weight,
  },
  {
    title: "Asphalt Cost Calculator",
    href: ASPHALT.cost,
    description: "Material cost from area, thickness and price per ton.",
    category: "Calculator",
    icon: DollarSign,
  },
  {
    title: "Asphalt Volume Calculator",
    href: ASPHALT.volume,
    description: "Cubic yards, feet and meters from plan dimensions.",
    category: "Calculator",
    icon: Box,
  },
];

export const coreGuideLinks: RelatedArticle[] = [
  { title: "How to Calculate Asphalt", href: ASPHALT.howTo, description: "Area × depth × density — the full takeoff method.", category: "Guide", icon: BookOpen },
  { title: "Asphalt Density Chart", href: ASPHALT.densityChart, description: "Unit weights for hot mix, cold mix and millings.", category: "Chart", icon: Scale },
  { title: "Asphalt Coverage Guide", href: ASPHALT.coverage, description: "What one ton covers at every thickness.", category: "Guide", icon: Grid3x3 },
  { title: "Asphalt Cost Guide", href: ASPHALT.costGuide, description: "Per-ton and installed pricing, fees included.", category: "Guide", icon: DollarSign },
  { title: "Asphalt Thickness Guide", href: ASPHALT.thickness, description: "Lift thickness by application, base to surface.", category: "Guide", icon: Ruler },
  { title: "Asphalt vs Concrete", href: ASPHALT.vsConcrete, description: "The paving decision from asphalt's corner.", category: "Comparison", icon: GitCompareArrows },
  { title: "Asphalt FAQs", href: ASPHALT.faqs, description: "The questions every first-time paver asks.", category: "FAQ", icon: HelpCircle },
];

export const drivewayGuideLinks: RelatedArticle[] = [
  { title: "Standard Driveway Dimensions", href: ASPHALT.drivewayDimensions, description: "Widths, lengths and turning space that work.", category: "Guide", icon: Ruler },
  { title: "Best Asphalt Thickness for Driveways", href: ASPHALT.drivewayThickness, description: "2, 3 or 4 inches — matched to your vehicles.", category: "Guide", icon: Pencil },
  { title: "Driveway Installation Guide", href: ASPHALT.drivewayInstall, description: "From excavation to final roll, step by step.", category: "Guide", icon: Wrench },
  { title: "Driveway Cost Guide", href: ASPHALT.drivewayCost, description: "Installed pricing with real line items.", category: "Guide", icon: DollarSign },
  { title: "Driveway Maintenance", href: ASPHALT.drivewayMaintenance, description: "Sealcoating, crack filling and the schedule.", category: "Guide", icon: Wrench },
  { title: "Driveway Lifespan", href: ASPHALT.drivewayLifespan, description: "What 15–25 years actually depends on.", category: "Guide", icon: Clock },
  { title: "Driveway FAQs", href: ASPHALT.drivewayFaqs, description: "Curing, sealing, weight limits and more.", category: "FAQ", icon: HelpCircle },
];

export const weightGuideLinks: RelatedArticle[] = [
  { title: "Asphalt Weight Chart", href: ASPHALT.weightChart, description: "Pounds and tons per cubic yard, foot and meter.", category: "Chart", icon: Scale },
  { title: "Tons vs Cubic Yards", href: ASPHALT.tonsVsYards, description: "Why plants sell weight but you measure volume.", category: "Guide", icon: ArrowLeftRight },
  { title: "Asphalt Density Explained", href: ASPHALT.densityExplained, description: "Loose vs compacted, and why it matters.", category: "Guide", icon: Scale },
  { title: "Weight Conversion Guide", href: ASPHALT.weightConversion, description: "Tons, tonnes, pounds and kilograms without errors.", category: "Guide", icon: ArrowLeftRight },
  { title: "Truck Load Capacity", href: ASPHALT.truckCapacity, description: "What each truck class hauls, legally.", category: "Guide", icon: Truck },
  { title: "Hot Mix vs Cold Mix Weight", href: ASPHALT.hotVsColdWeight, description: "Density differences that change your order.", category: "Comparison", icon: Flame },
  { title: "Asphalt Weight FAQs", href: ASPHALT.weightFaqs, description: "Quick answers on tonnage and hauling.", category: "FAQ", icon: HelpCircle },
];

export const costGuideLinks: RelatedArticle[] = [
  { title: "Asphalt Price Per Ton", href: ASPHALT.pricePerTon, description: "2026 plant pricing and what moves it.", category: "Guide", icon: DollarSign },
  { title: "Cost Per Square Foot", href: ASPHALT.costPerSqft, description: "Installed $/ft² by thickness and job size.", category: "Guide", icon: Grid3x3 },
  { title: "Labor Cost Guide", href: ASPHALT.laborCost, description: "Crew composition and productivity rates.", category: "Guide", icon: Wrench },
  { title: "Equipment Cost", href: ASPHALT.equipmentCost, description: "Pavers, rollers and what they add per job.", category: "Guide", icon: Truck },
  { title: "Cost Saving Tips", href: ASPHALT.costSaving, description: "Where to save — and where never to.", category: "Guide", icon: PiggyBank },
  { title: "Regional Price Factors", href: ASPHALT.regionalPrices, description: "Why the same driveway varies 40% by state.", category: "Guide", icon: MapPin },
  { title: "Asphalt Cost FAQs", href: ASPHALT.costFaqs, description: "Budget questions, straight answers.", category: "FAQ", icon: HelpCircle },
];

export const volumeGuideLinks: RelatedArticle[] = [
  { title: "Cubic Yard Guide", href: ASPHALT.cubicYardGuide, description: "The estimator's unit, explained properly.", category: "Guide", icon: Box },
  { title: "Cubic Foot Guide", href: ASPHALT.cubicFootGuide, description: "Small-batch math for repairs and patches.", category: "Guide", icon: Box },
  { title: "Volume Formula", href: ASPHALT.volumeFormula, description: "Area × depth, with every unit trap flagged.", category: "Guide", icon: BookOpen },
  { title: "Density & Volume", href: ASPHALT.densityAndVolume, description: "How the two combine into an order in tons.", category: "Guide", icon: Scale },
  { title: "Measurement Guide", href: ASPHALT.measurement, description: "Measuring irregular areas without a survey crew.", category: "Guide", icon: Ruler },
  { title: "Unit Conversion", href: ASPHALT.unitConversion, description: "Yards, feet, meters, tons — one reference table.", category: "Guide", icon: ArrowLeftRight },
  { title: "Asphalt Volume FAQs", href: ASPHALT.volumeFaqs, description: "Volume questions answered in plain numbers.", category: "FAQ", icon: HelpCircle },
];

export const allAsphaltGuides: RelatedArticle[] = [
  ...coreGuideLinks,
  ...drivewayGuideLinks,
  ...weightGuideLinks,
  ...costGuideLinks,
  ...volumeGuideLinks,
];

/** Pick a subset of links by href — keeps per-page related lists short and curated. */
export function pickLinks(from: RelatedArticle[], ...hrefs: string[]): RelatedArticle[] {
  return hrefs
    .map((href) => from.find((l) => l.href === href))
    .filter((l): l is RelatedArticle => Boolean(l));
}

/** Frequently cited asphalt standards and references. */
export const AREFS: Record<string, Reference> = {
  ms2: {
    title: "MS-2: Asphalt Mix Design Methods, 7th ed.",
    publisher: "Asphalt Institute",
    url: "https://www.asphaltinstitute.org/engineering/asphalt-mix-design/",
    year: 2014,
  },
  ms4: {
    title: "MS-4: The Asphalt Handbook, 7th ed.",
    publisher: "Asphalt Institute",
    url: "https://www.asphaltinstitute.org/",
    year: 2007,
  },
  astmD2726: {
    title: "ASTM D2726: Bulk Specific Gravity of Compacted Asphalt Mixtures",
    publisher: "ASTM International",
    url: "https://www.astm.org/d2726_d2726m-21.html",
    year: 2021,
  },
  astmD6373: {
    title: "ASTM D6373: Standard Specification for Performance-Graded Asphalt Binder",
    publisher: "ASTM International",
    url: "https://www.astm.org/d6373-21a.html",
    year: 2021,
  },
  napa: {
    title: "Asphalt Pavement Design Guide (APD-1)",
    publisher: "National Asphalt Pavement Association",
    url: "https://www.asphaltpavement.org/",
    year: 2020,
  },
  fhwa: {
    title: "HMA Pavement Mix Type Selection Guide",
    publisher: "FHWA / NAPA (IS-128)",
    url: "https://www.fhwa.dot.gov/pavement/asphalt/",
    year: 2001,
  },
  aashto: {
    title: "AASHTO M 323: Superpave Volumetric Mix Design",
    publisher: "AASHTO",
    url: "https://store.transportation.org/",
    year: 2022,
  },
  bridgeFormula: {
    title: "Federal Bridge Formula & Truck Size and Weight Limits (23 CFR 658)",
    publisher: "FHWA, US DOT",
    url: "https://ops.fhwa.dot.gov/freight/sw/overview/index.htm",
    year: 2019,
  },
};
