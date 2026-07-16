import type { LucideIcon } from "lucide-react";

/* ---------------------------------- Units --------------------------------- */

export type UnitCategory =
  | "length"
  | "area"
  | "volume"
  | "weight"
  | "density"
  | "currency"
  | "none";

export interface Unit {
  /** Machine id, e.g. "m", "ft", "yd3" */
  id: string;
  /** Short label, e.g. "m", "ft", "yd³" */
  label: string;
  /** Full name, e.g. "meters" */
  name: string;
  /** Multiplier to convert a value in this unit to the category base unit */
  toBase: number;
  category: UnitCategory;
}

/* ------------------------------- Calculator ------------------------------- */

export type CalculatorFieldType = "number" | "select" | "slider";

export interface SelectOption {
  value: string;
  label: string;
  /** Optional data payload, e.g. a density value attached to a material option */
  data?: Record<string, number>;
}

export interface CalculatorField {
  id: string;
  label: string;
  type: CalculatorFieldType;
  /** Help text rendered under the field */
  hint?: string;
  placeholder?: string;
  defaultValue?: number | string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  /** Unit category — renders a unit dropdown next to the input */
  unitCategory?: Exclude<UnitCategory, "none">;
  /** Restrict/order the selectable units; defaults to all units of the category */
  units?: string[];
  /** Default selected unit id */
  defaultUnit?: string;
  options?: SelectOption[];
}

export interface CalculatorResultItem {
  id: string;
  label: string;
  value: number;
  /** Display unit label, e.g. "yd³" */
  unit?: string;
  /** Number of decimals to show (default 2) */
  precision?: number;
  /** Highlight as the primary answer */
  primary?: boolean;
  note?: string;
}

export interface FieldValue {
  /** Raw numeric value or select value as entered */
  value: number | string;
  /** Selected unit id when the field has a unitCategory */
  unit?: string;
}

export type CalculatorValues = Record<string, FieldValue>;

export interface CalculatorDefinition {
  id: string;
  name: string;
  description?: string;
  fields: CalculatorField[];
  /**
   * Compute results from normalized inputs.
   * Numeric unit fields are pre-converted to their category base unit
   * (length→m, area→m², volume→m³, weight→kg, density→kg/m³).
   */
  compute: (inputs: Record<string, number | string>) => CalculatorResultItem[];
  /** Optional footnote shown under results */
  disclaimer?: string;
}

export interface ValidationError {
  fieldId: string;
  message: string;
}

/* --------------------------------- Content -------------------------------- */

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  url?: string;
  sameAs?: string[];
}

export interface FaqItem {
  question: string;
  /** Plain text or simple HTML-free markdown-ish string */
  answer: string;
}

export interface Reference {
  title: string;
  publisher?: string;
  url: string;
  year?: number | string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface TocItem {
  id: string;
  label: string;
  depth?: 2 | 3;
}

export interface RelatedArticle {
  title: string;
  href: string;
  description?: string;
  category?: string;
  icon?: LucideIcon;
}

export interface ArticleMeta {
  title: string;
  description: string;
  /** Site-relative path beginning with "/" */
  path: string;
  category: string;
  datePublished: string; // ISO
  dateModified?: string; // ISO
  author: Author;
  image?: string;
  keywords?: string[];
}

/* ---------------------------------- Tables -------------------------------- */

export interface DensityRow {
  material: string;
  /** kg per cubic meter */
  kgPerM3: number;
  /** lb per cubic foot — derived automatically if omitted */
  lbPerFt3?: number;
  note?: string;
}

export interface CostRow {
  item: string;
  unit: string;
  low: number;
  high: number;
  note?: string;
}

export interface CoverageRow {
  label: string;
  /** e.g. thickness or bag size */
  spec: string;
  coverage: string;
  note?: string;
}

export interface ComparisonColumn {
  key: string;
  label: string;
  highlight?: boolean;
}

export interface ComparisonRow {
  feature: string;
  values: Record<string, string>;
}

/* --------------------------------- Charts --------------------------------- */

export interface ChartDatum {
  label: string;
  value: number;
  /** Optional explicit color (defaults to chart palette) */
  color?: string;
}

/* ------------------------------- Navigation ------------------------------- */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}

export interface CategoryInfo {
  slug: string;
  name: string;
  description: string;
  icon?: LucideIcon;
  /** Tailwind-safe accent class overrides are avoided — single brand accent */
  comingSoon?: boolean;
}
