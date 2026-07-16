import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CategoryNav } from "@/components/layout/category-nav";

export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-lg text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Compass className="size-6" />
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Try one of our calculator categories instead.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">
            <ArrowLeft />
            Back to home
          </Link>
        </Button>
      </div>
      <CategoryNav className="mx-auto mt-14 max-w-4xl" />
    </Container>
  );
}
