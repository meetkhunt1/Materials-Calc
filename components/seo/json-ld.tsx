/**
 * Renders a JSON-LD script tag. Pair with the builders in lib/jsonld.ts:
 *
 *   <JsonLd data={faqSchema(items)} />
 *   <JsonLd data={[webPageSchema(...), calculatorSchema(...)]} />
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
