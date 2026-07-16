import type { CostRow } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

interface CostTableProps {
  rows: CostRow[];
  caption?: string;
  currency?: string;
  className?: string;
}

/** Price-range table with an average column derived from low/high. */
export function CostTable({ rows, caption, currency = "USD", className }: CostTableProps) {
  return (
    <Table className={cn(className)}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead className="text-right">Low</TableHead>
          <TableHead className="text-right">High</TableHead>
          <TableHead className="text-right">Average</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={`${row.item}-${row.unit}`}>
            <TableCell className="font-medium">
              {row.item}
              {row.note && (
                <span className="block text-xs font-normal text-muted-foreground">{row.note}</span>
              )}
            </TableCell>
            <TableCell className="text-muted-foreground">{row.unit}</TableCell>
            <TableCell className="text-right tabular-nums">
              {formatCurrency(row.low, { currency })}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {formatCurrency(row.high, { currency })}
            </TableCell>
            <TableCell className="text-right font-semibold tabular-nums text-primary">
              {formatCurrency((row.low + row.high) / 2, { currency })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
