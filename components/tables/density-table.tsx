import type { DensityRow } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/format";
import { convert } from "@/lib/units";
import { cn } from "@/lib/utils";

interface DensityTableProps {
  rows: DensityRow[];
  caption?: string;
  /** Highlight one material row (e.g. the page's subject) */
  highlight?: string;
  className?: string;
}

/**
 * Material density table. lb/ft³ is derived from kg/m³ automatically
 * unless a row provides an explicit override.
 */
export function DensityTable({ rows, caption, highlight, className }: DensityTableProps) {
  return (
    <Table className={cn(className)}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead>Material</TableHead>
          <TableHead className="text-right">kg/m³</TableHead>
          <TableHead className="text-right">lb/ft³</TableHead>
          <TableHead className="text-right">t/m³</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => {
          const lbFt3 = row.lbPerFt3 ?? convert(row.kgPerM3, "kgm3", "lbft3");
          const isHighlighted = highlight === row.material;
          return (
            <TableRow key={row.material} className={cn(isHighlighted && "bg-primary-soft/50")}>
              <TableCell className="font-medium">
                {row.material}
                {row.note && (
                  <span className="block text-xs font-normal text-muted-foreground">
                    {row.note}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatNumber(row.kgPerM3, { precision: 0 })}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatNumber(lbFt3, { precision: 1 })}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatNumber(row.kgPerM3 / 1000, { precision: 2 })}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
