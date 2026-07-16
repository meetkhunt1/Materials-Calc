import type { CoverageRow } from "@/types";
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

interface CoverageTableProps {
  rows: CoverageRow[];
  caption?: string;
  /** Column headers — override for context, e.g. ["Bag size", "Yield", "Coverage @ 4 in"] */
  headers?: [string, string, string];
  className?: string;
}

/** Coverage/yield table (e.g. bag sizes → coverage at a given depth). */
export function CoverageTable({
  rows,
  caption,
  headers = ["Option", "Specification", "Coverage"],
  className,
}: CoverageTableProps) {
  return (
    <Table className={cn(className)}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead>{headers[0]}</TableHead>
          <TableHead>{headers[1]}</TableHead>
          <TableHead>{headers[2]}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={`${row.label}-${row.spec}`}>
            <TableCell className="font-medium">{row.label}</TableCell>
            <TableCell className="text-muted-foreground">{row.spec}</TableCell>
            <TableCell>
              {row.coverage}
              {row.note && (
                <span className="block text-xs text-muted-foreground">{row.note}</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
