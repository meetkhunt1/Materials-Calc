import type { ComparisonColumn, ComparisonRow } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface ComparisonTableProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  caption?: string;
  className?: string;
}

/**
 * Feature-by-feature comparison (e.g. "Concrete vs Asphalt").
 * Mark a column `highlight: true` to visually emphasize it.
 */
export function ComparisonTable({ columns, rows, caption, className }: ComparisonTableProps) {
  return (
    <Table className={cn(className)}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead>Feature</TableHead>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={cn(col.highlight && "bg-primary-soft/60 text-primary-soft-foreground")}
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.feature}>
            <TableCell className="font-medium">{row.feature}</TableCell>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                className={cn("text-muted-foreground", col.highlight && "bg-primary-soft/30")}
              >
                {row.values[col.key] ?? "—"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
