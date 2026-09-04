import { cn } from "@/lib/cn";

type Ink = "cream" | "navy" | "pink";

const INK: Record<Ink, string> = {
  cream: "bg-cream",
  navy: "bg-navy",
  pink: "bg-pink",
};

/**
 * The torn-paper strip that separates two sections. It is painted in the
 * colour of the section *above* and clipped along its bottom edge, so the
 * section below shows through the tear.
 */
export function TornEdge({
  from,
  variant = "a",
  className,
}: {
  from: Ink;
  variant?: "a" | "b";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-6 w-full lg:h-8",
        INK[from],
        variant === "a" ? "tear-a" : "tear-b",
        className,
      )}
    />
  );
}
