/** Minimal shell for iframe-embedded calculators: no header, footer or nav. */
export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background p-3">
      <div className="mx-auto max-w-md">{children}</div>
    </div>
  );
}
