/**
 * Static search index consumed by <SiteSearch>.
 * Append an entry whenever a new page ships — keeps search dependency-free
 * and zero-cost at runtime (no API, no client fetch). Also feeds sitemap.xml.
 */
export interface SearchEntry {
  title: string;
  href: string;
  category: string;
  keywords?: string[];
}

export const searchIndex: SearchEntry[] = [
  // ——— Concrete: calculators ———
  {
    title: "Concrete Calculator",
    href: "/concrete/concrete-calculator",
    category: "Concrete",
    keywords: ["volume", "yards", "bags", "weight", "ready-mix"],
  },
  {
    title: "Concrete Slab Calculator",
    href: "/concrete/concrete-slab-calculator",
    category: "Concrete",
    keywords: ["patio", "driveway", "garage floor", "thickness", "slab"],
  },
  {
    title: "Concrete Footing Calculator",
    href: "/concrete/concrete-footing-calculator",
    category: "Concrete",
    keywords: ["footing", "foundation", "strip", "trench", "frost depth"],
  },
  {
    title: "Concrete Wall Calculator",
    href: "/concrete/concrete-wall-calculator",
    category: "Concrete",
    keywords: ["wall", "foundation wall", "retaining", "basement", "formwork"],
  },
  {
    title: "Concrete Column Calculator",
    href: "/concrete/concrete-column-calculator",
    category: "Concrete",
    keywords: ["column", "pier", "sonotube", "deck", "post", "round"],
  },
  // ——— Concrete: guides ———
  {
    title: "How to Calculate Concrete",
    href: "/concrete/how-to-calculate-concrete",
    category: "Concrete",
    keywords: ["formula", "method", "takeoff", "cubic yards", "estimate"],
  },
  {
    title: "Concrete Cost Guide",
    href: "/concrete/concrete-cost-guide",
    category: "Concrete",
    keywords: ["price", "cost per yard", "ready-mix price", "bags", "fees"],
  },
  {
    title: "Concrete Density Chart",
    href: "/concrete/concrete-density-chart",
    category: "Concrete",
    keywords: ["density", "unit weight", "kg/m3", "lb/ft3", "lightweight"],
  },
  {
    title: "Concrete Coverage Guide",
    href: "/concrete/concrete-coverage-guide",
    category: "Concrete",
    keywords: ["coverage", "square feet", "yard covers", "bag covers"],
  },
  {
    title: "Concrete Mix Ratio Guide",
    href: "/concrete/concrete-mix-ratio-guide",
    category: "Concrete",
    keywords: ["mix ratio", "1:2:4", "M20", "water cement ratio", "batching"],
  },
  {
    title: "Concrete Curing Guide",
    href: "/concrete/concrete-curing-guide",
    category: "Concrete",
    keywords: ["curing", "28 days", "strength", "cure time", "cold weather"],
  },
  {
    title: "Concrete vs Asphalt",
    href: "/concrete/concrete-vs-asphalt",
    category: "Concrete",
    keywords: ["comparison", "driveway", "asphalt", "cost", "lifespan"],
  },
  // ——— Asphalt: calculators ———
  { title: "Asphalt Calculator", href: "/asphalt/asphalt-calculator", category: "Asphalt", keywords: ["tons", "tonnage", "hot mix", "paving"] },
  { title: "Asphalt Driveway Calculator", href: "/asphalt/asphalt-driveway-calculator", category: "Asphalt", keywords: ["driveway", "tons", "gravel base", "paving"] },
  { title: "Asphalt Weight Calculator", href: "/asphalt/asphalt-weight-calculator", category: "Asphalt", keywords: ["weight", "tons", "volume to tons", "hauling"] },
  { title: "Asphalt Cost Calculator", href: "/asphalt/asphalt-cost-calculator", category: "Asphalt", keywords: ["cost", "price", "budget", "installed"] },
  { title: "Asphalt Volume Calculator", href: "/asphalt/asphalt-volume-calculator", category: "Asphalt", keywords: ["volume", "cubic yards", "cubic feet"] },
  // ——— Asphalt: core guides ———
  { title: "How to Calculate Asphalt", href: "/asphalt/how-to-calculate-asphalt", category: "Asphalt", keywords: ["formula", "method", "takeoff", "tons"] },
  { title: "Asphalt Density Chart", href: "/asphalt/asphalt-density-chart", category: "Asphalt", keywords: ["density", "unit weight", "145", "kg/m3"] },
  { title: "Asphalt Coverage Guide", href: "/asphalt/asphalt-coverage-guide", category: "Asphalt", keywords: ["coverage", "ton covers", "square feet"] },
  { title: "Asphalt Cost Guide", href: "/asphalt/asphalt-cost-guide", category: "Asphalt", keywords: ["cost", "price per ton", "installed price"] },
  { title: "Asphalt Thickness Guide", href: "/asphalt/asphalt-thickness-guide", category: "Asphalt", keywords: ["thickness", "lifts", "base course", "surface"] },
  { title: "Asphalt vs Concrete", href: "/asphalt/asphalt-vs-concrete", category: "Asphalt", keywords: ["comparison", "concrete", "driveway", "cost"] },
  { title: "Asphalt FAQs", href: "/asphalt/asphalt-faqs", category: "Asphalt", keywords: ["questions", "answers", "paving basics"] },
  // ——— Asphalt: driveway series ———
  { title: "Standard Driveway Dimensions", href: "/asphalt/standard-driveway-dimensions", category: "Asphalt", keywords: ["width", "length", "single car", "double"] },
  { title: "Best Asphalt Thickness for Driveways", href: "/asphalt/best-asphalt-thickness-for-driveways", category: "Asphalt", keywords: ["thickness", "2 inch", "3 inch", "driveway"] },
  { title: "Driveway Installation Guide", href: "/asphalt/driveway-installation-guide", category: "Asphalt", keywords: ["install", "excavation", "base", "paving steps"] },
  { title: "Driveway Cost Guide", href: "/asphalt/driveway-cost-guide", category: "Asphalt", keywords: ["driveway cost", "installed", "per square foot"] },
  { title: "Driveway Maintenance", href: "/asphalt/driveway-maintenance", category: "Asphalt", keywords: ["sealcoat", "crack filling", "maintenance schedule"] },
  { title: "Driveway Lifespan", href: "/asphalt/driveway-lifespan", category: "Asphalt", keywords: ["lifespan", "how long", "15 years", "replacement"] },
  { title: "Driveway FAQs", href: "/asphalt/driveway-faqs", category: "Asphalt", keywords: ["driveway questions", "curing", "sealing"] },
  // ——— Asphalt: weight series ———
  { title: "Asphalt Weight Chart", href: "/asphalt/asphalt-weight-chart", category: "Asphalt", keywords: ["weight chart", "per yard", "per foot"] },
  { title: "Tons vs Cubic Yards", href: "/asphalt/tons-vs-cubic-yards", category: "Asphalt", keywords: ["tons", "cubic yards", "convert"] },
  { title: "Asphalt Density Explained", href: "/asphalt/asphalt-density-explained", category: "Asphalt", keywords: ["density", "loose", "compacted", "marshall"] },
  { title: "Weight Conversion Guide", href: "/asphalt/weight-conversion-guide", category: "Asphalt", keywords: ["tons", "tonnes", "pounds", "kilograms"] },
  { title: "Truck Load Capacity", href: "/asphalt/truck-load-capacity", category: "Asphalt", keywords: ["dump truck", "payload", "tandem", "tri-axle"] },
  { title: "Hot Mix vs Cold Mix Weight", href: "/asphalt/hot-mix-vs-cold-mix-weight", category: "Asphalt", keywords: ["hot mix", "cold mix", "density difference"] },
  { title: "Asphalt Weight FAQs", href: "/asphalt/asphalt-weight-faqs", category: "Asphalt", keywords: ["weight questions", "tonnage"] },
  // ——— Asphalt: cost series ———
  { title: "Asphalt Price Per Ton", href: "/asphalt/asphalt-price-per-ton", category: "Asphalt", keywords: ["price per ton", "hot mix price", "2026"] },
  { title: "Asphalt Cost Per Square Foot", href: "/asphalt/asphalt-cost-per-square-foot", category: "Asphalt", keywords: ["cost per square foot", "installed"] },
  { title: "Asphalt Labor Cost Guide", href: "/asphalt/asphalt-labor-cost-guide", category: "Asphalt", keywords: ["labor", "crew", "paving wages"] },
  { title: "Asphalt Equipment Cost", href: "/asphalt/asphalt-equipment-cost", category: "Asphalt", keywords: ["paver", "roller", "equipment rental"] },
  { title: "Asphalt Cost Saving Tips", href: "/asphalt/asphalt-cost-saving-tips", category: "Asphalt", keywords: ["save money", "cheaper", "tips"] },
  { title: "Regional Asphalt Price Factors", href: "/asphalt/regional-asphalt-price-factors", category: "Asphalt", keywords: ["regional", "by state", "price factors"] },
  { title: "Asphalt Cost FAQs", href: "/asphalt/asphalt-cost-faqs", category: "Asphalt", keywords: ["cost questions", "budget"] },
  // ——— Asphalt: volume series ———
  { title: "Asphalt Cubic Yard Guide", href: "/asphalt/asphalt-cubic-yard-guide", category: "Asphalt", keywords: ["cubic yard", "27 cubic feet"] },
  { title: "Asphalt Cubic Foot Guide", href: "/asphalt/asphalt-cubic-foot-guide", category: "Asphalt", keywords: ["cubic foot", "small batch", "patch"] },
  { title: "Asphalt Volume Formula", href: "/asphalt/asphalt-volume-formula", category: "Asphalt", keywords: ["formula", "length width depth"] },
  { title: "Asphalt Density & Volume", href: "/asphalt/asphalt-density-and-volume", category: "Asphalt", keywords: ["density", "volume", "tons"] },
  { title: "Asphalt Measurement Guide", href: "/asphalt/asphalt-measurement-guide", category: "Asphalt", keywords: ["measure", "irregular area", "takeoff"] },
  { title: "Asphalt Unit Conversion", href: "/asphalt/asphalt-unit-conversion", category: "Asphalt", keywords: ["convert", "yards", "meters", "tons"] },
  { title: "Asphalt Volume FAQs", href: "/asphalt/asphalt-volume-faqs", category: "Asphalt", keywords: ["volume questions"] },
  // ——— Gravel: calculators ———
  { title: "Gravel Calculator", href: "/gravel/gravel-calculator", category: "Gravel", keywords: ["tons", "cubic yards", "how much gravel"] },
  { title: "Pea Gravel Calculator", href: "/gravel/pea-gravel-calculator", category: "Gravel", keywords: ["pea gravel", "bags", "patio", "path"] },
  { title: "Crushed Stone Calculator", href: "/gravel/crushed-stone-calculator", category: "Gravel", keywords: ["crushed stone", "#57", "crusher run"] },
  { title: "Driveway Gravel Calculator", href: "/gravel/driveway-gravel-calculator", category: "Gravel", keywords: ["driveway", "layers", "base", "tons"] },
  { title: "Gravel Cost Calculator", href: "/gravel/gravel-cost-calculator", category: "Gravel", keywords: ["cost", "price", "budget", "delivered"] },
  // ——— Gravel: core guides ———
  { title: "How to Calculate Gravel", href: "/gravel/how-to-calculate-gravel", category: "Gravel", keywords: ["formula", "method", "tons", "yards"] },
  { title: "Gravel Density Chart", href: "/gravel/gravel-density-chart", category: "Gravel", keywords: ["density", "unit weight", "lb/ft3"] },
  { title: "Gravel Coverage Guide", href: "/gravel/gravel-coverage-guide", category: "Gravel", keywords: ["coverage", "ton covers", "square feet"] },
  { title: "Gravel Weight Chart", href: "/gravel/gravel-weight-chart", category: "Gravel", keywords: ["weight", "per yard", "per foot"] },
  { title: "Gravel Volume Formula", href: "/gravel/gravel-volume-formula", category: "Gravel", keywords: ["volume", "formula", "cubic yards"] },
  { title: "Gravel Measurement Guide", href: "/gravel/gravel-measurement-guide", category: "Gravel", keywords: ["measure", "irregular", "takeoff"] },
  { title: "Gravel FAQ", href: "/gravel/gravel-faq", category: "Gravel", keywords: ["questions", "answers", "basics"] },
  // ——— Gravel: pea gravel series ———
  { title: "What Is Pea Gravel?", href: "/gravel/what-is-pea-gravel", category: "Gravel", keywords: ["pea gravel", "rounded stone", "uses"] },
  { title: "Pea Gravel Sizes", href: "/gravel/pea-gravel-sizes", category: "Gravel", keywords: ["sizes", "3/8 inch", "grades"] },
  { title: "Pea Gravel Cost", href: "/gravel/pea-gravel-cost", category: "Gravel", keywords: ["cost", "per ton", "per bag"] },
  { title: "Pea Gravel Coverage", href: "/gravel/pea-gravel-coverage", category: "Gravel", keywords: ["coverage", "depth", "square feet"] },
  { title: "Pea Gravel Landscaping Guide", href: "/gravel/pea-gravel-landscaping-guide", category: "Gravel", keywords: ["landscaping", "paths", "xeriscape"] },
  { title: "Pea Gravel Installation Guide", href: "/gravel/pea-gravel-installation-guide", category: "Gravel", keywords: ["install", "edging", "base", "fabric"] },
  { title: "Pea Gravel FAQ", href: "/gravel/pea-gravel-faq", category: "Gravel", keywords: ["pea gravel questions"] },
  // ——— Gravel: crushed stone series ———
  { title: "Crushed Stone Sizes", href: "/gravel/crushed-stone-sizes", category: "Gravel", keywords: ["sizes", "#57", "#2", "stone dust"] },
  { title: "Crushed Stone Weight", href: "/gravel/crushed-stone-weight", category: "Gravel", keywords: ["weight", "loose", "compacted"] },
  { title: "Crushed Stone Cost", href: "/gravel/crushed-stone-cost", category: "Gravel", keywords: ["cost", "per ton", "crusher run price"] },
  { title: "Crushed Stone vs Gravel", href: "/gravel/crushed-stone-vs-gravel", category: "Gravel", keywords: ["comparison", "angular", "rounded"] },
  { title: "Crushed Stone Best Uses", href: "/gravel/crushed-stone-best-uses", category: "Gravel", keywords: ["uses", "drainage", "base", "french drain"] },
  { title: "Crushed Stone Coverage Chart", href: "/gravel/crushed-stone-coverage-chart", category: "Gravel", keywords: ["coverage", "per ton", "chart"] },
  // ——— Gravel: driveway series ———
  { title: "Driveway Gravel Depth", href: "/gravel/driveway-gravel-depth", category: "Gravel", keywords: ["depth", "how deep", "layers"] },
  { title: "Driveway Gravel Base Layers", href: "/gravel/driveway-gravel-base-layers", category: "Gravel", keywords: ["base", "layers", "sub-base"] },
  { title: "Best Gravel for Driveways", href: "/gravel/best-gravel-for-driveways", category: "Gravel", keywords: ["best gravel", "crusher run", "types"] },
  { title: "Gravel Driveway Cost", href: "/gravel/gravel-driveway-cost", category: "Gravel", keywords: ["driveway cost", "installed", "per foot"] },
  { title: "Gravel Driveway Installation", href: "/gravel/gravel-driveway-installation", category: "Gravel", keywords: ["install", "grading", "geotextile", "crown"] },
  // ——— Gravel: cost series ———
  { title: "Gravel Price Guide", href: "/gravel/gravel-price-guide", category: "Gravel", keywords: ["prices", "2026", "by type"] },
  { title: "Gravel Delivery Cost", href: "/gravel/gravel-delivery-cost", category: "Gravel", keywords: ["delivery", "fees", "minimums"] },
  { title: "Gravel Cost Per Ton", href: "/gravel/gravel-cost-per-ton", category: "Gravel", keywords: ["cost per ton", "compare quotes"] },
  { title: "Gravel Cost Per Cubic Yard", href: "/gravel/gravel-cost-per-cubic-yard", category: "Gravel", keywords: ["cost per yard", "convert to tons"] },
  { title: "Gravel Labor Cost", href: "/gravel/gravel-labor-cost", category: "Gravel", keywords: ["labor", "spreading", "grading"] },
  // ——— Gravel: reference pages ———
  { title: "Gravel Density Database", href: "/gravel/gravel-density-database", category: "Gravel", keywords: ["density database", "all aggregates", "unit weights"] },
  { title: "Gravel Size Chart", href: "/gravel/gravel-size-chart", category: "Gravel", keywords: ["size chart", "aggregate sizes", "#57"] },
];
