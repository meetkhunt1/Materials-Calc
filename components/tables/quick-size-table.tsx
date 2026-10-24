import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface QuickSizeTableProps {
  /** Column headers: first is always the project size label. */
  headers: string[];
  /** Each row's cells, in the same order as `headers`. */
  rows: string[][];
  caption?: string;
}

/**
 * Pre-calculated reference table for common project sizes: answers
 * "how much X for a Y×Y Z" queries directly in a crawlable HTML table.
 * Figures must be derived from the same constants the live calculator uses.
 */
export function QuickSizeTable({ headers, rows, caption }: QuickSizeTableProps) {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row[0]}>
            {row.map((cell, index) => (
              <TableCell
                key={`${row[0]}-${index}`}
                className={index === 0 ? "font-medium" : "text-muted-foreground tabular-nums"}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
