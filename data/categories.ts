import type { CategoryInfo } from "@/types";
import { Layers, Mountain, Waves, TrafficCone } from "lucide-react";

/**
 * Material categories. Add a new entry here when launching a category —
 * navigation, breadcrumbs and category pages all read from this list.
 */
export const categories: CategoryInfo[] = [
  {
    slug: "concrete",
    name: "Concrete",
    description:
      "Volume, bags, slabs, footings, columns — plus density charts, cost guides and mix comparisons.",
    icon: Layers,
  },
  {
    slug: "asphalt",
    name: "Asphalt",
    description:
      "Tonnage, driveway, weight, cost and volume calculators — with density charts, thickness guides and installed pricing.",
    icon: TrafficCone,
  },
  {
    slug: "gravel",
    name: "Gravel",
    description:
      "Gravel, pea gravel, crushed stone and driveway calculators — plus density, size, weight and coverage reference charts.",
    icon: Mountain,
  },
  {
    slug: "sand",
    name: "Sand",
    description: "Fill, paver base and masonry sand estimators with density tables.",
    icon: Waves,
    comingSoon: true,
  },
];

export function getCategory(slug: string): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}

export const liveCategories = categories.filter((c) => !c.comingSoon);
